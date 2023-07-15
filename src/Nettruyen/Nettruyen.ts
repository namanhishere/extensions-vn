import {
    Chapter,
    ChapterDetails,
    ChapterProviding,
    ContentRating,
    HomePageSectionsProviding,
    HomeSection,
    MangaProviding,
    PagedResults,
    Request,
    RequestManager,
    Response,
    SearchRequest,
    SearchResultsProviding,
    SourceInfo,
    SourceManga,
    DUISection,
    SourceStateManager,
    DUINavigationButton,
    PartialSourceManga
} from '@paperback/types'
import {convertTime} from '../utils/time'

const DOMAIN = 'https://animemoiapi.onrender.com/api/NetTruyen'

export const NettruyenInfo: SourceInfo = {
    description: '',
    icon: 'icon.jpg',
    websiteBaseURL: '',
    version: ('0.0.1'),
    name: 'Nettruyen',
    language: 'vi',
    author: 'Hoang3409',
    contentRating: ContentRating.EVERYONE
}

export class Nettruyen implements SearchResultsProviding, MangaProviding, ChapterProviding, HomePageSectionsProviding {
    constructor(public cheerio: CheerioAPI) {
    }

    requestsPerSecond = 5
    requestTimeout = 20000

    requestManager: RequestManager = App.createRequestManager({
        requestsPerSecond: this.requestsPerSecond,
        requestTimeout: this.requestTimeout,
        interceptor: {
            interceptRequest: async (request: Request): Promise<Request> => {
                return request
            },
            interceptResponse: async (response: Response): Promise<Response> => {
                return response
            }
        }
    })

    stateManager = App.createSourceStateManager()

    async getSourceMenu(): Promise<DUISection> {
        return App.createDUISection({
            id: 'sourceMenu',
            header: 'Source Menu',
            isHidden: false,
            rows: async () => [
                this.sourceSettings(this.stateManager)
            ]
        })
    }

    sourceSettings = (stateManager: SourceStateManager): DUINavigationButton => {
        return App.createDUINavigationButton({
            id: 'nettruyen_settings',
            label: 'Source Settings',
            form: App.createDUIForm({
                sections: async () => [
                    App.createDUISection({
                        id: 'what_thumb',
                        isHidden: false,
                        footer: 'Test DUI',
                        rows: async () => []
                    })
                ]
            })
        })
    }

    async getHomePageSections(sectionCallback: (section: HomeSection) => void): Promise<void> {
        const sections = []
        sections.push(App.createHomeSection({
            id: 'new',
            title: 'Mới thêm',
            containsMoreItems: true,
            type: ''
        }))

        const promises: Promise<void>[] = []

        for (const section of sections) {
            // Let the app load empty tagSections
            sectionCallback(section)
            let apiPath: string, params: string
            switch (section.id) {
                default:
                    apiPath = `${DOMAIN}`
                    params = '?page=1'
                    break
            }
            const request = App.createRequest({
                url: apiPath,
                param: params,
                method: 'GET'
            })
            // Get the section data
            const response = await this.requestManager.schedule(request, 1)
            const result = typeof response.data === 'string' ? JSON.parse(response.data) : response.data
            const items = []
            for (const item of result.mangas) {
                items.push(App.createPartialSourceManga({
                    title: item.title[0].title,
                    image: item.cover,
                    mangaId: item.url,
                    subtitle: undefined
                }))
            }
            section.items = items
            sectionCallback(section)
        }

        await Promise.all(promises)
    }

    async getViewMoreItems(homepageSectionId: string, metadata: any): Promise<PagedResults> {
        const page: number = metadata?.page ?? 1
        const request = App.createRequest({
            url: `${DOMAIN}`,
            param: `?page=${page}`,
            method: 'GET'
        })
        const data = await this.requestManager.schedule(request, 1)
        const result = typeof data.data === 'string' ? JSON.parse(data.data) : data.data
        const items: PartialSourceManga[] = []
        for (const item of result.mangas) {
            items.push(App.createPartialSourceManga({
                title: item.title[0].title,
                image: item.cover,
                mangaId: item.url,
                subtitle: undefined
            }))
        }
        // If no series were returned we are on the last page
        metadata = items.length === 0 ? undefined : {page: page + 1}
        return App.createPagedResults({
            results: items,
            metadata: metadata
        })
    }

    async getMangaDetails(mangaId: string): Promise<SourceManga> {
        // mangaId like "gokusotsu-kraken-72204"
        const request = App.createRequest({
            url: `${DOMAIN}/Manga?url=${mangaId}`,
            method: 'GET'
        })

        const response = await this.requestManager.schedule(request, 1)
        const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data
        const titles: string[] = []
        for (const item of data.title) {
            titles.push(item.title)
        }
        return App.createSourceManga({
            id: mangaId,
            mangaInfo: App.createMangaInfo({
                desc: data.description || 'no description',
                image: data.cover,
                status: '',
                titles: titles
            })
        })
    }

    async getChapters(mangaId: string): Promise<Chapter[]> {
        const request = App.createRequest({
            url: `${DOMAIN}/Chapter`,
            param: `?url=${mangaId}`,
            method: 'GET'
        })
        const response = await this.requestManager.schedule(request, 1)
        const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data
        const chapters: Chapter[] = []
        for (const item of data) {
            chapters.push(App.createChapter({
                id: item.url, 
                chapNum: 0,
                name: item.title,
                time: convertTime(item.timeUpdate)
            }))
        }
        return chapters
    }

    async getChapterDetails(mangaId: string, chapterId: string): Promise<ChapterDetails> {
        const request = App.createRequest({
            url: `${DOMAIN}/ChapterDetail`,
            param: `?url=${chapterId}`,
            method: 'GET'
        })
        const response = await this.requestManager.schedule(request, 1)
        const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data
        const images: string[] = []
        for (const image of data) {
            images.push(`${DOMAIN}/GetImage?url=${encodeURIComponent(image)}`)
        }
        return App.createChapterDetails({
            id: chapterId,
            mangaId: mangaId,
            pages: images
        })
    }

    async getSearchResults(query: SearchRequest, metadata: any): Promise<PagedResults> {
        const page: number = metadata?.page ?? 1
        const postData = {
            query: encodeURIComponent(query.title || ''),
            page: page,
            genres: [],
            exclude: [],
            status: 0
        }
        const request = App.createRequest({
            method: 'POST',
            url: `${DOMAIN}/Search`,
            data: postData,
            headers: {
                'Content-Type': 'application/json'              
            }
        })
        
        const response = await this.requestManager.schedule(request, 1)
        console.log(response.data)
        const result = typeof response.data === 'string' ? JSON.parse(response.data) : response.data
        const tiles: PartialSourceManga[] = []
        result.forEach((item: any) => {
            tiles.push(App.createPartialSourceManga({
                title: item.title[0].title,
                image: item.cover,
                mangaId: item.url,
                subtitle: undefined
            }))
        })
        
        metadata = tiles.length === 0 ? undefined : { page: page + 1 }
        return App.createPagedResults({
            results: tiles,
            metadata
        })
    }
}

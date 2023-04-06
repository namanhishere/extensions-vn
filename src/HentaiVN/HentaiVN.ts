import {
    Chapter,
    ChapterDetails,
    ContentRating,
    HomeSection,
    LanguageCode,
    Manga,
    MangaStatus,
    MangaTile,
    PagedResults,
    Request,
    Response,
    SearchRequest,
    Source,
    SourceInfo,
    Tag,
    TagSection,
    TagType
} from "paperback-extensions-common";

const DOMAIN = "https://hentaivn.tv";

export const HentaiVNInfo: SourceInfo = {
    version: "1.1.3",
    name: "HentaiVN",
    icon: "icon.png",
    author: "Hoang3409",
    authorWebsite: 'https://github.com/hoang3402',
    description: "Extension that pulls manga from HentaiVN.",
    contentRating: ContentRating.ADULT,
    websiteBaseURL: DOMAIN,
    sourceTags: [{
        text: 'Hentai',
        type: TagType.RED
    }]
}

export class HentaiVN extends Source {


    requestManager = createRequestManager({
        requestsPerSecond: 5,
        requestTimeout: 20000,
        interceptor: {
            interceptRequest: async (request: Request): Promise<Request> => {
                request.headers = {
                    ...(request.headers ?? {}),
                    ...{
                        'referer': DOMAIN
                    }
                }
                return request
            },

            interceptResponse: async (response: Response): Promise<Response> => {
                return response
            }
        }
    });


    override async getMangaDetails(mangaId: string): Promise<Manga> {
        const request = createRequestObject({
            url: `${DOMAIN}${mangaId}`,
            method: "GET",
        });
        const data = await this.requestManager.schedule(request, 1);
        let $ = this.cheerio.load(data.data);

        return createManga({
            id: mangaId.split('-')[0]!.replace('/', ''),
            titles: [
                $('div.page-info > h1 > a').text().trim()
            ],
            image: $('div.page-ava > img').attr('src'),
            status: MangaStatus.ONGOING
        });
    }


    override async getChapters(mangaId: string): Promise<Chapter[]> {
        const chapters: Chapter[] = []
        const request = createRequestObject({
            url: `${DOMAIN}/list-showchapter.php`,
            param: `?idchapshow=${mangaId}`,
            method: "GET",
        });
        const data = await this.requestManager.schedule(request, 1);
        let $ = this.cheerio.load(data.data);

        const arr = $('tr').toArray();
        for (var item of arr) {
            var idChap = $('a', item).attr('href').split('-')[1];
            chapters.push(createChapter({
                id: idChap,
                mangaId: mangaId,
                name: $('h2', item).text(),
                chapNum: arr.length - arr.indexOf(item),
                langCode: LanguageCode.VIETNAMESE
            }))
        }
        return chapters;
    }


    override async getChapterDetails(mangaId: string, chapterId: string): Promise<ChapterDetails> {
        const listUrlImage: string[] = []
        const request = createRequestObject({
            url: `${DOMAIN}/ajax_load_server.php`,
            data: `server_id=${chapterId}&server_type=3`,
            method: "POST",
        });
        const data = await this.requestManager.schedule(request, 1);
        let $ = this.cheerio.load(data.data);

        for (const item of $('img').toArray()) {
            listUrlImage.push(item.attribs.src)
        }

        return createChapterDetails({
            id: chapterId,
            mangaId: mangaId,
            pages: listUrlImage,
            longStrip: false
        })
    }


    override async getSearchResults(query: SearchRequest, metadata: any): Promise<PagedResults> {
        const page: number = metadata?.page ?? 1;

        const request = createRequestObject({
            url: `${DOMAIN}/forum/search-plus.php`,
            param: `?name=${encodeURIComponent(query.title!)}&dou=&char=&search=&page=${page}`,
            method: "GET",
        });
        for (const item of query.includedTags!) {
            request.param += `&tag[]=${item.id}`
        }
        const data = await this.requestManager.schedule(request, 1);
        const $ = this.cheerio.load(data.data);
        const tiles: MangaTile[] = []
        for (let item of $('li.search-li').toArray()) {
            tiles.push(createMangaTile({
                id: $('div.search-img > a', item).attr('href'),
                title: createIconText({ text: $('b', item).first().text() }),
                image: $('img', item).attr('src')
            }))
        }
        metadata = tiles.length === 0 ? undefined : { page: page + 1 };

        return createPagedResults({
            results: tiles,
            metadata: metadata,
        });
    }


    // Sections
    override async getHomePageSections(sectionCallback: (section: HomeSection) => void): Promise<void> {
        let newAdded: HomeSection = createHomeSection({
            id: 'new_added',
            title: "Truyện Mới Cập Nhật",
            view_more: true,
        });
        //Load empty sections
        sectionCallback(newAdded);
        //New Updates
        let request = createRequestObject({
            url: `${DOMAIN}/list-new2.php`,
            method: "GET",
        });
        let data = await this.requestManager.schedule(request, 1);
        let $ = this.cheerio.load(data.data);
        newAdded.items = await this.parseNewUpdatedSection($);
        sectionCallback(newAdded);
    }


    async parseNewUpdatedSection($: any): Promise<import("paperback-extensions-common").MangaTile[]> {
        const items: MangaTile[] = [];
        for (let item of $('ul.page-random').toArray()) {
            items.push(createMangaTile({
                id: $('div.img-same > a', item).attr('href'),
                title: createIconText({ text: $('b', item).first().text() }),
                image: $('div[style*=background]', item).attr('style').match(/background:url\((.+)\);/)[1]
            }))
        }
        return items;
    }

    
    override async getViewMoreItems(homepageSectionId: string, metadata: any): Promise<PagedResults> {
        const page: number = metadata?.page ?? 1;
        let url = ''
        let param = ''

        switch (homepageSectionId) {
            case 'new_added':
                url = `${DOMAIN}/list-moicapnhat-doc.php`;
                param = `?page=${page}`;
                break;
            default:
                throw new Error('Làm gì có page này?!');
        }

        const request = createRequestObject({
            url: url,
            param: param,
            method: "GET",
        });

        const data = await this.requestManager.schedule(request, 1);
        const $ = this.cheerio.load(data.data);
        const tiles: MangaTile[] = [];

        for (let item of $('li.item > ul').toArray()) {
            tiles.push(createMangaTile({
                id: encodeURIComponent($('a', item).attr('href')).replace('%2F', '/'),
                title: createIconText({ text: $('img', item).attr('alt') }),
                image: $('img', item).attr('src')
            }))
        }

        metadata = tiles.length === 0 ? undefined : { page: page + 1 };

        return createPagedResults({
            results: tiles,
            metadata: metadata,
        });
    }


    override async getSearchTags(): Promise<TagSection[]> {
        // This function is called on the homepage and should not throw if the server is unavailable
        let genresResponse: Response

        try {
            const request = createRequestObject({
                url: `${DOMAIN}/tag_box.php`,
                method: "GET"
            })

            genresResponse = await this.requestManager.schedule(request, 1);
            const genresResult = this.cheerio.load(genresResponse.data);
            const tagSections: TagSection[] = [
                createTagSection({ id: "0", label: "Thể loại", tags: [] })
            ];

            var temp: Tag[] = []
            for (const item of genresResult('li').toArray()) {
                temp.push(createTag({
                    id: genresResult('a', item).attr('href').split('-')[2],
                    label: genresResult('a', item).text()
                }))
            }

            tagSections[0]!.tags = temp

            return tagSections;
        } catch (e) {
            console.log(`getTags failed with error: ${e}`);

            return [
                createTagSection({ id: "-1", label: "Server unavailable", tags: [] }),
            ];
        }
    }
}
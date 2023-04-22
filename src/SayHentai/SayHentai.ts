import {
    Chapter,
    ChapterDetails,
    ContentRating,
    LanguageCode,
    Manga,
    MangaStatus,
    MangaTile,
    PagedResults,
    Request,
    RequestManager,
    Response,
    SearchRequest,
    Source,
    SourceInfo,
    TagSection,
    TagType,
} from "paperback-extensions-common";

import tags from './tags.json';

const DOMAIN = "https://sayhentai.me/";

export const SayHentaiInfo: SourceInfo = {
    version: "1.0.3",
    name: "SayHentai",
    icon: "icon.png",
    author: "Hoang3409",
    description: "Extension that pulls manga from SayHentai",
    contentRating: ContentRating.ADULT,
    websiteBaseURL: DOMAIN,
    sourceTags: [
        {
            text: "Hentai",
            type: TagType.RED,
        },
    ],
};

export class SayHentai extends Source {

    requestManager: RequestManager = createRequestManager({
        requestsPerSecond: 5,
        requestTimeout: 20000,
        interceptor: {
            interceptRequest: async (request: Request): Promise<Request> => {
                request.headers = {
                    ...(request.headers ?? {}),
                    ...{
                        referer: DOMAIN,
                    },
                };
                return request;
            },

            interceptResponse: async (
                response: Response
            ): Promise<Response> => {
                return response;
            },
        },
    });


    override async getMangaDetails(mangaId: string): Promise<Manga> {

        const request = createRequestObject({
            url: `${DOMAIN}${mangaId}`,
            method: "GET"
        })
        const data = await this.requestManager.schedule(request, 1);
        const $ = this.cheerio.load(data.data);

        return createManga({
            id: mangaId,
            titles: [$('.post-title').text()],
            image: $('.summary_image img').attr('src'),
            desc: $('.description-summary p').text(),
            status: MangaStatus.ONGOING
        })
    }


    override async getChapters(mangaId: string): Promise<Chapter[]> {

        const request = createRequestObject({
            url: `${DOMAIN}${mangaId}`,
            method: "GET"
        })
        const data = await this.requestManager.schedule(request, 1);
        const $ = this.cheerio.load(data.data);

        let chapters: Chapter[] = []
        const arr = $('.wp-manga-chapter a').toArray()
        let index = arr.length
        for (let item of arr) {
            chapters.push(createChapter({
                id: $(item).attr('href').replace(DOMAIN, ''),
                chapNum: index--,
                name: $(item).text(),
                mangaId: mangaId,
                langCode: LanguageCode.VIETNAMESE
            }))
        }

        return chapters;
    }


    override async getChapterDetails(
        mangaId: string,
        chapterId: string
    ): Promise<ChapterDetails> {

        const request = createRequestObject({
            url: `${DOMAIN}${chapterId}`,
            method: "GET"
        })
        const data = await this.requestManager.schedule(request, 1);
        const $ = this.cheerio.load(data.data);

        let pages: string[] = []
        for (let item of $('.page-break img').toArray()) {
            pages.push($(item).attr('src'))
        }

        return createChapterDetails({
            id: chapterId,
            mangaId: mangaId,
            pages: pages,
            longStrip: false
        })
    }


    override async getSearchResults(
        query: SearchRequest,
        metadata: any
    ): Promise<PagedResults> {
        // search?s=a&page=2
        let page: number = metadata?.page ?? 1;
        var url: string;

        if (query.includedTags) {
            url = query.includedTags[0]!.id
        } else {
            url = `${DOMAIN}search?s=${query.title}&page=${page}`
        }

        const request = createRequestObject({
            url: url,
            method: "GET"
        });
        const data = await this.requestManager.schedule(request, 1);
        const $ = this.cheerio.load(data.data);
        var result: MangaTile[] = []

        for (let item of $('div.page-item-detail').toArray()) {
            result.push(createMangaTile({
                id: $('.line-2 > a', item).attr('href').replace(DOMAIN, ''),
                title: createIconText({
                    text: $('.line-2 > a', item).text()
                }),
                image: $('img', item).attr('src'),
            }))
        }

        return createPagedResults({
            results: result,
            metadata: {
                page: page + 1,
            }
        })
    }


    override async getSearchTags(): Promise<TagSection[]> {

        return [createTagSection({
            id: '0',
            label: 'Thể loại (Chỉ chọn 1)',
            tags: tags.map(item => createTag(item))
        })];
    }
}

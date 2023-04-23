import {
    Chapter,
    ChapterDetails,
    ContentRating,
    HomeSection,
    Manga,
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
import {
    getChapterDetails,
    getChapters,
    getManga,
    getMangaTile,
    isLastPage,
} from "./SayHentaiParser";
import tags from './tags.json';

export const DOMAIN = "https://sayhentai.me/";

export const SayHentaiInfo: SourceInfo = {
    version: "1.0.7",
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

        var tags = await this.getSearchTags()

        const request = createRequestObject({
            url: `${DOMAIN}${mangaId}`,
            method: "GET"
        })

        const data = await this.requestManager.schedule(request, 1);
        const $ = this.cheerio.load(data.data);

        return getManga($, tags, mangaId);
    }


    override async getChapters(mangaId: string): Promise<Chapter[]> {

        const request = createRequestObject({
            url: `${DOMAIN}${mangaId}`,
            method: "GET"
        })
        const data = await this.requestManager.schedule(request, 1);
        const $ = this.cheerio.load(data.data);

        return getChapters($, mangaId);
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

        return getChapterDetails($, chapterId, mangaId);
    }


    override async getSearchResults(
        query: SearchRequest,
        metadata: any
    ): Promise<PagedResults> {
        let page: number = metadata?.page ?? 1;
        var url: string;
        if (metadata?.isLastPage) {
            return createPagedResults({
                results: [],
                metadata: {
                    isLastPage: true
                }
            })
        }

        if (query.includedTags!.length > 0) {
            url = `${query.includedTags![0]!.id}?page=${page}`
        } else {
            url = `${DOMAIN}search?s=${query.title}&page=${page}`
        }

        const request = createRequestObject({
            url: url,
            method: "GET"
        });
        const data = await this.requestManager.schedule(request, 1);
        const $ = this.cheerio.load(data.data);
        var result: MangaTile[] = getMangaTile($);

        return createPagedResults({
            results: result,
            metadata: {
                page: page + 1,
                isLastPage: isLastPage(result.length)
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


    override async getHomePageSections(sectionCallback: (section: HomeSection) => void): Promise<void> {
        let newAdded: HomeSection = createHomeSection({
            id: "new_added",
            title: "Truyện Mới Cập Nhật",
            view_more: true,
        });
        //Load empty sections
        sectionCallback(newAdded);
        //New Updates
        let request = createRequestObject({
            url: `${DOMAIN}`,
            method: "GET",
        });
        let data = await this.requestManager.schedule(request, 1);
        let $ = this.cheerio.load(data.data);
        newAdded.items = getMangaTile($);
        sectionCallback(newAdded);
    }

    override async getViewMoreItems(homepageSectionId: string, metadata: any): Promise<PagedResults> {
        let page: number = metadata?.page ?? 1;
        if (metadata?.isLastPage) {
            return createPagedResults({
                results: [],
                metadata: {
                    isLastPage: true
                }
            })
        }

        const request = createRequestObject({
            url: `${DOMAIN}?page=${page}`,
            method: "GET"
        })
        const data = await this.requestManager.schedule(request, 1);
        const $ = this.cheerio.load(data.data);

        let result: MangaTile[] = getMangaTile($);

        return createPagedResults({
            results: result,
            metadata: {
                page: page + 1,
                isLastPage: isLastPage(result.length)
            }
        });
    }
}





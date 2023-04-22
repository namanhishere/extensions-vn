import {
    Chapter,
    ChapterDetails,
    Manga,
    PagedResults,
    SearchRequest,
    Request,
    Response,
    Source,
    SourceInfo,
    ContentRating,
    LanguageCode,
    MangaStatus,
    HomeSection,
    MangaTile,
    MangaUpdates,
    TagType,
} from "paperback-extensions-common";

const DOMAIN = "https://baotangtruyen2.com/";
const userAgent =
    "Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1";

export const BaoTangTruyenInfo: SourceInfo = {
    version: "1.0.2",
    name: "Bảo Tàng Truyện",
    icon: "icon.png",
    author: "Hoang3409",
    description: "Extension that pulls manga from Bảo Tàng Truyện",
    contentRating: ContentRating.EVERYONE,
    websiteBaseURL: DOMAIN,
    authorWebsite: "https://github.com/hoang3402/extensions-vn",
    language: LanguageCode.VIETNAMESE,
    sourceTags: [
        {
            text: "Recommended",
            type: TagType.BLUE,
        },
    ],
};

export class BaoTangTruyen extends Source {
    requestManager = createRequestManager({
        requestsPerSecond: 5,
        requestTimeout: 20000,
        interceptor: {
            interceptRequest: async (request: Request): Promise<Request> => {
                request.headers = {
                    ...(request.headers ?? {}),
                    ...{
                        referer: DOMAIN,
                        "user-agent": userAgent,
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
            url: `${DOMAIN}truyen-tranh/a-${mangaId}`,
            method: "GET",
        });
        const data = await this.requestManager.schedule(request, 1);
        const $ = this.cheerio.load(data.data);

        return createManga({
            id: mangaId,
            titles: [decodeHtml($("h1.title-detail").text().trim())],
            desc: decodeHtml($("#summary").text().trim()),
            image: $("div.col-image > img").attr("data-src"),
            status: MangaStatus.ONGOING,
        });
    }

    override async getChapters(mangaId: string): Promise<Chapter[]> {
        var chapters: Chapter[] = [];

        const request = createRequestObject({
            url: `${DOMAIN}Story/ListChapterByStoryID`,
            param: `?StoryID=${mangaId}`,
            method: "GET",
        });
        const response = await this.requestManager.schedule(request, 1);
        const $ = this.cheerio.load(response.data);
        const chapterList = $("li.row").slice(1).toArray();
        var index = chapterList.length;

        for (const item of chapterList) {
            var time = $(".col-xs-4.text-center.small", item).text();
            chapters.push(
                createChapter({
                    id: $(".chapter > a", item).attr("data-id"),
                    mangaId: mangaId,
                    name: $(".chapter > a", item).text(),
                    chapNum: index--,
                    langCode: LanguageCode.VIETNAMESE,
                    time: convertTime(decodeHtml(time)),
                })
            );
        }

        return chapters;
    }

    override async getChapterDetails(
        mangaId: string,
        chapterId: string
    ): Promise<ChapterDetails> {
        const request = createRequestObject({
            url: `${DOMAIN}truyen-tranh/a/b/${chapterId}`,
            method: "GET",
        });
        const response = await this.requestManager.schedule(request, 1);
        const $ = this.cheerio.load(response.data);

        var pages: string[] = [];
        for (const item of $("img[data-index]").toArray()) {
            pages.push($(item).attr("src"));
        }

        return createChapterDetails({
            id: chapterId,
            mangaId: mangaId,
            pages: pages,
            longStrip: false,
        });
    }

    override async getSearchResults(
        query: SearchRequest,
        metadata: any
    ): Promise<PagedResults> {
        throw new Error("Method not implemented.");
    }

    override async getHomePageSections(
        sectionCallback: (section: HomeSection) => void
    ): Promise<void> {
        let newAdded: HomeSection = createHomeSection({
            id: "new_added",
            title: "Truyện Mới Thêm",
            view_more: true,
        });

        //New Updates
        let url = `${DOMAIN}home`;
        let request = createRequestObject({
            url: url,
            method: "GET",
        });
        let data = await this.requestManager.schedule(request, 1);
        let $ = this.cheerio.load(data.data);

        newAdded.items = this.parseNewUpdatedSection($);
        sectionCallback(newAdded);
    }

    parseNewUpdatedSection(
        $: any
    ): import("paperback-extensions-common").MangaTile[] {
        let manga: MangaTile[] = [];

        for (const item of $("figure.clearfix").toArray()) {
            let title = $(item).find("h3 > a").text().trim();
            let id = $(item).find("a").attr("href")!.split("-").pop()!;
            let image = $(item).find("img").attr("src");
            let subtitle = $(item).find("ul > li > a").first().text();

            manga.push(
                createMangaTile({
                    id: id,
                    image: image,
                    title: createIconText({ text: decodeHtml(title) }),
                    subtitleText: createIconText({
                        text: decodeHtml(subtitle),
                    }),
                })
            );
        }

        return manga;
    }

    override async getViewMoreItems(
        homepageSectionId: string,
        metadata: any
    ): Promise<PagedResults> {
        let page: number = metadata?.page ?? 1;

        switch (homepageSectionId) {
            case "new_added":
                break;
            default:
        }

        const request = createRequestObject({
            url: `${DOMAIN}home`,
            param: `?page=${page}&typegroup=0`,
            method: "GET",
        });
        const data = await this.requestManager.schedule(request, 1);
        const $ = this.cheerio.load(data.data);

        let manga: MangaTile[] = [];

        for (const item of $("figure.clearfix").toArray()) {
            let title = $(item).find("h3 > a").text();
            let id = $(item).find("a").attr("href")!.split("-").pop()!;
            let image = $(item).find("img").attr("src");
            let subtitle = $(item).find("ul > li > a").first().text();

            manga.push(
                createMangaTile({
                    id: id,
                    image: image,
                    title: createIconText({ text: decodeHtml(title) }),
                    subtitleText: createIconText({
                        text: decodeHtml(subtitle),
                    }),
                })
            );
        }

        return createPagedResults({
            results: manga,
            metadata: {
                page: page + 1,
            },
        });
    }

    override async filterUpdatedManga(
        mangaUpdatesFoundCallback: (updates: MangaUpdates) => void,
        time: Date,
        ids: string[]
    ): Promise<void> {
        const request = createRequestObject({
            url: `${DOMAIN}tim-truyen`,
            method: "GET",
        });
        const data = await this.requestManager.schedule(request, 1);
        const $ = this.cheerio.load(data.data);

        const updatedManga: string[] = [];

        for (const item of $("figure.clearfix").toArray()) {
            updatedManga.push($(item).find("a").attr('href')!.split("-").pop()!);
        }

        const results: string[] = []

        for (const id of ids) {
            if (updatedManga.includes(id)) {
                results.push(id);
            }
        }

        mangaUpdatesFoundCallback(createMangaUpdates({ ids: results }));
    }
}

export function decodeHtml(encodedString: string): string {
    const entityRegex = /&(#[0-9]+|[a-z]+);/gi;
    const entities: { [key: string]: string } = {
        "&lt;": "<",
        "&gt;": ">",
        "&amp;": "&",
        "&quot;": '"',
        "&apos;": "'",
        "&#39;": "'",
        "&#x2F;": "/",
        "&#x3D;": "=",
        "&#x22;": '"',
        "&#x3C;": "<",
        "&#x3E;": ">",
    };

    return encodedString.replace(entityRegex, (match, entity) => {
        if (entity[0] === "#") {
            const code = entity.slice(1);
            if (code[0] === "x") {
                return String.fromCharCode(parseInt(code.slice(1), 16));
            } else {
                return String.fromCharCode(parseInt(code));
            }
        } else {
            return entities[match] || match;
        }
    });
}

export function convertTime(time: string): Date {
    var date;
    // 29/12/22
    if (time.split("/").length == 3) {
        date = time.split("/");
        date[2] = "20" + date[2];
        return new Date(
            Number.parseInt(date[2]),
            Number.parseInt(date[1]!) - 1,
            Number.parseInt(date[0]!)
        );
    }

    // 11:44 05/02
    if (time.includes(":")) {
        date = new Date();
        var temp = time.split(" ");
        date.setHours(Number.parseInt(temp[0]!.split(":")[0]!));
        date.setMinutes(Number.parseInt(temp[0]!.split(":")[1]!));

        date.setDate(Number.parseInt(temp[1]!.split("/")[0]!));
        date.setMonth(Number.parseInt(temp[1]!.split("/")[1]!) - 1);

        return date;
    }

    // some thing "* trước"
    if (time.includes("trước")) {
        var T = Number.parseInt(time.split(" ")[0]!);
        if (time.includes("giây")) {
            date = new Date();
            date.setSeconds(date.getSeconds() - T);
            return date;
        }
        if (time.includes("phút")) {
            date = new Date();
            date.setMinutes(date.getMinutes() - T);
            return date;
        }
        if (time.includes("giờ")) {
            date = new Date();
            date.setHours(date.getHours() - T);
            return date;
        }
        if (time.includes("ngày")) {
            date = new Date();
            date.setDate(date.getDate() - T);
            return date;
        }
        if (time.includes("tháng")) {
            date = new Date();
            date.setMonth(date.getMonth() - T);
            return date;
        }
        if (time.includes("năm")) {
            date = new Date();
            date.setFullYear(date.getFullYear() - T);
            return date;
        }
    }

    return new Date();
}

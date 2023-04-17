import {
    Chapter,
    ChapterDetails,
    ContentRating,
    HomeSection,
    LanguageCode,
    Manga,
    MangaTile,
    MangaUpdates,
    PagedResults,
    Request,
    Response,
    SearchRequest,
    Source,
    SourceInfo,
    Tag,
    TagSection,
    TagType,
} from "paperback-extensions-common";

import tags from "./tags.json";

const DOMAIN = "https://www.nettruyenvt.com";

export const NettruyenInfo: SourceInfo = {
    version: "1.2.3",
    name: "NetTruyen",
    icon: "icon.jpg",
    author: "Hoang3409",
    authorWebsite: "https://github.com/hoang3402",
    description: "Extension that pulls manga from NetTruyen.",
    websiteBaseURL: DOMAIN,
    contentRating: ContentRating.MATURE,
    sourceTags: [
        {
            text: "Recommended",
            type: TagType.BLUE,
        },
        {
            text: "Notifications",
            type: TagType.GREEN,
        },
    ],
};

export class Nettruyen extends Source {
    requestManager = createRequestManager({
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

    override async getHomePageSections(
        sectionCallback: (section: HomeSection) => void
    ): Promise<void> {
        let newAdded: HomeSection = createHomeSection({
            id: "new_added",
            title: "Truyện Mới Thêm",
            view_more: true,
        });

        //New Updates
        let url = `${DOMAIN}`;
        let request = createRequestObject({
            url: url,
            method: "GET",
        });
        let data = await this.requestManager.schedule(request, 1);
        let $ = this.cheerio.load(data.data);

        newAdded.items = this.parseNewUpdatedSection($);
        sectionCallback(newAdded);
    }

    override async getMangaDetails(mangaId: string): Promise<Manga> {
        try {
            const Tags = await this.getSearchTags();
            const url = `${DOMAIN}/truyen-tranh/${mangaId}`;
            const request = createRequestObject({
                url: url,
                method: "GET",
            });
            const data = await this.requestManager.schedule(request, 1);
            let $ = this.cheerio.load(data.data);

            var temp = $(
                "#item-detail > div.detail-info > div > div.col-xs-4.col-image > img"
            );
            var image = "http:" + temp.attr("src")!;
            var titles = [temp.attr("alt")!];
            var des = $("#item-detail > div.detail-content > p").text().replaceAll('\n', ' ');
            var id = mangaId;
            var tags: Tag[] = [];
            for (let tag of $(".kind.row > .col-xs-8 > a").toArray()) {
                const label = $(tag).text();
                const id = Tags[0]!.tags.find((tag) => tag.label == label);
                if (!id) continue;
                tags.push(
                    createTag({
                        id: id.id,
                        label: label,
                    })
                );
            }
            var rating = $('span[itemprop="ratingValue"]').text();
            var views = $('ul.list-info > li.row > p.col-xs-8').last().text().replaceAll('.', '');

            if ($('ul.list-info > li.othername.row')) {
                $('ul.list-info > li.othername.row > h2')
                    .text()
                    .split(';')
                    .map((item: string) =>
                        titles.push(item.trim())
                    );
            }

            return createManga({
                id: id,
                author: "Nettruyen ăn cắp của ai đó",
                artist: "chịu á",
                desc: des,
                titles: titles,
                image: image,
                status: 1,
                rating: Number.parseFloat(rating),
                hentai: false,
                tags: [
                    createTagSection({
                        id: "0",
                        label: "Thể loại",
                        tags: tags,
                    }),
                ],
                views: Number.parseInt(views),
            });
        } catch (e) {
            throw new Error("Error: " + e);
        }
    }

    override async getChapters(mangaId: string): Promise<Chapter[]> {
        const chapters: Chapter[] = [];

        const url = `${DOMAIN}/truyen-tranh/${mangaId}`;
        const request = createRequestObject({
            url: url,
            method: "GET",
        });
        const data = await this.requestManager.schedule(request, 1);
        let $ = this.cheerio.load(data.data);
        const chapterList = $('#nt_listchapter > nav > ul > li').toArray();

        for (let chapter of chapterList) {
            chapters.push(
                createChapter({
                    id: $(chapter).find('a').attr('href').replace(`${DOMAIN}`, ''),
                    name: $(chapter).find('a').text(),
                    mangaId: mangaId,
                    chapNum: chapterList.length - chapterList.indexOf(chapter),
                    langCode: LanguageCode.VIETNAMESE,
                    time: convertTime($('div.col-xs-4', chapter).text()),
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
            url: DOMAIN,
            param: chapterId,
            method: "GET",
        });

        const data = await this.requestManager.schedule(request, 1);
        let $ = this.cheerio.load(data.data);

        const pages: string[] = [];
        for (let image of $(".page-chapter").toArray()) {
            var link = $("div.page-chapter > img", image).attr(
                "data-original"
            )!;
            if (link.indexOf("http") === -1) {
                pages.push("http:" + link);
            } else {
                pages.push(link);
            }
        }

        return createChapterDetails({
            pages: pages,
            longStrip: false,
            id: chapterId,
            mangaId: mangaId,
        });
    }

    override async getSearchResults(
        query: SearchRequest,
        metadata: any
    ): Promise<PagedResults> {
        const page: number = metadata?.page ?? 1;
        let advanced: boolean;
        const tiles: MangaTile[] = [];
        let url = "";
        let param = "";

        if (query.includedTags!.length > 0) {
            advanced = true;
            url = `${DOMAIN}/tim-truyen-nang-cao`;
            param = `?genres=${query
                .includedTags!.map((tag) => tag.id)
                .join(
                    ","
                )}&notgenres=&gender=-1&status=-1&minchapter=1&sort=0?page=${page}`;
        } else {
            advanced = false;
            url = `${DOMAIN}/Comic/Services/SuggestSearch.ashx`;
            param = `?q=${encodeURIComponent(query.title!)}`;
        }

        const request = createRequestObject({
            url: url,
            param: param,
            method: "GET",
        });

        let data: Response;

        try {
            data = await this.requestManager.schedule(request, 1);
        } catch (error) {
            console.log(`searchRequest failed with error: ${error}`);
            return createPagedResults({
                results: getServerUnavailableMangaTiles(),
            });
        }

        let $ = this.cheerio.load(data.data);

        if (advanced) {
            for (let item of $(".item").toArray()) {
                var img = $("img", item).attr("data-original")!;
                if (img === undefined) {
                    img = $("img", item).attr("src")!;
                }
                tiles.push(
                    createMangaTile({
                        id: $("a", item)
                            .attr("href")
                            ?.replace(`${DOMAIN}/truyen-tranh/`, "")!,
                        title: createIconText({
                            text: $("h3 > a", item).text(),
                        }),
                        image: "http:" + img,
                    })
                );
            }
        } else {
            for (let item of $("li").toArray()) {
                tiles.push(
                    createMangaTile({
                        id: $("a", item)
                            .attr("href")
                            ?.replace(`${DOMAIN}/truyen-tranh/`, "")!,
                        title: createIconText({
                            text: $("a > h3", item).text(),
                        }),
                        image: "http:" + $("a > img", item).attr("src")!,
                    })
                );
            }
        }

        if (tiles.length == 0) {
            return createPagedResults({
                results: getServerUnavailableMangaTiles(),
            });
        }

        metadata = tiles.length === 0 ? undefined : { page: page + 1 };

        return createPagedResults({
            results: tiles,
            metadata: metadata,
        });
    }

    override async getViewMoreItems(
        homepageSectionId: string,
        metadata: any
    ): Promise<PagedResults> {
        const page: number = metadata?.page ?? 1;

        switch (homepageSectionId) {
            case "new_added":
                break;
            default:
                throw new Error("Làm gì có page này?!");
        }

        const request = createRequestObject({
            url: `${DOMAIN}/tim-truyen-nang-cao`,
            param: `?page=${page}`,
            method: "GET",
        });

        const data = await this.requestManager.schedule(request, 1);
        const $ = this.cheerio.load(data.data);
        const tiles: MangaTile[] = [];

        for (let manga of $("div.item", "div.row").toArray()) {
            const title = $("figure.clearfix > figcaption > h3 > a", manga)
                .first()
                .text();
            const id = $("figure.clearfix > div.image > a", manga)
                .attr("href")
                ?.split("/")
                .pop();
            const image = $("figure.clearfix > div.image > a > img", manga)
                .first()
                .attr("data-original");
            const subtitle = $(
                "figure.clearfix > figcaption > ul > li.chapter:nth-of-type(1) > a",
                manga
            )
                .last()
                .text()
                .trim();
            if (!id || !title) continue;
            tiles.push(
                createMangaTile({
                    id: id,
                    image: !image
                        ? "https://i.imgur.com/GYUxEX8.png"
                        : "http:" + image,
                    title: createIconText({ text: title }),
                    subtitleText: createIconText({ text: subtitle }),
                })
            );
        }

        metadata = tiles.length === 0 ? undefined : { page: page + 1 };

        return createPagedResults({
            results: tiles,
            metadata: metadata,
        });
    }

    parseNewUpdatedSection($: any): MangaTile[] {
        let newUpdatedItems: MangaTile[] = [];

        for (let manga of $("div.item", "div.row").toArray().splice(0, 10)) {
            const title = $("figure.clearfix > figcaption > h3 > a", manga)
                .first()
                .text();
            const id = $("figure.clearfix > div.image > a", manga)
                .attr("href")
                ?.split("/")
                .pop();
            const image = $("figure.clearfix > div.image > a > img", manga)
                .first()
                .attr("data-original");
            const subtitle = $(
                "figure.clearfix > figcaption > ul > li.chapter:nth-of-type(1) > a",
                manga
            )
                .last()
                .text()
                .trim();
            if (!id || !title) continue;
            newUpdatedItems.push(
                createMangaTile({
                    id: id,
                    image: !image
                        ? "https://i.imgur.com/GYUxEX8.png"
                        : "http:" + image,
                    title: createIconText({ text: title }),
                    subtitleText: createIconText({ text: subtitle }),
                })
            );
        }

        return newUpdatedItems;
    }

    override async getSearchTags(): Promise<TagSection[]> {
        return [
            createTagSection({
                id: "0",
                label: "Thể loại",
                tags: tags.map((tag) => createTag(tag)),
            }),
        ];
    }

    override async filterUpdatedManga(
        mangaUpdatesFoundCallback: (updates: MangaUpdates) => void,
        time: Date,
        ids: string[]
    ): Promise<void> {
        mangaUpdatesFoundCallback(createMangaUpdates({ ids: ids }));
    }
}

export function getServerUnavailableMangaTiles(): MangaTile[] {
    // This tile is used as a placeholder when the server is unavailable
    return [
        createMangaTile({
            id: "placeholder-id",
            title: createIconText({ text: "Server" }),
            image: "",
            subtitleText: createIconText({ text: "unavailable" }),
        }),
    ];
}

export function convertTime(time: string): Date {
    var date;
    // 29/12/22
    if (time.split('/').length == 3) {
        date = time.split('/');
        date[2] = '20' + date[2];
        return new Date(
            Number.parseInt(date[2]),
            Number.parseInt(date[1]!) - 1,
            Number.parseInt(date[0]!)
        );
    }

    // 11:44 05/02
    if (time.includes(':')) {
        date = new Date();
        var temp = time.split(' ');
        date.setHours(Number.parseInt(temp[0]!.split(':')[0]!));
        date.setMinutes(Number.parseInt(temp[0]!.split(':')[1]!));

        date.setDate(Number.parseInt(temp[1]!.split('/')[0]!));
        date.setMonth(Number.parseInt(temp[1]!.split('/')[1]!) - 1);

        return date;
    }

    // some thing "* trước"
    if (time.includes('trước')) {
        var T = Number.parseInt(time.split(' ')[0]!);
        if (time.includes('giây')) {
            date = new Date();
            date.setSeconds(date.getSeconds() - T);
            return date;
        }
        if (time.includes('phút')) {
            date = new Date();
            date.setMinutes(date.getMinutes() - T);
            return date;
        }
        if (time.includes('giờ')) {
            date = new Date();
            date.setHours(date.getHours() - T);
            return date;
        }
        if (time.includes('ngày')) {
            date = new Date();
            date.setDate(date.getDate() - T);
            return date;
        }
        if (time.includes('tháng')) {
            date = new Date();
            date.setMonth(date.getMonth() - T);
            return date;
        }
        if (time.includes('năm')) {
            date = new Date();
            date.setFullYear(date.getFullYear() - T);
            return date;
        }
    }

    return new Date();
}
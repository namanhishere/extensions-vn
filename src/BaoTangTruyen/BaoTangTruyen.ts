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
    TagSection,
} from 'paperback-extensions-common';

import { convertTime } from '../utils/time';
import { decodeHtml } from '../utils/decode';
import tags from './tags.json';

const DOMAIN = 'https://baotangtruyen3.com/';
const userAgent =
    'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1';

export const BaoTangTruyenInfo: SourceInfo = {
    version: '1.0.6',
    name: 'Bảo Tàng Truyện',
    icon: 'icon.png',
    author: 'Hoang3409',
    description: 'Extension that pulls manga from Bảo Tàng Truyện',
    contentRating: ContentRating.EVERYONE,
    websiteBaseURL: DOMAIN,
    authorWebsite: 'https://github.com/hoang3402/extensions-vn',
    language: LanguageCode.VIETNAMESE,
    sourceTags: [
        {
            text: 'Recommended',
            type: TagType.GREEN,
        },
        {
            text: 'Notifications',
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
                        'user-agent': userAgent,
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
            method: 'GET',
        });
        const data = await this.requestManager.schedule(request, 1);
        const $ = this.cheerio.load(data.data);

        return createManga({
            id: mangaId,
            titles: [decodeHtml($('h1.title-detail').text().trim())],
            desc: decodeHtml($('#summary').text().trim()),
            image: $('div.col-image > img').attr('data-src'),
            status: MangaStatus.ONGOING,
        });
    }

    override async getChapters(mangaId: string): Promise<Chapter[]> {
        var chapters: Chapter[] = [];

        const request = createRequestObject({
            url: `${DOMAIN}Story/ListChapterByStoryID`,
            param: `?StoryID=${mangaId}`,
            method: 'GET',
        });
        const response = await this.requestManager.schedule(request, 1);
        const $ = this.cheerio.load(response.data);
        const chapterList = $('li.row').slice(1).toArray();
        var index = chapterList.length;

        for (const item of chapterList) {
            var time = $('.col-xs-4.text-center.small', item).text();
            chapters.push(
                createChapter({
                    id: $('.chapter > a', item).attr('data-id'),
                    mangaId: mangaId,
                    name: $('.chapter > a', item).text(),
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
            method: 'GET',
        });
        const response = await this.requestManager.schedule(request, 1);
        const $ = this.cheerio.load(response.data);

        var pages: string[] = [];
        for (const item of $('img[data-index]').toArray()) {
            pages.push($(item).attr('src'));
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
        let page: number = metadata?.page ?? 1;
        let request = createRequestObject({
            url: '',
            method: 'GET',
        });
        if (query.title) {
            request.url = `${DOMAIN}tim-truyen?keyword=${query.title}&page=${page}`;
        }
        if (query.includedTags![0]?.id) {
            request.url = `${DOMAIN}tim-truyen/${
                query.includedTags![0]!.id
            }?page=${page}`;
        }

        const response = await this.requestManager.schedule(request, 1);
        const $ = this.cheerio.load(response.data);

        const results: MangaTile[] = [];

        for (const item of $('.image').toArray()) {
            results.push(
                createMangaTile({
                    id: $('a', item).attr('href').split('-').pop(),
                    title: createIconText({
                        text: decodeHtml($('a', item).attr('title')),
                    }),
                    image: $('img', item).attr('src'),
                })
            );
        }

        return createPagedResults({
            results: results,
            metadata: {
                page: page + 1,
            },
        });
    }

    override async getHomePageSections(
        sectionCallback: (section: HomeSection) => void
    ): Promise<void> {
        let newAdded: HomeSection = createHomeSection({
            id: 'new_added',
            title: 'Truyện Mới Thêm',
            view_more: true,
        });

        //New Updates
        let url = `${DOMAIN}home`;
        let request = createRequestObject({
            url: url,
            method: 'GET',
        });
        let data = await this.requestManager.schedule(request, 1);
        let $ = this.cheerio.load(data.data);

        newAdded.items = this.parseNewUpdatedSection($);
        sectionCallback(newAdded);
    }

    parseNewUpdatedSection(
        $: any
    ): import('paperback-extensions-common').MangaTile[] {
        let manga: MangaTile[] = [];

        for (const item of $('figure.clearfix').toArray()) {
            let title = $(item).find('h3 > a').text().trim();
            let id = $(item).find('a').attr('href')!.split('-').pop()!;
            let image = $(item).find('img').attr('src');
            let subtitle = $(item).find('ul > li > a').first().text();

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
            case 'new_added':
                break;
            default:
        }

        const request = createRequestObject({
            url: `${DOMAIN}home`,
            param: `?page=${page}&typegroup=0`,
            method: 'GET',
        });
        const data = await this.requestManager.schedule(request, 1);
        const $ = this.cheerio.load(data.data);

        let manga: MangaTile[] = [];

        for (const item of $('figure.clearfix').toArray()) {
            let title = $(item).find('h3 > a').text();
            let id = $(item).find('a').attr('href')!.split('-').pop()!;
            let image = $(item).find('img').attr('src');
            let subtitle = $(item).find('ul > li > a').first().text();

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
            method: 'GET',
        });
        const data = await this.requestManager.schedule(request, 1);
        const $ = this.cheerio.load(data.data);

        const updatedManga: string[] = [];

        for (const item of $('figure.clearfix').toArray()) {
            updatedManga.push(
                $(item).find('a').attr('href')!.split('-').pop()!
            );
        }

        const results: string[] = [];

        for (const id of ids) {
            if (updatedManga.includes(id)) {
                results.push(id);
            }
        }

        mangaUpdatesFoundCallback(createMangaUpdates({ ids: results }));
    }

    override async getSearchTags(): Promise<TagSection[]> {
        return [
            createTagSection({
                id: '0',
                label: 'Thể loại',
                tags: tags.map((tag) => createTag(tag)),
            }),
        ];
    }
}

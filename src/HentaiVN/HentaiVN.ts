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
    TagType,
} from 'paperback-extensions-common';

import tags from './tags.json';

const DOMAIN = 'https://hentaivn.tv';
const userAgent =
    'Mozilla/5.0 (iPhone; CPU iPhone OS 15_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1';

export const HentaiVNInfo: SourceInfo = {
    version: '1.2.7',
    name: 'HentaiVN',
    icon: 'icon.png',
    author: 'Hoang3409',
    authorWebsite: 'https://github.com/hoang3402',
    description: 'Extension that pulls manga from HentaiVN.',
    contentRating: ContentRating.ADULT,
    websiteBaseURL: DOMAIN,
    sourceTags: [
        {
            text: 'Recommended',
            type: TagType.GREEN,
        },
        {
            text: 'Hentai',
            type: TagType.RED,
        },
        {
            text: 'Cloudflare',
            type: TagType.YELLOW,
        },
    ],
};

export class HentaiVN extends Source {
    requestManager = createRequestManager({
        requestsPerSecond: 5,
        requestTimeout: 20000,
        interceptor: {
            interceptRequest: async (request: Request): Promise<Request> => {
                request.headers = {
                    ...(request.headers ?? {}),
                    ...{
                        referer: `${DOMAIN}/`,
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
        const Tags = await this.getSearchTags();
        const data = await this.requestManager.schedule(
            createRequestObject({
                url: `${DOMAIN}/${mangaId}-doc-truyen-.html`,
                method: 'GET',
            }),
            1
        );
        const moreInfo = await this.requestManager.schedule(
            createRequestObject({
                url: `${DOMAIN}/list-info-all-mobile.php?id_anime=${mangaId}`,
                method: 'GET',
            }),
            1
        );
        const _title = await this.requestManager.schedule(
            createRequestObject({
                url: `${DOMAIN}/list-info-ten-mobile.php?id_anime=${mangaId}`,
                method: 'GET',
            }),
            1
        );
        let $ = this.cheerio.load(data.data);
        let $More = this.cheerio.load(moreInfo.data);
        let $title = this.cheerio.load(_title.data);

        let title: string = $title('h3 b').text().trim();
        let img: string = $('img.cover-1').first().attr('src');
        let author: string = '';
        let status = MangaStatus.ONGOING;
        let views: number = 0;
        let des: string = 'Không có mô tả!';
        var arr = $More('p').toArray();
        var index = 0;
        for (const item of arr) {
            index++;
            switch ($More('b', item).text().trim()) {
                case 'Tác giả:':
                    author = $More('a', item).text();
                    break;
                case 'Tình Trạng:':
                    status = $More('a', item).text().includes('Đã hoàn thành')
                        ? MangaStatus.COMPLETED
                        : status;
                    break;
                case 'Nội dung:':
                    console.log('index ', index);
                    $More(arr[index])
                        .toArray()
                        .forEach((e: any) => {
                            des += $More(e).text() + '\n';
                        });
                    break;
                default:
                    break;
            }
        }

        let tags: Tag[] = [];
        var regex = /idtltruyenmobile=([^&]+)/;
        var match = data.data.match(regex);
        var result: string = match ? match[1]! : '';
        result.split(',').map((id) => {
            tags.push(Tags[0]!.tags.find((tag) => tag.id == id)!);
        });

        return createManga({
            id: mangaId,
            titles: [title],
            image: img,
            desc: des,
            status: status,
            hentai: true,
            author: author,
            artist: '',
            views: views,
            tags: [
                createTagSection({
                    id: '0',
                    label: 'Thể loại',
                    tags: tags,
                }),
            ],
        });
    }

    override async getChapters(mangaId: string): Promise<Chapter[]> {
        const chapters: Chapter[] = [];
        const request = createRequestObject({
            url: `${DOMAIN}/list-showchapter.php`,
            param: `?idchapshow=${mangaId}`,
            method: 'GET',
        });
        const data = await this.requestManager.schedule(request, 1);
        let $ = this.cheerio.load(data.data);

        const arr = $('tr').toArray();
        for (var item of arr) {
            var idChap = $('a', item).attr('href').split('-')[1];
            chapters.push(
                createChapter({
                    id: idChap,
                    mangaId: mangaId,
                    name: $('h2', item).text(),
                    chapNum: arr.length - arr.indexOf(item),
                    langCode: LanguageCode.VIETNAMESE,
                })
            );
        }
        return chapters;
    }

    override async getChapterDetails(
        mangaId: string,
        chapterId: string
    ): Promise<ChapterDetails> {
        const listUrlImage: string[] = [];
        const request = createRequestObject({
            url: `${DOMAIN}/ajax_load_server.php`,
            data: `server_id=${chapterId}&server_type=3`,
            method: 'POST',
        });
        const data = await this.requestManager.schedule(request, 1);
        let $ = this.cheerio.load(data.data);

        for (const item of $('img').toArray()) {
            listUrlImage.push(item.attribs.src);
        }

        return createChapterDetails({
            id: chapterId,
            mangaId: mangaId,
            pages: listUrlImage,
            longStrip: false,
        });
    }

    override async getSearchResults(
        query: SearchRequest,
        metadata: any
    ): Promise<PagedResults> {
        const page: number = metadata?.page ?? 1;

        const request = createRequestObject({
            url: `${DOMAIN}/forum/search-plus.php`,
            param: `?name=${encodeURIComponent(
                query.title!
            )}&dou=&char=&search=&page=${page}`,
            method: 'GET',
        });
        for (const item of query.includedTags!) {
            request.param += `&tag[]=${item.id}`;
        }
        const data = await this.requestManager.schedule(request, 1);
        const $ = this.cheerio.load(data.data);
        const tiles: MangaTile[] = [];
        for (let item of $('li.search-li').toArray()) {
            tiles.push(
                createMangaTile({
                    id: $('div.search-img > a', item)
                        .attr('href')
                        .split('-')[0]
                        .replace('/', ''),
                    title: createIconText({
                        text: $('b', item).first().text(),
                    }),
                    image: $('img', item).attr('src'),
                })
            );
        }
        metadata = tiles.length === 0 ? undefined : { page: page + 1 };

        return createPagedResults({
            results: tiles,
            metadata: metadata,
        });
    }

    // Sections
    override async getHomePageSections(
        sectionCallback: (section: HomeSection) => void
    ): Promise<void> {
        let newAdded: HomeSection = createHomeSection({
            id: 'new_added',
            title: 'Truyện Mới Cập Nhật',
            view_more: true,
        });
        //Load empty sections
        sectionCallback(newAdded);
        //New Updates
        let request = createRequestObject({
            url: `${DOMAIN}/list-new2.php`,
            method: 'GET',
        });
        let data = await this.requestManager.schedule(request, 1);
        let $ = this.cheerio.load(data.data);
        newAdded.items = await this.parseNewUpdatedSection($);
        sectionCallback(newAdded);
    }

    async parseNewUpdatedSection(
        $: any
    ): Promise<import('paperback-extensions-common').MangaTile[]> {
        const items: MangaTile[] = [];
        for (let item of $('ul.page-random').toArray()) {
            items.push(
                createMangaTile({
                    id: $('div.img-same > a', item)
                        .attr('href')
                        .split('-')[0]
                        .replace('/', ''),
                    title: createIconText({
                        text: $('b', item).first().text(),
                    }),
                    image: $('div[style*=background]', item)
                        .attr('style')
                        .match(/background:url\((.+)\);/)[1],
                })
            );
        }
        return items;
    }

    override async getViewMoreItems(
        homepageSectionId: string,
        metadata: any
    ): Promise<PagedResults> {
        const page: number = metadata?.page ?? 1;
        let url = '';
        let param = '';

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
            method: 'GET',
        });

        const data = await this.requestManager.schedule(request, 1);
        const $ = this.cheerio.load(data.data);
        const tiles: MangaTile[] = [];

        for (let item of $('li.item > ul').toArray()) {
            tiles.push(
                createMangaTile({
                    id: $('a', item)
                        .attr('href')
                        .split('-')[0]
                        .replace('/', ''),
                    title: createIconText({ text: $('img', item).attr('alt') }),
                    image: $('img', item).attr('src'),
                })
            );
        }

        metadata = tiles.length === 0 ? undefined : { page: page + 1 };

        return createPagedResults({
            results: tiles,
            metadata: metadata,
        });
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

    override getCloudflareBypassRequest(): Request {
        return createRequestObject({
            url: DOMAIN,
            method: 'GET',
            headers: {
                referer: `${DOMAIN}/`,
                'user-agent': userAgent,
            },
        });
    }
}

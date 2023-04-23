
import {
    Chapter,
    ChapterDetails,
    LanguageCode,
    MangaStatus,
    MangaTile,
    Tag,
    TagSection
} from "paperback-extensions-common"

import { DOMAIN } from './SayHentai'

export function getChapters($: any, mangaId: string): Chapter[] {
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

export function getChapterDetails($: any, chapterId: string, mangaId: string): ChapterDetails {
    let pages: string[] = [];
    for (let item of $('.page-break img').toArray()) {
        pages.push($(item).attr('src'));
    }

    return createChapterDetails({
        id: chapterId,
        mangaId: mangaId,
        pages: pages,
        longStrip: false
    });
}

export function getMangaTile($: any): MangaTile[] {
    var result: MangaTile[] = [];

    for (let item of $('div.page-item-detail').toArray()) {
        var img = $('img', item).attr('src') ?? $('img', item).attr('data-src');
        result.push(createMangaTile({
            id: $('.line-2 > a', item).attr('href').replace(DOMAIN, ''),
            title: createIconText({
                text: $('.line-2 > a', item).text()
            }),
            image: encodeURI(img),
        }));
    }

    return result;
}

export function getManga($: any, tags: TagSection[], mangaId: string) {
    let genres: Tag[] = [];
    for (const genre of $('.genres-content > a').toArray()) {
        let label = $(genre).text();
        let tag = tags[0]!.tags.find(x => x.label === label);
        if (tag) {
            genres.push(tag);
        }
    }

    return createManga({
        id: mangaId,
        titles: [$('.post-title').text()],
        image: $('.summary_image img').attr('src'),
        desc: $('.description-summary p').text(),
        status: MangaStatus.ONGOING,
        tags: [createTagSection({
            id: '0',
            label: 'Thể loại',
            tags: genres
        })]
    });
}

export function isLastPage(numberManga: number): boolean {
    if (numberManga < 40) {
        return true;
    } else {
        return false;
    }
}
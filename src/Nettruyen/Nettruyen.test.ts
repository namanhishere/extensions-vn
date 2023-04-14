import { expect } from "chai";
import * as cheerio from 'cheerio';
import {
    MangaUpdates,
    SearchRequest,
    Source,
} from "paperback-extensions-common";
import { Nettruyen } from "./Nettruyen";

describe("NetTruyen", function () {
    let source: Source;
    let nettruyen: Nettruyen;

    before(async () => {
        source = new Nettruyen(cheerio);
        nettruyen = source as Nettruyen;
    });

    describe("getChapters()", function () {
        it.skip('Get Chapter', async () => {
            const data = await nettruyen.getChapters("verndio-su-thi-ve-mong-kiem-60612");
            expect(data, 'Null').to.be.not.empty
            console.log(data);
        })
    });

    describe("getSearchTags()", function () {
        it.skip('Get Tags', async () => {
            const data = await nettruyen.getSearchTags();
            expect(data, 'Null').to.be.not.empty
            console.debug(data[0]?.tags);
        })
    });

    describe("getMangaDetails()", function () {
        it.skip('Get Manga Details', async () => {
            const data = await nettruyen.getMangaDetails('verndio-su-thi-ve-mong-kiem-60612');
            expect(data, 'Null').to.be.not.empty
            console.debug(data);
        })
    });

    describe("getSearchResults()", function () {
        it.skip('Get Search', async () => {
            var meta = ''
            var query: SearchRequest = {
                title: 'One',
                parameters: {},
                includedTags: [createTag({
                    id: "15",
                    label: ""
                })]
            }
            const data = await nettruyen.getSearchResults(query, meta);
            expect(data, 'Null').to.be.not.empty
            console.log(data);
        })
    });

    describe("filterUpdatedManga()", function () {
        it.skip('Get Manga Details', async () => {
            nettruyen.filterUpdatedManga(
                (updates: MangaUpdates) => {
                    console.debug('Dang cap nhat: ' + updates.ids)
                },
                new Date,
                ["dinh-cap-khi-van-lang-le-tu-luyen-ngan-nam-63226", "tro-thanh-tai-phiet-nho-game-74151", "truoc-khi-vo-dich-ta-no-tinh-qua-nhieu-71614", "chuyen-sinh-vao-the-gioi-vo-lam-74995", "man-cap-tra-xanh-xuyen-khong-thanh-tieu-dang-thuong-62902", "ta-co-the-don-ngo-vo-han-74869", "phap-su-phe-vat-71545", "moi-tuan-ta-co-mot-nghe-nghiep-moi-505430", "66879", "65660", "71030"]
            )
        })
    });

    describe("ConvertTime()", function () {
        it.skip('Convert Time', async () => {
            var data = nettruyen.convertTime("1 giờ trước");
            // var data = nettruyen.convertTime("16 ngày trước");
            // var data = nettruyen.convertTime("12:44 05/02");
            // var data = nettruyen.convertTime("29/12/22");
            console.debug(data);
        })
    });
});

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
            const data = await nettruyen.getChapters("gay-go-cap-99-600783");
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
            const data = await nettruyen.getMangaDetails('/co-vo-moi-cuoi-cua-toi-luc-nao-cung-mim-cuoi-269050');
            expect(data, 'Null').to.be.not.empty
            console.debug(data.tags);
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
                ["dinh-cap-khi-van-lang-le-tu-luyen-ngan-nam-63226", "tro-thanh-tai-phiet-nho-game-74151", "truoc-khi-vo-dich-ta-no-tinh-qua-nhieu-71614", "chuyen-sinh-vao-the-gioi-vo-lam-74995", "man-cap-tra-xanh-xuyen-khong-thanh-tieu-dang-thuong-62902", "ta-co-the-don-ngo-vo-han-74869", "phap-su-phe-vat-71545", "moi-tuan-ta-co-mot-nghe-nghiep-moi-505430", "ta-vo-dich-luc-nao-511741", "nguoi-tren-van-nguoi-409120", "tai-khoan-loi-ta-tro-thanh-vo-dich-74624", "ta-o-nha-100-nam-khi-ra-ngoai-da-vo-dich-72436", "tu-luc-bat-dau-lien-vo-dich-494800", "nguyen-lai-ta-la-tu-tien-dai-lao-554130", "dai-dao-trieu-thien-571190", "cuong-gia-tuyet-the-chi-muon-lam-ruong-69498", "ta-that-su-khong-phai-la-cai-the-cao-nhan-74716", "toi-vo-dich-sau-khi-xuong-nui-65438", "khong-nhuong-nua-ta-chet-ta-lien-that-vo-dich-64418", "toi-cuong-thon-phe-he-thong-72889", "mang-theo-cac-tien-tu-vo-dich-thien-ha-61501", "nhat-chieu-lien-vo-dich-tu-chan-gioi-69189", "chang-re-manh-nhat-lich-su-72026", "toi-thang-cap-bang-cach-thuong-cho-nhung-de-tu-71858", "ta-dua-vao-danh-hao-he-thong-da-bai-ngan-van-than-hao-71383", "hau-cung-cua-ta-dua-vao-rut-the-331540", "cac-nguoi-tu-tien-con-ta-rut-the-62628", "ta-dung-la-cao-thu-tuyet-the-74472", "ky-nang-vo-dung-auto-mode-bong-dung-thuc-tinh-ha-to-doi-trinh-sat-may-nguoi-chang-phai-da-noi-64599", "sieu-cap-bai-gia-tu-266790", "ta-lam-kieu-hung-tai-di-gioi-77404", "he-thong-super-god-550100", "mo-dau-nu-de-lam-chinh-cung-77547", "cuc-pham-tien-de-425320", "ban-kiem-tien-tuyet-khong-lam-no-417360", "anh-hung-giai-cap-tu-san-76309", "ta-nam-lien-bien-cuong-78558", "nito-no-taidana-isekai-shoukougun-sai-jakushoku-healer-nano-ni-saikyou-wa-desu-ka-259780", "gay-go-cap-99-600783", "nhap-hon-ma-dao-to-su-66862", "ta-o-tu-tien-gioi-chi-lam-gio-hanh-chinh-80995", "kare-to-kanojo-no-sentaku-556390", "senpai-luoi-hoa-gai-81626", "66879", "65660", "71030"]
            )
        })
    });
});

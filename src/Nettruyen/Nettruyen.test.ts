import { expect } from "chai";
import * as cheerio from 'cheerio';
import {
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
            const data = await nettruyen.getChapters("60533");
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
});

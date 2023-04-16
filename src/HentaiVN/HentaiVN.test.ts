import { expect } from "chai";
import * as cheerio from "cheerio";
import { SearchRequest, Source } from "paperback-extensions-common";
import { HentaiVN } from "./HentaiVN";

describe("HentaiVN", function () {
    let source: Source;
    let hentaivn: HentaiVN;

    source = new HentaiVN(cheerio);
    hentaivn = source as HentaiVN;

    describe("getMangaDetails()", function () {
        it.skip("Get Manga Details", async () => {
            var data = await hentaivn.getMangaDetails(
                "33394"
            );
            expect(data, "Null").to.be.not.empty;
            expect(data.image, "Null").to.be.not.empty;
            expect(data.image, "Not correct format").to.be.includes("http");
            console.debug(data);
            console.debug(data.tags!.at(0)!.tags);
        });
    });

    describe("getChapters()", function () {
        it.skip("Get Chapters", async () => {
            var data = await hentaivn.getChapters("23931");
            expect(data, "Null").to.be.not.empty;
            console.debug(data);
        });
    });

    describe("getChapterDetails()", function () {
        it.skip("Get Chapters Details", async () => {
            var data = await hentaivn.getChapterDetails("29301", "61703");
            expect(data, "Null").to.be.not.empty;
            console.debug(data);
        });
    });

    describe("getViewMoreItems()", function () {
        it.skip("Get View More Items", async () => {
            var data = await hentaivn.getViewMoreItems("new_added", "");
            expect(data, "Null").to.be.not.empty;
            console.debug(data);
        });
    });

    describe("getSearchTags()", function () {
        it.skip("Get Search Tags", async () => {
            var data = await hentaivn.getSearchTags();
            expect(data[0]!.tags, "Null").to.be.not.empty;
            console.debug(data[0]!.tags);
        });
    });

    describe("getSearchResults()", function () {
        it.skip("Get Search Tags", async () => {
            var Srequest: SearchRequest = {
                parameters: {},
                title: "đây là một đoạn tét",
                includedTags: [],
            };
            var data = await hentaivn.getSearchResults(Srequest, "");
            expect(data, "Null").to.be.not.empty;
            console.debug(data);
        });
    });
});

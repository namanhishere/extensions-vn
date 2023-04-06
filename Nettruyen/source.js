(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Sources = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
"use strict";
/**
 * Request objects hold information for a particular source (see sources for example)
 * This allows us to to use a generic api to make the calls against any source
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlEncodeObject = exports.convertTime = exports.Source = void 0;
class Source {
    constructor(cheerio) {
        this.cheerio = cheerio;
    }
    /**
     * @deprecated use {@link Source.getSearchResults getSearchResults} instead
     */
    searchRequest(query, metadata) {
        return this.getSearchResults(query, metadata);
    }
    /**
     * @deprecated use {@link Source.getSearchTags} instead
     */
    getTags() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            return (_a = this.getSearchTags) === null || _a === void 0 ? void 0 : _a.call(this);
        });
    }
}
exports.Source = Source;
// Many sites use '[x] time ago' - Figured it would be good to handle these cases in general
function convertTime(timeAgo) {
    var _a;
    let time;
    let trimmed = Number(((_a = /\d*/.exec(timeAgo)) !== null && _a !== void 0 ? _a : [])[0]);
    trimmed = (trimmed == 0 && timeAgo.includes('a')) ? 1 : trimmed;
    if (timeAgo.includes('minutes')) {
        time = new Date(Date.now() - trimmed * 60000);
    }
    else if (timeAgo.includes('hours')) {
        time = new Date(Date.now() - trimmed * 3600000);
    }
    else if (timeAgo.includes('days')) {
        time = new Date(Date.now() - trimmed * 86400000);
    }
    else if (timeAgo.includes('year') || timeAgo.includes('years')) {
        time = new Date(Date.now() - trimmed * 31556952000);
    }
    else {
        time = new Date(Date.now());
    }
    return time;
}
exports.convertTime = convertTime;
/**
 * When a function requires a POST body, it always should be defined as a JsonObject
 * and then passed through this function to ensure that it's encoded properly.
 * @param obj
 */
function urlEncodeObject(obj) {
    let ret = {};
    for (const entry of Object.entries(obj)) {
        ret[encodeURIComponent(entry[0])] = encodeURIComponent(entry[1]);
    }
    return ret;
}
exports.urlEncodeObject = urlEncodeObject;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tracker = void 0;
class Tracker {
    constructor(cheerio) {
        this.cheerio = cheerio;
    }
}
exports.Tracker = Tracker;

},{}],4:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Source"), exports);
__exportStar(require("./Tracker"), exports);

},{"./Source":2,"./Tracker":3}],5:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./base"), exports);
__exportStar(require("./models"), exports);
__exportStar(require("./APIWrapper"), exports);

},{"./APIWrapper":1,"./base":4,"./models":47}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],7:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],8:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],9:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],10:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],11:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],12:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],13:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],14:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],15:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],16:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],17:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],18:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],19:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],20:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],21:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],22:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],23:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],24:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Button"), exports);
__exportStar(require("./Form"), exports);
__exportStar(require("./Header"), exports);
__exportStar(require("./InputField"), exports);
__exportStar(require("./Label"), exports);
__exportStar(require("./Link"), exports);
__exportStar(require("./MultilineLabel"), exports);
__exportStar(require("./NavigationButton"), exports);
__exportStar(require("./OAuthButton"), exports);
__exportStar(require("./Section"), exports);
__exportStar(require("./Select"), exports);
__exportStar(require("./Switch"), exports);
__exportStar(require("./WebViewButton"), exports);
__exportStar(require("./FormRow"), exports);
__exportStar(require("./Stepper"), exports);

},{"./Button":9,"./Form":10,"./FormRow":11,"./Header":12,"./InputField":13,"./Label":14,"./Link":15,"./MultilineLabel":16,"./NavigationButton":17,"./OAuthButton":18,"./Section":19,"./Select":20,"./Stepper":21,"./Switch":22,"./WebViewButton":23}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeSectionType = void 0;
var HomeSectionType;
(function (HomeSectionType) {
    HomeSectionType["singleRowNormal"] = "singleRowNormal";
    HomeSectionType["singleRowLarge"] = "singleRowLarge";
    HomeSectionType["doubleRow"] = "doubleRow";
    HomeSectionType["featured"] = "featured";
})(HomeSectionType = exports.HomeSectionType || (exports.HomeSectionType = {}));

},{}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageCode = void 0;
var LanguageCode;
(function (LanguageCode) {
    LanguageCode["UNKNOWN"] = "_unknown";
    LanguageCode["BENGALI"] = "bd";
    LanguageCode["BULGARIAN"] = "bg";
    LanguageCode["BRAZILIAN"] = "br";
    LanguageCode["CHINEESE"] = "cn";
    LanguageCode["CZECH"] = "cz";
    LanguageCode["GERMAN"] = "de";
    LanguageCode["DANISH"] = "dk";
    LanguageCode["ENGLISH"] = "gb";
    LanguageCode["SPANISH"] = "es";
    LanguageCode["FINNISH"] = "fi";
    LanguageCode["FRENCH"] = "fr";
    LanguageCode["WELSH"] = "gb";
    LanguageCode["GREEK"] = "gr";
    LanguageCode["CHINEESE_HONGKONG"] = "hk";
    LanguageCode["HUNGARIAN"] = "hu";
    LanguageCode["INDONESIAN"] = "id";
    LanguageCode["ISRELI"] = "il";
    LanguageCode["INDIAN"] = "in";
    LanguageCode["IRAN"] = "ir";
    LanguageCode["ITALIAN"] = "it";
    LanguageCode["JAPANESE"] = "jp";
    LanguageCode["KOREAN"] = "kr";
    LanguageCode["LITHUANIAN"] = "lt";
    LanguageCode["MONGOLIAN"] = "mn";
    LanguageCode["MEXIAN"] = "mx";
    LanguageCode["MALAY"] = "my";
    LanguageCode["DUTCH"] = "nl";
    LanguageCode["NORWEGIAN"] = "no";
    LanguageCode["PHILIPPINE"] = "ph";
    LanguageCode["POLISH"] = "pl";
    LanguageCode["PORTUGUESE"] = "pt";
    LanguageCode["ROMANIAN"] = "ro";
    LanguageCode["RUSSIAN"] = "ru";
    LanguageCode["SANSKRIT"] = "sa";
    LanguageCode["SAMI"] = "si";
    LanguageCode["THAI"] = "th";
    LanguageCode["TURKISH"] = "tr";
    LanguageCode["UKRAINIAN"] = "ua";
    LanguageCode["VIETNAMESE"] = "vn";
})(LanguageCode = exports.LanguageCode || (exports.LanguageCode = {}));

},{}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MangaStatus = void 0;
var MangaStatus;
(function (MangaStatus) {
    MangaStatus[MangaStatus["ONGOING"] = 1] = "ONGOING";
    MangaStatus[MangaStatus["COMPLETED"] = 0] = "COMPLETED";
    MangaStatus[MangaStatus["UNKNOWN"] = 2] = "UNKNOWN";
    MangaStatus[MangaStatus["ABANDONED"] = 3] = "ABANDONED";
    MangaStatus[MangaStatus["HIATUS"] = 4] = "HIATUS";
})(MangaStatus = exports.MangaStatus || (exports.MangaStatus = {}));

},{}],28:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],29:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],30:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],31:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],32:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],33:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],34:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],35:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],36:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],37:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchOperator = void 0;
var SearchOperator;
(function (SearchOperator) {
    SearchOperator["AND"] = "AND";
    SearchOperator["OR"] = "OR";
})(SearchOperator = exports.SearchOperator || (exports.SearchOperator = {}));

},{}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentRating = void 0;
/**
 * A content rating to be attributed to each source.
 */
var ContentRating;
(function (ContentRating) {
    ContentRating["EVERYONE"] = "EVERYONE";
    ContentRating["MATURE"] = "MATURE";
    ContentRating["ADULT"] = "ADULT";
})(ContentRating = exports.ContentRating || (exports.ContentRating = {}));

},{}],40:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],41:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],42:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagType = void 0;
/**
 * An enumerator which {@link SourceTags} uses to define the color of the tag rendered on the website.
 * Five types are available: blue, green, grey, yellow and red, the default one is blue.
 * Common colors are red for (Broken), yellow for (+18), grey for (Country-Proof)
 */
var TagType;
(function (TagType) {
    TagType["BLUE"] = "default";
    TagType["GREEN"] = "success";
    TagType["GREY"] = "info";
    TagType["YELLOW"] = "warning";
    TagType["RED"] = "danger";
})(TagType = exports.TagType || (exports.TagType = {}));

},{}],43:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],44:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],45:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],46:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],47:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Chapter"), exports);
__exportStar(require("./ChapterDetails"), exports);
__exportStar(require("./HomeSection"), exports);
__exportStar(require("./Manga"), exports);
__exportStar(require("./MangaTile"), exports);
__exportStar(require("./RequestObject"), exports);
__exportStar(require("./SearchRequest"), exports);
__exportStar(require("./TagSection"), exports);
__exportStar(require("./SourceTag"), exports);
__exportStar(require("./Languages"), exports);
__exportStar(require("./Constants"), exports);
__exportStar(require("./MangaUpdate"), exports);
__exportStar(require("./PagedResults"), exports);
__exportStar(require("./ResponseObject"), exports);
__exportStar(require("./RequestManager"), exports);
__exportStar(require("./RequestHeaders"), exports);
__exportStar(require("./SourceInfo"), exports);
__exportStar(require("./SourceStateManager"), exports);
__exportStar(require("./RequestInterceptor"), exports);
__exportStar(require("./DynamicUI"), exports);
__exportStar(require("./TrackedManga"), exports);
__exportStar(require("./SourceManga"), exports);
__exportStar(require("./TrackedMangaChapterReadAction"), exports);
__exportStar(require("./TrackerActionQueue"), exports);
__exportStar(require("./SearchField"), exports);
__exportStar(require("./RawData"), exports);

},{"./Chapter":6,"./ChapterDetails":7,"./Constants":8,"./DynamicUI":24,"./HomeSection":25,"./Languages":26,"./Manga":27,"./MangaTile":28,"./MangaUpdate":29,"./PagedResults":30,"./RawData":31,"./RequestHeaders":32,"./RequestInterceptor":33,"./RequestManager":34,"./RequestObject":35,"./ResponseObject":36,"./SearchField":37,"./SearchRequest":38,"./SourceInfo":39,"./SourceManga":40,"./SourceStateManager":41,"./SourceTag":42,"./TagSection":43,"./TrackedManga":44,"./TrackedMangaChapterReadAction":45,"./TrackerActionQueue":46}],48:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServerUnavailableMangaTiles = exports.Nettruyen = exports.NettruyenInfo = void 0;
const paperback_extensions_common_1 = require("paperback-extensions-common");
const tags_json_1 = __importDefault(require("./tags.json"));
const DOMAIN = "https://www.nettruyenvt.com";
exports.NettruyenInfo = {
    version: "1.0.6",
    name: "NetTruyen",
    icon: "icon.jpg",
    author: "Hoang3409",
    authorWebsite: "https://github.com/hoang3402",
    description: "Extension that pulls manga from NetTruyen.",
    websiteBaseURL: DOMAIN,
    contentRating: paperback_extensions_common_1.ContentRating.MATURE,
    sourceTags: [
        {
            text: "Recommended",
            type: paperback_extensions_common_1.TagType.BLUE,
        },
        {
            text: "Notifications",
            type: paperback_extensions_common_1.TagType.GREEN,
        },
    ],
};
class Nettruyen extends paperback_extensions_common_1.Source {
    constructor() {
        super(...arguments);
        this.requestManager = createRequestManager({
            requestsPerSecond: 5,
            requestTimeout: 20000,
            interceptor: {
                interceptRequest: async (request) => {
                    request.headers = {
                        ...(request.headers ?? {}),
                        ...{
                            referer: DOMAIN,
                        },
                    };
                    return request;
                },
                interceptResponse: async (response) => {
                    return response;
                },
            },
        });
    }
    async getHomePageSections(sectionCallback) {
        let newAdded = createHomeSection({
            id: "new_added",
            title: "Truyện Mới Thêm",
            view_more: true,
        });
        //Load empty sections
        sectionCallback(newAdded);
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
    async getMangaDetails(mangaId) {
        try {
            const Tags = await this.getSearchTags();
            const url = `${DOMAIN}/truyen-tranh/${mangaId}`;
            const request = createRequestObject({
                url: url,
                method: "GET",
            });
            const data = await this.requestManager.schedule(request, 1);
            let $ = this.cheerio.load(data.data);
            var temp = $("#item-detail > div.detail-info > div > div.col-xs-4.col-image > img");
            var image = "http:" + temp.attr("src");
            var titles = temp.attr("alt");
            var des = $("#item-detail > div.detail-content > p").text();
            var id = $("#item-detail > div.detail-info > div > div.col-xs-8.col-info > div.row.rating > div:nth-child(1) > div").attr("data-id");
            var tags = [];
            for (let tag of $(".kind.row > .col-xs-8 > a").toArray()) {
                const label = $(tag).text();
                const id = Tags[0].tags.find((tag) => tag.label == label);
                tags.push(createTag({
                    id: id.id,
                    label: label,
                }));
            }
            // var rating = $('div.star').attr('data-rating')!;
            return createManga({
                id: id,
                author: "Nettruyen ăn cắp của ai đó",
                artist: "chịu á",
                desc: des,
                titles: [titles, id],
                image: image,
                status: 1,
                rating: 5,
                hentai: false,
                tags: [
                    createTagSection({
                        id: "0",
                        label: "Thể loại",
                        tags: tags,
                    }),
                ],
            });
        }
        catch (e) {
            throw new Error("Error: " + e);
        }
    }
    async getChapters(mangaId) {
        const chapters = [];
        const request = createRequestObject({
            url: `${DOMAIN}/Comic/Services/ComicService.asmx/ProcessChapterList`,
            param: `?comicId=${mangaId}`,
            method: "GET",
        });
        const data = await this.requestManager.schedule(request, 1);
        let list = typeof data.data === "string" ? JSON.parse(data.data) : data.data;
        for (let chapter of list.chapters) {
            chapters.push(createChapter({
                id: chapter.url,
                name: chapter.name,
                mangaId: mangaId,
                chapNum: Number.parseInt(String(chapter.name).split(" ").at(1)),
                langCode: paperback_extensions_common_1.LanguageCode.VIETNAMESE,
            }));
        }
        return chapters;
    }
    async getChapterDetails(mangaId, chapterId) {
        const request = createRequestObject({
            url: DOMAIN,
            param: chapterId,
            method: "GET",
        });
        const data = await this.requestManager.schedule(request, 1);
        let $ = this.cheerio.load(data.data);
        const pages = [];
        for (let image of $(".page-chapter").toArray()) {
            var link = $("div.page-chapter > img", image).attr("data-original");
            if (link.indexOf("http") === -1) {
                pages.push("http:" + link);
            }
            else {
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
    async getSearchResults(query, metadata) {
        const page = metadata?.page ?? 1;
        let advanced;
        const tiles = [];
        let url = "";
        let param = "";
        if (query.includedTags.length > 0) {
            advanced = true;
            url = `${DOMAIN}/tim-truyen-nang-cao`;
            param = `?genres=${query
                .includedTags.map((tag) => tag.id)
                .join(",")}&notgenres=&gender=-1&status=-1&minchapter=1&sort=0?page=${page}`;
        }
        else {
            advanced = false;
            url = `${DOMAIN}/Comic/Services/SuggestSearch.ashx`;
            param = `?q=${encodeURIComponent(query.title)}`;
        }
        const request = createRequestObject({
            url: url,
            param: param,
            method: "GET",
        });
        let data;
        try {
            data = await this.requestManager.schedule(request, 1);
        }
        catch (error) {
            console.log(`searchRequest failed with error: ${error}`);
            return createPagedResults({
                results: getServerUnavailableMangaTiles(),
            });
        }
        let $ = this.cheerio.load(data.data);
        if (advanced) {
            for (let item of $(".item").toArray()) {
                var img = $("img", item).attr("data-original");
                if (img === undefined) {
                    img = $("img", item).attr("src");
                }
                tiles.push(createMangaTile({
                    id: $("a", item)
                        .attr("href")
                        ?.replace(`${DOMAIN}/truyen-tranh/`, ""),
                    title: createIconText({ text: $("h3 > a", item).text() }),
                    image: "http:" + img,
                }));
            }
        }
        else {
            for (let item of $("li").toArray()) {
                tiles.push(createMangaTile({
                    id: $("a", item)
                        .attr("href")
                        ?.replace(`${DOMAIN}/truyen-tranh/`, ""),
                    title: createIconText({ text: $("a > h3", item).text() }),
                    image: "http:" + $("a > img", item).attr("src"),
                }));
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
    async getViewMoreItems(homepageSectionId, metadata) {
        const page = metadata?.page ?? 1;
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
        const tiles = [];
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
            const subtitle = $("figure.clearfix > figcaption > ul > li.chapter:nth-of-type(1) > a", manga)
                .last()
                .text()
                .trim();
            if (!id || !title)
                continue;
            tiles.push(createMangaTile({
                id: id,
                image: !image ? "https://i.imgur.com/GYUxEX8.png" : "http:" + image,
                title: createIconText({ text: title }),
                subtitleText: createIconText({ text: subtitle }),
            }));
        }
        metadata = tiles.length === 0 ? undefined : { page: page + 1 };
        return createPagedResults({
            results: tiles,
            metadata: metadata,
        });
    }
    parseNewUpdatedSection($) {
        let newUpdatedItems = [];
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
            const subtitle = $("figure.clearfix > figcaption > ul > li.chapter:nth-of-type(1) > a", manga)
                .last()
                .text()
                .trim();
            if (!id || !title)
                continue;
            newUpdatedItems.push(createMangaTile({
                id: id,
                image: !image ? "https://i.imgur.com/GYUxEX8.png" : "http:" + image,
                title: createIconText({ text: title }),
                subtitleText: createIconText({ text: subtitle }),
            }));
        }
        return newUpdatedItems;
    }
    async getSearchTags() {
        const tagSections = [
            createTagSection({
                id: "0",
                label: "Thể loại",
                tags: tags_json_1.default.map((tag) => createTag({
                    id: tag.id,
                    label: tag.label,
                })),
            }),
        ];
        // var tags: Tag[] = [];
        // const request = createRequestObject({
        //     url: `${DOMAIN}/tim-truyen-nang-cao`,
        //     method: "GET",
        // });
        // const data = await this.requestManager.schedule(request, 1)
        // const $ = this.cheerio.load(data.data)
        // for (const item of $('.row > .col-md-3.col-sm-4.col-xs-6.mrb10').toArray()) {
        //     tags.push(createTag({
        //         id: $('span', item).attr('data-id'),
        //         label: $('.genre-item', item).text().replace('\n\n', '')
        //     }))
        // }
        // tagSections[0]!.tags = tags;
        return tagSections;
    }
}
exports.Nettruyen = Nettruyen;
function getServerUnavailableMangaTiles() {
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
exports.getServerUnavailableMangaTiles = getServerUnavailableMangaTiles;

},{"./tags.json":49,"paperback-extensions-common":5}],49:[function(require,module,exports){
module.exports=[
    {
        "id": "1",
        "label": "Action"
    },
    {
        "id": "2",
        "label": "Adult"
    },
    {
        "id": "3",
        "label": "Adventure"
    },
    {
        "id": "4",
        "label": "Anime"
    },
    {
        "id": "5",
        "label": "Chuyển Sinh"
    },
    {
        "id": "6",
        "label": "Comedy"
    },
    {
        "id": "7",
        "label": "Comic"
    },
    {
        "id": "8",
        "label": "Cooking"
    },
    {
        "id": "9",
        "label": "Cổ Đại"
    },
    {
        "id": "10",
        "label": "Doujinshi"
    },
    {
        "id": "11",
        "label": "Drama"
    },
    {
        "id": "12",
        "label": "Đam Mỹ"
    },
    {
        "id": "13",
        "label": "Ecchi"
    },
    {
        "id": "14",
        "label": "Fantasy"
    },
    {
        "id": "15",
        "label": "Gender Bender"
    },
    {
        "id": "16",
        "label": "Harem"
    },
    {
        "id": "17",
        "label": "Lịch sử"
    },
    {
        "id": "18",
        "label": "Horror"
    },
    {
        "id": "20",
        "label": "Josei"
    },
    {
        "id": "21",
        "label": "Live action"
    },
    {
        "id": "23",
        "label": "Manga"
    },
    {
        "id": "24",
        "label": "Manhua"
    },
    {
        "id": "25",
        "label": "Manhwa"
    },
    {
        "id": "26",
        "label": "Martial Arts"
    },
    {
        "id": "27",
        "label": "Mature"
    },
    {
        "id": "28",
        "label": "Mecha"
    },
    {
        "id": "30",
        "label": "Mystery"
    },
    {
        "id": "32",
        "label": "Ngôn Tình"
    },
    {
        "id": "33",
        "label": "One shot"
    },
    {
        "id": "34",
        "label": "Psychological"
    },
    {
        "id": "35",
        "label": "Romance"
    },
    {
        "id": "36",
        "label": "School Life"
    },
    {
        "id": "37",
        "label": "Sci-fi"
    },
    {
        "id": "38",
        "label": "Seinen"
    },
    {
        "id": "39",
        "label": "Shoujo"
    },
    {
        "id": "40",
        "label": "Shoujo Ai"
    },
    {
        "id": "41",
        "label": "Shounen"
    },
    {
        "id": "42",
        "label": "Shounen Ai"
    },
    {
        "id": "43",
        "label": "Slice of Life"
    },
    {
        "id": "44",
        "label": "Smut"
    },
    {
        "id": "45",
        "label": "Soft Yaoi"
    },
    {
        "id": "46",
        "label": "Soft Yuri"
    },
    {
        "id": "47",
        "label": "Sports"
    },
    {
        "id": "48",
        "label": "Supernatural"
    },
    {
        "id": "49",
        "label": "Tạp chí truyện tranh"
    },
    {
        "id": "50",
        "label": "Thiếu Nhi"
    },
    {
        "id": "51",
        "label": "Tragedy"
    },
    {
        "id": "52",
        "label": "Trinh Thám"
    },
    {
        "id": "53",
        "label": "Truyện Màu"
    },
    {
        "id": "54",
        "label": "Truyện scan"
    },
    {
        "id": "55",
        "label": "Việt Nam"
    },
    {
        "id": "56",
        "label": "Webtoon"
    },
    {
        "id": "57",
        "label": "Xuyên Không"
    },
    {
        "id": "58",
        "label": "Yaoi"
    },
    {
        "id": "59",
        "label": "Yuri"
    },
    {
        "id": "60",
        "label": "16+"
    }
]

},{}]},{},[48])(48)
});

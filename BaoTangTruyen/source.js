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
exports.convertTime = exports.decodeHtml = exports.BaoTangTruyen = exports.BaoTangTruyenInfo = void 0;
const paperback_extensions_common_1 = require("paperback-extensions-common");
const tags_json_1 = __importDefault(require("./tags.json"));
const DOMAIN = 'https://baotangtruyengo.com/';
const userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1';
exports.BaoTangTruyenInfo = {
    version: '1.0.4',
    name: 'Bảo Tàng Truyện',
    icon: 'icon.png',
    author: 'Hoang3409',
    description: 'Extension that pulls manga from Bảo Tàng Truyện',
    contentRating: paperback_extensions_common_1.ContentRating.EVERYONE,
    websiteBaseURL: DOMAIN,
    authorWebsite: 'https://github.com/hoang3402/extensions-vn',
    language: paperback_extensions_common_1.LanguageCode.VIETNAMESE,
    sourceTags: [
        {
            text: 'Recommended',
            type: paperback_extensions_common_1.TagType.GREEN,
        },
        {
            text: 'Notifications',
            type: paperback_extensions_common_1.TagType.BLUE,
        },
    ],
};
class BaoTangTruyen extends paperback_extensions_common_1.Source {
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
                            'user-agent': userAgent,
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
    async getMangaDetails(mangaId) {
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
            status: paperback_extensions_common_1.MangaStatus.ONGOING,
        });
    }
    async getChapters(mangaId) {
        var chapters = [];
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
            chapters.push(createChapter({
                id: $('.chapter > a', item).attr('data-id'),
                mangaId: mangaId,
                name: $('.chapter > a', item).text(),
                chapNum: index--,
                langCode: paperback_extensions_common_1.LanguageCode.VIETNAMESE,
                time: convertTime(decodeHtml(time)),
            }));
        }
        return chapters;
    }
    async getChapterDetails(mangaId, chapterId) {
        const request = createRequestObject({
            url: `${DOMAIN}truyen-tranh/a/b/${chapterId}`,
            method: 'GET',
        });
        const response = await this.requestManager.schedule(request, 1);
        const $ = this.cheerio.load(response.data);
        var pages = [];
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
    async getSearchResults(query, metadata) {
        let page = metadata?.page ?? 1;
        let request = createRequestObject({
            url: '',
            method: 'GET',
        });
        if (query.title) {
            request.url = `${DOMAIN}tim-truyen?keyword=${query.title}&page=${page}`;
        }
        if (query.includedTags) {
            request.url = `${DOMAIN}tim-truyen/${query.includedTags[0].id}?page=${page}`;
        }
        const response = await this.requestManager.schedule(request, 1);
        const $ = this.cheerio.load(response.data);
        const results = [];
        for (const item of $('.image').toArray()) {
            results.push(createMangaTile({
                id: $('a', item).attr('href').split('-').pop(),
                title: createIconText({
                    text: decodeHtml($('a', item).attr('title')),
                }),
                image: $('img', item).attr('src'),
            }));
        }
        return createPagedResults({
            results: results,
            metadata: {
                page: page + 1,
            },
        });
    }
    async getHomePageSections(sectionCallback) {
        let newAdded = createHomeSection({
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
    parseNewUpdatedSection($) {
        let manga = [];
        for (const item of $('figure.clearfix').toArray()) {
            let title = $(item).find('h3 > a').text().trim();
            let id = $(item).find('a').attr('href').split('-').pop();
            let image = $(item).find('img').attr('src');
            let subtitle = $(item).find('ul > li > a').first().text();
            manga.push(createMangaTile({
                id: id,
                image: image,
                title: createIconText({ text: decodeHtml(title) }),
                subtitleText: createIconText({
                    text: decodeHtml(subtitle),
                }),
            }));
        }
        return manga;
    }
    async getViewMoreItems(homepageSectionId, metadata) {
        let page = metadata?.page ?? 1;
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
        let manga = [];
        for (const item of $('figure.clearfix').toArray()) {
            let title = $(item).find('h3 > a').text();
            let id = $(item).find('a').attr('href').split('-').pop();
            let image = $(item).find('img').attr('src');
            let subtitle = $(item).find('ul > li > a').first().text();
            manga.push(createMangaTile({
                id: id,
                image: image,
                title: createIconText({ text: decodeHtml(title) }),
                subtitleText: createIconText({
                    text: decodeHtml(subtitle),
                }),
            }));
        }
        return createPagedResults({
            results: manga,
            metadata: {
                page: page + 1,
            },
        });
    }
    async filterUpdatedManga(mangaUpdatesFoundCallback, time, ids) {
        const request = createRequestObject({
            url: `${DOMAIN}tim-truyen`,
            method: 'GET',
        });
        const data = await this.requestManager.schedule(request, 1);
        const $ = this.cheerio.load(data.data);
        const updatedManga = [];
        for (const item of $('figure.clearfix').toArray()) {
            updatedManga.push($(item).find('a').attr('href').split('-').pop());
        }
        const results = [];
        for (const id of ids) {
            if (updatedManga.includes(id)) {
                results.push(id);
            }
        }
        mangaUpdatesFoundCallback(createMangaUpdates({ ids: results }));
    }
    async getSearchTags() {
        return [
            createTagSection({
                id: '0',
                label: 'Thể loại',
                tags: tags_json_1.default.map((tag) => createTag(tag)),
            }),
        ];
    }
}
exports.BaoTangTruyen = BaoTangTruyen;
function decodeHtml(encodedString) {
    const entityRegex = /&(#[0-9]+|[a-z]+);/gi;
    const entities = {
        '&lt;': '<',
        '&gt;': '>',
        '&amp;': '&',
        '&quot;': '"',
        '&apos;': "'",
        '&#39;': "'",
        '&#x2F;': '/',
        '&#x3D;': '=',
        '&#x22;': '"',
        '&#x3C;': '<',
        '&#x3E;': '>',
    };
    return encodedString.replace(entityRegex, (match, entity) => {
        if (entity[0] === '#') {
            const code = entity.slice(1);
            if (code[0] === 'x') {
                return String.fromCharCode(parseInt(code.slice(1), 16));
            }
            else {
                return String.fromCharCode(parseInt(code));
            }
        }
        else {
            return entities[match] || match;
        }
    });
}
exports.decodeHtml = decodeHtml;
function convertTime(time) {
    var date;
    // 29/12/22
    if (time.split('/').length == 3) {
        date = time.split('/');
        date[2] = '20' + date[2];
        return new Date(Number.parseInt(date[2]), Number.parseInt(date[1]) - 1, Number.parseInt(date[0]));
    }
    // 11:44 05/02
    if (time.includes(':')) {
        date = new Date();
        var temp = time.split(' ');
        date.setHours(Number.parseInt(temp[0].split(':')[0]));
        date.setMinutes(Number.parseInt(temp[0].split(':')[1]));
        date.setDate(Number.parseInt(temp[1].split('/')[0]));
        date.setMonth(Number.parseInt(temp[1].split('/')[1]) - 1);
        return date;
    }
    // some thing "* trước"
    if (time.includes('trước')) {
        var T = Number.parseInt(time.split(' ')[0]);
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
exports.convertTime = convertTime;

},{"./tags.json":49,"paperback-extensions-common":5}],49:[function(require,module,exports){
module.exports=[
    {
        "id": "action",
        "label": "Action"
    },
    {
        "id": "anime",
        "label": "Anime"
    },
    {
        "id": "mecha",
        "label": "Mecha"
    },
    {
        "id": "scifi",
        "label": "Sci-fi"
    },
    {
        "id": "shounen",
        "label": "Shounen"
    },
    {
        "id": "co-dai",
        "label": "Cổ Đại"
    },
    {
        "id": "comedy",
        "label": "Comedy"
    },
    {
        "id": "manhua",
        "label": "Manhua"
    },
    {
        "id": "ngon-tinh",
        "label": "Ngôn Tình"
    },
    {
        "id": "romance",
        "label": "Romance"
    },
    {
        "id": "truyen-mau",
        "label": "Truyện Màu"
    },
    {
        "id": "drama",
        "label": "Drama"
    },
    {
        "id": "school-life",
        "label": "School Life"
    },
    {
        "id": "seinen",
        "label": "Seinen"
    },
    {
        "id": "manhwa",
        "label": "Manhwa"
    },
    {
        "id": "comic",
        "label": "Comic"
    },
    {
        "id": "chuyen-sinh",
        "label": "Chuyển Sinh"
    },
    {
        "id": "fantasy",
        "label": "Fantasy"
    },
    {
        "id": "supernatural",
        "label": "Supernatural"
    },
    {
        "id": "webtoon",
        "label": "Webtoon"
    },
    {
        "id": "xuyen-khong",
        "label": "Xuyên Không"
    },
    {
        "id": "shoujo",
        "label": "Shoujo"
    },
    {
        "id": "sports",
        "label": "Sports"
    },
    {
        "id": "manga",
        "label": "Manga"
    },
    {
        "id": "smut",
        "label": "Smut"
    },
    {
        "id": "historical",
        "label": "Historical"
    },
    {
        "id": "adventure",
        "label": "Adventure"
    },
    {
        "id": "slice-of-life",
        "label": "Slice of Life"
    },
    {
        "id": "tragedy",
        "label": "Tragedy"
    },
    {
        "id": "mystery",
        "label": "Mystery"
    },
    {
        "id": "horror",
        "label": "Horror"
    },
    {
        "id": "martial-arts",
        "label": "Martial Arts"
    },
    {
        "id": "shoujo-ai",
        "label": "Shoujo Ai"
    },
    {
        "id": "viet-nam",
        "label": "Việt Nam"
    },
    {
        "id": "dam-my",
        "label": "Đam Mỹ"
    },
    {
        "id": "shounen-ai",
        "label": "Shounen Ai"
    },
    {
        "id": "soft-yuri",
        "label": "Soft Yuri"
    },
    {
        "id": "yuri",
        "label": "Yuri"
    },
    {
        "id": "gender-bender",
        "label": "Gender Bender"
    },
    {
        "id": "yaoi",
        "label": "Yaoi"
    },
    {
        "id": "psychological",
        "label": "Psychological"
    },
    {
        "id": "doujinshi",
        "label": "Doujinshi"
    },
    {
        "id": "soft-yaoi",
        "label": "Soft Yaoi"
    },
    {
        "id": "josei",
        "label": "Josei"
    },
    {
        "id": "thieu-nhi",
        "label": "Thiếu Nhi"
    },
    {
        "id": "truyen-scan",
        "label": "Truyện scan"
    },
    {
        "id": "cooking",
        "label": "Cooking"
    },
    {
        "id": "trinh-tham",
        "label": "Trinh Thám"
    },
    {
        "id": "live-action",
        "label": "Live action"
    },
    {
        "id": "tap-chi-truyen-tranh",
        "label": "Tạp chí truyện tranh"
    }
]

},{}]},{},[48])(48)
});

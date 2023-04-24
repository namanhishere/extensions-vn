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
exports.HentaiVN = exports.HentaiVNInfo = void 0;
const paperback_extensions_common_1 = require("paperback-extensions-common");
const tags_json_1 = __importDefault(require("./tags.json"));
const DOMAIN = 'https://hentaivn.run';
const userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1';
exports.HentaiVNInfo = {
    version: '1.2.1',
    name: 'HentaiVN',
    icon: 'icon.png',
    author: 'Hoang3409',
    authorWebsite: 'https://github.com/hoang3402',
    description: 'Extension that pulls manga from HentaiVN.',
    contentRating: paperback_extensions_common_1.ContentRating.ADULT,
    websiteBaseURL: DOMAIN,
    sourceTags: [
        {
            text: 'Hentai',
            type: paperback_extensions_common_1.TagType.RED,
        },
    ],
};
class HentaiVN extends paperback_extensions_common_1.Source {
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
        const Tags = await this.getSearchTags();
        const request = createRequestObject({
            url: `${DOMAIN}/${mangaId}-doc-truyen-.html`,
            method: 'GET',
        });
        const data = await this.requestManager.schedule(request, 1);
        let $ = this.cheerio.load(data.data);
        let tags = [];
        let title = $('div.page-info > h1 > a').text().trim();
        let img = $('div.page-ava > img').attr('src');
        for (const item of $('a.tag').toArray()) {
            const tag = Tags[0].tags.find((tag) => $(item).text() == tag.label);
            if (!tag)
                continue;
            tags.push(tag);
        }
        return createManga({
            id: mangaId,
            titles: [title],
            image: img,
            status: paperback_extensions_common_1.MangaStatus.ONGOING,
            hentai: true,
            tags: [
                createTagSection({
                    id: '0',
                    label: 'Thể loại',
                    tags: tags,
                }),
            ],
        });
    }
    async getChapters(mangaId) {
        const chapters = [];
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
            chapters.push(createChapter({
                id: idChap,
                mangaId: mangaId,
                name: $('h2', item).text(),
                chapNum: arr.length - arr.indexOf(item),
                langCode: paperback_extensions_common_1.LanguageCode.VIETNAMESE,
            }));
        }
        return chapters;
    }
    async getChapterDetails(mangaId, chapterId) {
        const listUrlImage = [];
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
    async getSearchResults(query, metadata) {
        const page = metadata?.page ?? 1;
        const request = createRequestObject({
            url: `${DOMAIN}/forum/search-plus.php`,
            param: `?name=${encodeURIComponent(query.title)}&dou=&char=&search=&page=${page}`,
            method: 'GET',
        });
        for (const item of query.includedTags) {
            request.param += `&tag[]=${item.id}`;
        }
        const data = await this.requestManager.schedule(request, 1);
        const $ = this.cheerio.load(data.data);
        const tiles = [];
        for (let item of $('li.search-li').toArray()) {
            tiles.push(createMangaTile({
                id: $('div.search-img > a', item)
                    .attr('href')
                    .split('-')[0]
                    .replace('/', ''),
                title: createIconText({
                    text: $('b', item).first().text(),
                }),
                image: $('img', item).attr('src'),
            }));
        }
        metadata = tiles.length === 0 ? undefined : { page: page + 1 };
        return createPagedResults({
            results: tiles,
            metadata: metadata,
        });
    }
    // Sections
    async getHomePageSections(sectionCallback) {
        let newAdded = createHomeSection({
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
    async parseNewUpdatedSection($) {
        const items = [];
        for (let item of $('ul.page-random').toArray()) {
            items.push(createMangaTile({
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
            }));
        }
        return items;
    }
    async getViewMoreItems(homepageSectionId, metadata) {
        const page = metadata?.page ?? 1;
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
        const tiles = [];
        for (let item of $('li.item > ul').toArray()) {
            tiles.push(createMangaTile({
                id: $('a', item)
                    .attr('href')
                    .split('-')[0]
                    .replace('/', ''),
                title: createIconText({ text: $('img', item).attr('alt') }),
                image: $('img', item).attr('src'),
            }));
        }
        metadata = tiles.length === 0 ? undefined : { page: page + 1 };
        return createPagedResults({
            results: tiles,
            metadata: metadata,
        });
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
    getCloudflareBypassRequest() {
        return createRequestObject({
            url: DOMAIN,
            method: 'GET',
        });
    }
}
exports.HentaiVN = HentaiVN;

},{"./tags.json":49,"paperback-extensions-common":5}],49:[function(require,module,exports){
module.exports=[
    {
        "id": "3",
        "label": "3D Hentai"
    },
    {
        "id": "5",
        "label": "Action"
    },
    {
        "id": "116",
        "label": "Adult"
    },
    {
        "id": "203",
        "label": "Adventure"
    },
    {
        "id": "20",
        "label": "Ahegao"
    },
    {
        "id": "21",
        "label": "Anal"
    },
    {
        "id": "249",
        "label": "Angel"
    },
    {
        "id": "131",
        "label": "Ảnh động"
    },
    {
        "id": "127",
        "label": "Animal"
    },
    {
        "id": "22",
        "label": "Animal girl"
    },
    {
        "id": "279",
        "label": "Áo Dài"
    },
    {
        "id": "277",
        "label": "Apron"
    },
    {
        "id": "115",
        "label": "Artist CG"
    },
    {
        "id": "130",
        "label": "Based Game"
    },
    {
        "id": "257",
        "label": "BBM"
    },
    {
        "id": "251",
        "label": "BBW"
    },
    {
        "id": "24",
        "label": "BDSM"
    },
    {
        "id": "25",
        "label": "Bestiality"
    },
    {
        "id": "133",
        "label": "Big Ass"
    },
    {
        "id": "23",
        "label": "Big Boobs"
    },
    {
        "id": "32",
        "label": "Big Penis"
    },
    {
        "id": "267",
        "label": "Blackmail"
    },
    {
        "id": "27",
        "label": "Bloomers"
    },
    {
        "id": "28",
        "label": "BlowJobs"
    },
    {
        "id": "29",
        "label": "Body Swap"
    },
    {
        "id": "30",
        "label": "Bodysuit"
    },
    {
        "id": "254",
        "label": "Bondage"
    },
    {
        "id": "33",
        "label": "Breast Sucking"
    },
    {
        "id": "248",
        "label": "BreastJobs"
    },
    {
        "id": "31",
        "label": "Brocon"
    },
    {
        "id": "242",
        "label": "Brother"
    },
    {
        "id": "241",
        "label": "Business Suit"
    },
    {
        "id": "39",
        "label": "Catgirls"
    },
    {
        "id": "101",
        "label": "Che ít"
    },
    {
        "id": "129",
        "label": "Che nhiều"
    },
    {
        "id": "34",
        "label": "Cheating"
    },
    {
        "id": "35",
        "label": "Chikan"
    },
    {
        "id": "271",
        "label": "Chinese Dress"
    },
    {
        "id": "100",
        "label": "Có che"
    },
    {
        "id": "36",
        "label": "Comedy"
    },
    {
        "id": "120",
        "label": "Comic"
    },
    {
        "id": "210",
        "label": "Condom"
    },
    {
        "id": "38",
        "label": "Cosplay"
    },
    {
        "id": "2",
        "label": "Cousin"
    },
    {
        "id": "275",
        "label": "Crotch Tattoo"
    },
    {
        "id": "269",
        "label": "Cunnilingus"
    },
    {
        "id": "40",
        "label": "Dark Skin"
    },
    {
        "id": "262",
        "label": "Daughter"
    },
    {
        "id": "268",
        "label": "Deepthroat"
    },
    {
        "id": "132",
        "label": "Demon"
    },
    {
        "id": "212",
        "label": "DemonGirl"
    },
    {
        "id": "104",
        "label": "Devil"
    },
    {
        "id": "105",
        "label": "DevilGirl"
    },
    {
        "id": "253",
        "label": "Dirty"
    },
    {
        "id": "41",
        "label": "Dirty Old Man"
    },
    {
        "id": "260",
        "label": "DogGirl"
    },
    {
        "id": "42",
        "label": "Double Penetration"
    },
    {
        "id": "44",
        "label": "Doujinshi"
    },
    {
        "id": "4",
        "label": "Drama"
    },
    {
        "id": "43",
        "label": "Drug"
    },
    {
        "id": "45",
        "label": "Ecchi"
    },
    {
        "id": "245",
        "label": "Elder Sister"
    },
    {
        "id": "125",
        "label": "Elf"
    },
    {
        "id": "46",
        "label": "Exhibitionism"
    },
    {
        "id": "123",
        "label": "Fantasy"
    },
    {
        "id": "243",
        "label": "Father"
    },
    {
        "id": "47",
        "label": "Femdom"
    },
    {
        "id": "48",
        "label": "Fingering"
    },
    {
        "id": "108",
        "label": "Footjob"
    },
    {
        "id": "259",
        "label": "Foxgirls"
    },
    {
        "id": "37",
        "label": "Full Color"
    },
    {
        "id": "202",
        "label": "Furry"
    },
    {
        "id": "50",
        "label": "Futanari"
    },
    {
        "id": "51",
        "label": "GangBang"
    },
    {
        "id": "206",
        "label": "Garter Belts"
    },
    {
        "id": "52",
        "label": "Gender Bender"
    },
    {
        "id": "106",
        "label": "Ghost"
    },
    {
        "id": "56",
        "label": "Glasses"
    },
    {
        "id": "264",
        "label": "Gothic Lolita"
    },
    {
        "id": "53",
        "label": "Group"
    },
    {
        "id": "55",
        "label": "Guro"
    },
    {
        "id": "247",
        "label": "Hairy"
    },
    {
        "id": "57",
        "label": "Handjob"
    },
    {
        "id": "58",
        "label": "Harem"
    },
    {
        "id": "102",
        "label": "HentaiVN"
    },
    {
        "id": "80",
        "label": "Historical"
    },
    {
        "id": "122",
        "label": "Horror"
    },
    {
        "id": "59",
        "label": "Housewife"
    },
    {
        "id": "60",
        "label": "Humiliation"
    },
    {
        "id": "61",
        "label": "Idol"
    },
    {
        "id": "244",
        "label": "Imouto"
    },
    {
        "id": "62",
        "label": "Incest"
    },
    {
        "id": "26",
        "label": "Insect (Côn Trùng)"
    },
    {
        "id": "280",
        "label": "Isekai"
    },
    {
        "id": "99",
        "label": "Không che"
    },
    {
        "id": "110",
        "label": "Kimono"
    },
    {
        "id": "265",
        "label": "Kuudere"
    },
    {
        "id": "63",
        "label": "Lolicon"
    },
    {
        "id": "64",
        "label": "Maids"
    },
    {
        "id": "273",
        "label": "Manhua"
    },
    {
        "id": "114",
        "label": "Manhwa"
    },
    {
        "id": "65",
        "label": "Masturbation"
    },
    {
        "id": "119",
        "label": "Mature"
    },
    {
        "id": "124",
        "label": "Miko"
    },
    {
        "id": "126",
        "label": "Milf"
    },
    {
        "id": "121",
        "label": "Mind Break"
    },
    {
        "id": "113",
        "label": "Mind Control"
    },
    {
        "id": "263",
        "label": "Mizugi"
    },
    {
        "id": "66",
        "label": "Monster"
    },
    {
        "id": "67",
        "label": "Monstergirl"
    },
    {
        "id": "103",
        "label": "Mother"
    },
    {
        "id": "205",
        "label": "Nakadashi"
    },
    {
        "id": "1",
        "label": "Netori"
    },
    {
        "id": "201",
        "label": "Non-hen"
    },
    {
        "id": "68",
        "label": "NTR"
    },
    {
        "id": "272",
        "label": "Nun"
    },
    {
        "id": "69",
        "label": "Nurse"
    },
    {
        "id": "211",
        "label": "Old Man"
    },
    {
        "id": "71",
        "label": "Oneshot"
    },
    {
        "id": "70",
        "label": "Oral"
    },
    {
        "id": "209",
        "label": "Osananajimi"
    },
    {
        "id": "72",
        "label": "Paizuri"
    },
    {
        "id": "204",
        "label": "Pantyhose"
    },
    {
        "id": "276",
        "label": "Ponytail"
    },
    {
        "id": "73",
        "label": "Pregnant"
    },
    {
        "id": "98",
        "label": "Rape"
    },
    {
        "id": "258",
        "label": "Rimjob"
    },
    {
        "id": "117",
        "label": "Romance"
    },
    {
        "id": "207",
        "label": "Ryona"
    },
    {
        "id": "134",
        "label": "Scat"
    },
    {
        "id": "74",
        "label": "School Uniform"
    },
    {
        "id": "75",
        "label": "SchoolGirl"
    },
    {
        "id": "87",
        "label": "Series"
    },
    {
        "id": "88",
        "label": "Sex Toys"
    },
    {
        "id": "246",
        "label": "Shimapan"
    },
    {
        "id": "118",
        "label": "Short Hentai"
    },
    {
        "id": "77",
        "label": "Shota"
    },
    {
        "id": "76",
        "label": "Shoujo"
    },
    {
        "id": "79",
        "label": "Siscon"
    },
    {
        "id": "78",
        "label": "Sister"
    },
    {
        "id": "82",
        "label": "Slave"
    },
    {
        "id": "213",
        "label": "Sleeping"
    },
    {
        "id": "84",
        "label": "Small Boobs"
    },
    {
        "id": "278",
        "label": "Son"
    },
    {
        "id": "83",
        "label": "Sports"
    },
    {
        "id": "81",
        "label": "Stockings"
    },
    {
        "id": "85",
        "label": "Supernatural"
    },
    {
        "id": "250",
        "label": "Sweating"
    },
    {
        "id": "86",
        "label": "Swimsuit"
    },
    {
        "id": "266",
        "label": "Tall Girl"
    },
    {
        "id": "91",
        "label": "Teacher"
    },
    {
        "id": "89",
        "label": "Tentacles"
    },
    {
        "id": "109",
        "label": "Time Stop"
    },
    {
        "id": "90",
        "label": "Tomboy"
    },
    {
        "id": "252",
        "label": "Tracksuit"
    },
    {
        "id": "256",
        "label": "Transformation"
    },
    {
        "id": "92",
        "label": "Trap"
    },
    {
        "id": "274",
        "label": "Truyện Việt"
    },
    {
        "id": "111",
        "label": "Tsundere"
    },
    {
        "id": "93",
        "label": "Twins"
    },
    {
        "id": "261",
        "label": "Twintails"
    },
    {
        "id": "107",
        "label": "Vampire"
    },
    {
        "id": "208",
        "label": "Vanilla"
    },
    {
        "id": "95",
        "label": "Virgin"
    },
    {
        "id": "270",
        "label": "Webtoon"
    },
    {
        "id": "94",
        "label": "X-ray"
    },
    {
        "id": "112",
        "label": "Yandere"
    },
    {
        "id": "96",
        "label": "Yaoi"
    },
    {
        "id": "97",
        "label": "Yuri"
    },
    {
        "id": "128",
        "label": "Zombie"
    }
]

},{}]},{},[48])(48)
});

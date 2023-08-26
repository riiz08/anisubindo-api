"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDetailAnime = exports.filteringAnime = exports.getLatestRelease = exports.getMostPopularToday = void 0;
var axios_1 = require("axios");
var cheerio_1 = require("cheerio");
var createSlug = function (text) {
    if (text != undefined) {
        return text
            .toString() // Mengonversi input ke string (jika bukan string)
            .toLowerCase() // Mengonversi ke huruf kecil
            .replace(/\s+/g, "-") // Mengganti spasi dengan tanda hubung
            .replace(/[^\w\-]+/g, "") // Menghapus karakter yang tidak valid
            .replace(/\-\-+/g, "-") // Mengganti beberapa tanda hubung dengan satu tanda hubung
            .replace(/^-+/, "") // Menghapus tanda hubung di awal
            .replace(/-+$/, ""); // Menghapus tanda hubung di akhir
    }
};
var filterSpan = function (parent, content) {
    var res = parent
        .find("span:contains(".concat(content, ")"))
        .text()
        .replace("".concat(content, " "), "");
    return res;
};
var getMostPopularToday = function () { return __awaiter(void 0, void 0, void 0, function () {
    var url, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = "https://oploverz.fit";
                return [4 /*yield*/, axios_1.default
                        .get(url)
                        .then(function (res) {
                        var html = res.data;
                        var $ = cheerio_1.default.load(html);
                        var index = [];
                        var lists = $("article.styleegg");
                        lists.each(function (i, element) {
                            var self = $(element);
                            var title = self.find(".eggtitle").text();
                            var type = self.find(".eggtype").text();
                            var episode = self.find(".eggepisode").text();
                            var image = self.find("img").attr("src");
                            var slug = createSlug(self.find("h2").text()) || "slug-not-found";
                            index.push({
                                title: title,
                                type: type,
                                episode: episode,
                                image: image,
                                slug: slug,
                            });
                        });
                        return index;
                    })
                        .catch(function (err) {
                        throw new Error(err.message);
                    })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
exports.getMostPopularToday = getMostPopularToday;
var getLatestRelease = function (page) { return __awaiter(void 0, void 0, void 0, function () {
    var url, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = "https://oploverz.fit";
                return [4 /*yield*/, axios_1.default.get(url + "/page/" + page).then(function (res) {
                        var html = res.data;
                        var $ = cheerio_1.default.load(html);
                        var index = [];
                        var lists = $("article.stylesix");
                        lists.each(function (i, element) {
                            var self = $(element);
                            var title = self.find("a").attr("title");
                            var type = self.find(".typez").text();
                            var episode = self.find(".epx").text();
                            var image = self.find("img").attr("src");
                            var slug = createSlug(title) || "slug-not-found";
                            var rating = self.find(".scr").text();
                            index.push({
                                title: title,
                                type: type,
                                episode: episode,
                                image: image,
                                slug: slug,
                                rating: rating,
                            });
                        });
                        return index;
                    })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
exports.getLatestRelease = getLatestRelease;
var filteringAnime = function (page, genre, season, studio, status, type, sub, order) { return __awaiter(void 0, void 0, void 0, function () {
    var baseUrl, queryParams, queryString, url, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                baseUrl = "https://oploverz.fit/anime/";
                queryParams = {
                    page: page,
                    genre: genre,
                    season: season,
                    studio: studio,
                    status: status,
                    type: type,
                    sub: sub,
                    order: order,
                };
                queryString = Object.entries(queryParams)
                    .map(function (_a) {
                    var key = _a[0], value = _a[1];
                    if (Array.isArray(value)) {
                        return value.map(function (val) { return "".concat(key, "%5B%5D=").concat(val); }).join("&");
                    }
                    return "".concat(key, "=").concat(value);
                })
                    .join("&");
                url = baseUrl + "?" + queryString;
                return [4 /*yield*/, axios_1.default.get(url).then(function (res) {
                        var html = res.data;
                        var $ = cheerio_1.default.load(html);
                        var index = [];
                        var lists = $("article.bs");
                        lists.each(function (i, element) {
                            var self = $(element);
                            var title = $(element).find("a").attr("title");
                            var type = $(element).find(".typez").text();
                            var episode = $(element).find(".epx").text();
                            var image = $(element).find("img").attr("src");
                            var slug = createSlug(title);
                            index.push({
                                title: title,
                                type: type,
                                episode: episode,
                                image: image,
                                slug: slug,
                            });
                        });
                        return index;
                    })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response];
        }
    });
}); };
exports.filteringAnime = filteringAnime;
var getDetailAnime = function (slug) { return __awaiter(void 0, void 0, void 0, function () {
    var url, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = "https://oploverz.fit/anime/";
                return [4 /*yield*/, axios_1.default
                        .get(url + slug)
                        .then(function (res) {
                        var html = res.data;
                        var $ = cheerio_1.default.load(html);
                        var title = $(".postbody").find("h1").text();
                        var image = $(".thumb").find("img").attr("src");
                        var parentElem = $(".postbody").find(".spe");
                        var status = filterSpan(parentElem, "Status:");
                        var studio = filterSpan(parentElem, "Studio:");
                        var duration = filterSpan(parentElem, "Durasi:");
                        var season = filterSpan(parentElem, "Season:");
                        var type = filterSpan(parentElem, "Tipe:");
                        var rating = $(".rating-prc").find("meta").attr("content");
                        var genresElement = $(".genxed");
                        var genresText = genresElement
                            .find("a")
                            .map(function (i, element) {
                            var self = $(element);
                            return self.text().trim();
                        })
                            .get();
                        var genres = genresText;
                        var listEp = $(".eplister").find("ul li");
                        var episode_lists = [];
                        listEp.each(function (i, element) {
                            var self = $(element);
                            var epTitle = self.find(".epl-title").text();
                            var epNumb = self.find(".epl-num").text();
                            var epDate = self.find(".epl-date").text();
                            var epSlug = createSlug(epTitle);
                            episode_lists.push({
                                ep_title: epTitle,
                                ep_numb: epNumb,
                                ep_date: epDate,
                                ep_slug: epSlug,
                            });
                        });
                        var index = [
                            {
                                title: title,
                                image: image,
                                status: status,
                                studio: studio,
                                duration: duration,
                                season: season,
                                type: type,
                                rating: rating,
                                genres: genres,
                                episode_lists: episode_lists,
                            },
                        ];
                        return index;
                    })
                        .catch(function (e) {
                        throw new Error(e.message);
                    })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
exports.getDetailAnime = getDetailAnime;

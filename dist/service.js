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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchAnime = exports.getStreamUrl = exports.getDetailAnime = exports.filteringAnime = exports.getLatestRelease = exports.getMostPopularToday = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const createSlug = (text) => {
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
const filterSpan = (parent, content) => {
    const res = parent
        .find(`span:contains(${content})`)
        .text()
        .replace(`${content} `, "");
    return res;
};
const getMostPopularToday = () => __awaiter(void 0, void 0, void 0, function* () {
    const url = "https://oploverz.fit";
    const result = yield axios_1.default
        .get(url)
        .then((res) => {
        const html = res.data;
        const $ = cheerio_1.default.load(html);
        let index = [];
        const lists = $("article.styleegg");
        lists.each(function (i, element) {
            const self = $(element);
            const title = self.find(".eggtitle").text();
            const type = self.find(".eggtype").text();
            const episode = self.find(".eggepisode").text();
            const image = self.find("img").attr("src");
            const slug = createSlug(self.find("h2").text());
            index.push({
                title,
                type,
                episode,
                image,
                slug,
            });
        });
        return index;
    })
        .catch((err) => {
        throw new Error(err.message);
    });
    return result;
});
exports.getMostPopularToday = getMostPopularToday;
const getLatestRelease = (page = "1") => __awaiter(void 0, void 0, void 0, function* () {
    const url = "https://oploverz.fit";
    const result = yield axios_1.default.get(url + "/page/" + page).then((res) => {
        const html = res.data;
        const $ = cheerio_1.default.load(html);
        let index = [];
        const lists = $("article.stylesix");
        lists.each(function (i, element) {
            const self = $(element);
            const title = self.find("a").attr("title");
            const type = self.find(".typez").text();
            const episode = self.find(".epx").text();
            const image = self.find("img").attr("src");
            const slug = createSlug(title);
            const rating = self.find(".scr").text();
            index.push({
                title,
                type,
                episode,
                image,
                slug,
                rating,
            });
        });
        return index;
    });
    return result;
});
exports.getLatestRelease = getLatestRelease;
const filteringAnime = (page, genre, season, studio, status, type, sub, order) => __awaiter(void 0, void 0, void 0, function* () {
    const baseUrl = "https://oploverz.fit/anime/";
    // Membuat objek untuk parameter query
    const queryParams = {
        page: page,
        genre: genre,
        season: season,
        studio: studio,
        status: status,
        type: type,
        sub: sub,
        order: order,
    };
    // Membentuk string query dari objek queryParams
    const queryString = Object.entries(queryParams)
        .map(([key, value]) => {
        if (Array.isArray(value)) {
            return value.map((val) => `${key}%5B%5D=${val}`).join("&");
        }
        return `${key}=${value}`;
    })
        .join("&");
    // Menggabungkan URL dengan query
    const url = baseUrl + "?" + queryString;
    const response = yield axios_1.default.get(url).then((res) => {
        const html = res.data;
        const $ = cheerio_1.default.load(html);
        let index = [];
        const lists = $("article.bs");
        lists.each(function (i, element) {
            const self = $(element);
            const title = $(element).find("a").attr("title");
            const type = $(element).find(".typez").text();
            const episode = $(element).find(".epx").text();
            const image = $(element).find("img").attr("src");
            const slug = createSlug(title);
            index.push({
                title,
                type,
                episode,
                image,
                slug,
            });
        });
        return index;
    });
    return response;
});
exports.filteringAnime = filteringAnime;
const getDetailAnime = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const url = "https://oploverz.fit/anime/";
    const result = yield axios_1.default
        .get(url + slug)
        .then((res) => {
        const html = res.data;
        const $ = cheerio_1.default.load(html);
        const title = $(".postbody").find("h1").text();
        const image = $(".thumb").find("img").attr("src");
        const parentElem = $(".postbody").find(".spe");
        const status = filterSpan(parentElem, "Status:");
        const studio = filterSpan(parentElem, "Studio:");
        const duration = filterSpan(parentElem, "Durasi:");
        const season = filterSpan(parentElem, "Season:");
        const type = filterSpan(parentElem, "Tipe:");
        const rating = $(".rating-prc").find("meta").attr("content");
        const genresElement = $(".genxed");
        const genresText = genresElement
            .find("a")
            .map(function (i, element) {
            const self = $(element);
            return self.text().trim();
        })
            .get();
        const genres = genresText;
        const listEp = $(".eplister").find("ul li");
        let episode_lists = [];
        listEp.each(function (i, element) {
            const self = $(element);
            const epTitle = self.find(".epl-title").text();
            const epNumb = self.find(".epl-num").text();
            const epDate = self.find(".epl-date").text();
            const epSlug = createSlug(epTitle);
            episode_lists.push({
                ep_title: epTitle,
                ep_numb: epNumb,
                ep_date: epDate,
                ep_slug: epSlug,
            });
        });
        const index = [
            {
                title,
                image,
                status,
                studio,
                duration,
                season,
                type,
                rating,
                genres,
                episode_lists,
            },
        ];
        return index;
    })
        .catch((e) => {
        throw new Error(e.message);
    });
    return result;
});
exports.getDetailAnime = getDetailAnime;
const getStreamUrl = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const url = "https://oploverz.fit/";
    const response = yield axios_1.default.get(url + slug).then((res) => {
        const html = res.data;
        const $ = cheerio_1.default.load(html);
        const thisParent = $(".postbody");
        const childrenParent = $(".single-info");
        const parentElem = $(".postbody").find(".spe");
        const episode_title = thisParent.find("h1").text();
        const stream_url = thisParent.find("iframe").attr("src");
        const title = childrenParent.find("h2").text();
        const status = filterSpan(parentElem, "Status:");
        const studio = filterSpan(parentElem, "Studio:");
        const duration = filterSpan(parentElem, "Durasi:");
        const season = filterSpan(parentElem, "Season:");
        const type = filterSpan(parentElem, "Tipe:");
        const genresElement = $(".genxed");
        const genresText = genresElement
            .find("a")
            .map(function (i, element) {
            const self = $(element);
            return self.text().trim();
        })
            .get();
        const genres = genresText;
        const desc = childrenParent.find(".mindes").text().replace(/\t|\n/g, "");
        const index = [
            {
                episode_title,
                stream_url,
                title,
                status,
                studio,
                duration,
                season,
                type,
                genres,
                desc,
            },
        ];
        return index;
    });
    return response;
});
exports.getStreamUrl = getStreamUrl;
const searchAnime = (search) => __awaiter(void 0, void 0, void 0, function* () {
    const url = "https://oploverz.fit";
    const response = yield axios_1.default.get(url + "/?s=" + search).then((res) => {
        const html = res.data;
        const $ = cheerio_1.default.load(html);
        let index = [];
        const list = $("article.bs");
        list.each(function (i, elem) {
            const self = $(elem);
            const title = self.find("a").attr("title");
            const type = self.find(".typez").text();
            const episode = self.find(".epx").text();
            const image = self.find("img").attr("src");
            const slug = createSlug(title);
            index.push({
                title,
                type,
                episode,
                image,
                slug
            });
        });
        return index;
    });
    return response;
});
exports.searchAnime = searchAnime;

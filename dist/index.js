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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const service_1 = require("./service");
const app = (0, express_1.default)();
const port = 5000;
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    res.send("Server is running 🏃");
});
app.get("/popular-today", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, service_1.getMostPopularToday)();
        res.json(data);
    }
    catch (e) {
        res.send(e.message);
    }
}));
app.get("/latest-release", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = Number(req.query.page) || 1;
    try {
        const data = yield (0, service_1.getLatestRelease)(page);
        res.json(data);
    }
    catch (e) {
        res.send(e.message);
    }
}));
app.get("/anime/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, genre, season, studio, status, type, sub, order } = req.query;
    try {
        const data = yield (0, service_1.filteringAnime)(page, genre, season, studio, status, type, sub, order);
        res.json(data);
    }
    catch (err) {
        res.send(err.message);
    }
}));
app.get("/detail/:slug", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    const data = yield (0, service_1.getDetailAnime)(slug);
    res.json(data);
}));
app.get("/watch/:slug", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { slug } = req.params;
        const data = yield (0, service_1.getStreamUrl)(slug);
        return res.json(data);
    }
    catch (e) {
        res.send(e.message);
    }
}));
app.get("/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query } = req.query;
        const data = yield (0, service_1.searchAnime)(query);
        res.json({
            search: query,
            data,
        });
    }
    catch (e) {
        throw new Error(e.message);
    }
}));
app.listen(port, () => console.log(`app running in port : ${port}`));

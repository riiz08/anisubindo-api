import express from "express";
import cors from "cors";
import {
  getMostPopularToday,
  getLatestRelease,
  filteringAnime,
  getDetailAnime,
  getStreamUrl,
  searchAnime,
} from "./service";

const app = express();
const port = 5000;
axios.defaults.validateStatus = () => true;
axios.defaults.headers.common["User-Agent"] =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36 Edg/108.0.1462.54";

app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is running 🏃");
});

app.get("/popular-today", async (req, res) => {
  try {
    const data = await getMostPopularToday();
    res.json(data);
  } catch (e: any) {
    res.send(e.message);
  }
});

app.get("/latest-release", async (req, res) => {
  const page: number = Number(req.query.page);
  try {
    const data = await getLatestRelease(page);
    res.json(data);
  } catch (e: any) {
    res.send(e.message);
  }
});

app.get("/anime/", async (req, res) => {
  const { page, genre, season, studio, status, type, sub, order } = req.query;

  try {
    const data = await filteringAnime(
      page,
      genre,
      season,
      studio,
      status,
      type,
      sub,
      order
    );

    res.json(data);
  } catch (err: any) {
    res.send(err.message);
  }
});

app.get("/detail/:slug", async (req, res) => {
  const { slug } = req.params;
  const data = await getDetailAnime(slug);
  res.json(data);
});

app.get("/watch/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const data = await getStreamUrl(slug);
    return res.json(data);
  } catch (e: any) {
    res.send(e.message);
  }
});

app.get("/search", async (req, res) => {
  try {
    const { query } = await req.query;
    const data = await searchAnime(query);

    res.json({
     
      search: query,
      data,
    });
  } catch (e: any) {
    throw new Error(e.message);
  }
});

app.listen(port, () => console.log(`app running in port : ${port}`));

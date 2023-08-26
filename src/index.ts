import express from "express";
import cors from "cors";
import {
  getMostPopularToday,
  getLatestRelease,
  filteringAnime,
  getDetailAnime,
} from "./service";

const app = express();
const port = 5000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("hello world");
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
  const page: number = Number(req.query.page) || 1;
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

app.listen(port, () => console.log(`app running in port : ${port}`));

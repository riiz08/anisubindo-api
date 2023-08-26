import axios from "axios";
import cheerio from "cheerio";

interface Item {
  title: string | undefined;
  type: string;
  episode: string;
  image: string | undefined;
  slug: string | undefined;
  rating?: string | number;
}

const createSlug = (text: string | undefined) => {
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

const filterSpan = (parent: any, content: string) => {
  const res = parent
    .find(`span:contains(${content})`)
    .text()
    .replace(`${content} `, "");
  return res;
};

export const getMostPopularToday = async () => {
  const url: string = "https://oploverz.fit";
  const result = await axios
    .get(url)
    .then((res) => {
      const html = res.data;
      const $ = cheerio.load(html);

      let index: Item[] = [];

      const lists = $("article.styleegg");

      lists.each(function (i, element) {
        const self: cheerio.Cheerio = $(element);
        const title: string = self.find(".eggtitle").text();
        const type: string = self.find(".eggtype").text();
        const episode: string = self.find(".eggepisode").text();
        const image: string | undefined = self.find("img").attr("src");
        const slug = createSlug(self.find("h2").text()) || "slug-not-found";

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
};

export const getLatestRelease = async (page: string | number) => {
  const url: string = "https://oploverz.fit";

  const result = await axios.get(url + "/page/" + page).then((res) => {
    const html = res.data;
    const $ = cheerio.load(html);
    let index: Item[] = [];

    const lists = $("article.stylesix");

    lists.each(function (i, element) {
      const self: cheerio.Cheerio = $(element);

      const title: string | undefined = self.find("a").attr("title");
      const type: string = self.find(".typez").text();
      const episode: string = self.find(".epx").text();
      const image: string | undefined = self.find("img").attr("src");
      const slug = createSlug(title) || "slug-not-found";
      const rating: string | number = self.find(".scr").text();

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
};

export const filteringAnime = async (
  page: any | 1,
  genre: any,
  season: any,
  studio: any,
  status: any,
  type: any,
  sub: any,
  order: any
) => {
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

  const response = await axios.get(url).then((res) => {
    const html = res.data;
    const $ = cheerio.load(html);
    let index: Item[] = [];

    const lists = $("article.bs");

    lists.each(function (i, element) {
      const self: cheerio.Cheerio = $(element);

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
};

export const getDetailAnime = async (slug: any) => {
  const url = "https://oploverz.fit/anime/";
  const result = await axios
    .get(url + slug)
    .then((res) => {
      const html = res.data;
      const $ = cheerio.load(html);

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
      let episode_lists: any = [];
      listEp.each(function (i, element) {
        const self = $(element)
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
};

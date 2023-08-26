# Anisubindo-API

<p align="center">
  <a href="https://github.com/riiz08">
    <img
    src="https://firebasestorage.googleapis.com/v0/b/personal-portofolio-835a4.appspot.com/o/ssstik.io_1691302918799.jpeg?alt=media&token=1ecc066c-c548-40f7-84dd-b384d803e918"
    alt="Logo" width="150" >
  </a>

  <h3 align="center">Anisubindo Rest-API</h3>

  <p align="center">
    <samp>A free anime app restful API serving anime from <a
    href="https://oploverz.fit">OPLOVERZ</a></samp>
    <br />
    <a href="#routes"><strong>Explore the api »</strong></a>
    <br />
    <br />
    Contact me on <a href="https://instagram.com/riizasrski">Instagram</a> if you
    find a bug or want to add a feature
  </p>
</p>

## Project Using This Anisubindo API

See Project Overview : <a
href="">Anisubindo.id (on progress)</a>

## Installation

Run the following command to clone the repository, and install the dependencies:

```sh
git clone https://github.com/riiz08/anisubindo-api.git
cd anisubindo-api
npm install #or yarn install
```

### Run Rest-Server with Development Mode

```sh
npm run dev
```

Now the Anisubindo Rest API is running on http://localhost:5000

## Routes

Below you'll find examples using [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) but you can use any other http library out there. <br/>
Endpoint `https://localhost:5000/`

### Get Most Popular Today

```js
fetch("https://localhost:5000/popular-today")
  .then((response) => response.json())
  .then((result) => console.log(result));
```

Output >>

```json

{
    "status": "success",
    "statusCode": 200,
    "data": [
	{
		"title": "One Piece",
		"type": "TV",
		"episode": "Episode 1073",
		"image": "https://oploverz.fit/wp-content/uploads/2023/06/135253l.jpg",
		"slug": "one-piece-episode-1073-subtitle-indonesia"
	},
	{...},
	]
	}
```

### Get Latest Release

| Parameter       | Description     |
| --------------- | --------------- |
| `default-page`  | 1               |
| `page` (string) | anime with page |

```js
fetch("https://localhost:5000/latest-release?page={page}")
  .then((response) => response.json())
  .then((result) => console.log(result));
```

Output >>

```json
{
    "status": "success",
    "statusCode": 200,
    "data": [
	{
		"title": "Rurouni Kenshin 2023 Episode 08 Subtitle Indonesia",
		"type": "TV",
		"episode": "Ep 08",
		"image": "https://oploverz.fit/wp-content/uploads/2023/07/1-1.jpg",
		"slug": "rurouni-kenshin-2023-episode-08-subtitle-indonesia",
		"rating": "7.91"
	},
	{...},
	]
}
```

### Get Detail Anime

| Parameter | Description |
| --------- | ----------- |
| `slug`    | required    |

```js
fetch("https://localhost:5000/detail/:slug")
  .then((response) => response.json())
  .then((result) => console.log(result));
```

Output >>

```json
{
  "status": "success",
  "statusCode": 200,
  "data": [
    {
      "title": "Jujutsu Kaisen S2",
      "image": "https://i3.wp.com/oploverz.fit/wp-content/uploads/2023/06/1687337587-2811-134703.jpg?resize=247,350",
      "status": "Ongoing",
      "studio": "MAPPA",
      "duration": "24 min. per ep.",
      "season": "Summer 2023",
      "type": "TV",
      "rating": "8.67",
      "genres": ["Action", "Fantasy", "School", "Shounen"],
      "episode_lists": [
        {
          "ep_title": "Jujutsu Kaisen S2 Episode 05 Subtitle Indonesia",
          "ep_numb": "05",
          "ep_date": "August 4, 2023",
          "ep_slug": "jujutsu-kaisen-s2-episode-05-subtitle-indonesia"
        },
        {
          "ep_title": "Jujutsu Kaisen S2 Episode 04 Subtitle Indonesia",
          "ep_numb": "04",
          "ep_date": "July 27, 2023",
          "ep_slug": "jujutsu-kaisen-s2-episode-04-subtitle-indonesia"
        },
        {
          "ep_title": "Jujutsu Kaisen S2 Episode 03 Subtitle Indonesia",
          "ep_numb": "03",
          "ep_date": "July 20, 2023",
          "ep_slug": "jujutsu-kaisen-s2-episode-03-subtitle-indonesia"
        },
        {
          "ep_title": "Jujutsu Kaisen S2 Episode 02 Subtitle Indonesia",
          "ep_numb": "02",
          "ep_date": "July 13, 2023",
          "ep_slug": "jujutsu-kaisen-s2-episode-02-subtitle-indonesia"
        },
        {
          "ep_title": "Jujutsu Kaisen S2 Episode 01 Subtitle Indonesia",
          "ep_numb": "01",
          "ep_date": "July 5, 2023",
          "ep_slug": "jujutsu-kaisen-s2-episode-01-subtitle-indonesia"
        }
      ]
    }
  ]
}
```

### Filtering Anime

| Parameter | Description          |
| --------- | -------------------- |
| `genre`   | optional             |
| `season`  | optional             |
| `studio`  | optional             |
| `status`  | optional             |
| `type`    | optional             |
| `sub`     | optional             |
| `order`   | optional             |
| `page`    | default 1 (optional) |

```js
fetch(
  "http://localhost:5000/anime/?genre={genre}&season={season}&studio={studio}&status={status}&type={type}&sub={sub}&order={order}&page={page}"
)
  .then((response) => response.json())
  .then((animelist) => console.log(animelist));
```

Output >>

```json
[
    "status": "success",
    "statusCode": 200,
    "data": [
	{
		"title": "Rurouni Kenshin -Meiji Kenkaku Romantan- (2023)",
		"type": "TV",
		"episode": "Ongoing",
		"image": "https://oploverz.fit/wp-content/uploads/2023/07/1-1.jpg",
		"slug": "rurouni-kenshin-meiji-kenkaku-romantan-2023"
	},
	{...}
	]
 ]
```

### Get Stream URL

| Parameter | Description |
| --------- | ----------- |
| `slug`    | required    |

```js
fetch("https://localhost:5000/watch/:slug")
  .then((response) => response.json())
  .then((result) => console.log(result));
```

Output >>

```json
{
  "status": "success",
  "statusCode": 200,
  "data": [
	{
		"episode_title": "Rurouni Kenshin 2023 Episode 08 Subtitle Indonesia",
		"stream_url": "https://www.blogger.com/video.g?token=AD6v5dzPFvOJkrOWYVxxUtBqvywIXeGv2_gzltpfQOk-6BhxdcqCFyzDqGa-u61QPiMWf5zBExuOYZ3BJ-qI8eXRF3HXTSdTlDqBm0TuUOhZ30c1R668-SH3Xl_MxZf4bATqZzS9PLg",
		"title": "Rurouni Kenshin -Meiji Kenkaku Romantan- (2023) Subtittle Indonesia",
		"status": "Ongoing",
		"studio": "LIDENFILMS",
		"duration": "23 min. per ep.",
		"season": "Summer 2023",
		"type": "TV",
		"genres": [
			"Action",
			"Historical",
			"Martial Arts",
			"Romance",
			"Shounen"
		],
		"desc": ...
		},
    ]
}
```

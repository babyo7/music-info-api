const express = require("express");
const router = express.Router();
const GetPlaylist = require("ytpl");
const Random = require("../models/random");
const Search = require("../models/search");

const de = {
  id: 0,
  title: "The Chainsmokers - Closer (Lyrics) ft. Halsey",
  artist: "7clouds",
  audio: "https://www.youtube.com/watch?v=25ROFXjoaAU",
  cover:
    "https://i.ytimg.com/vi/25ROFXjoaAU/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAhp5QxOR_Z3E8qsA2CaOaPOQmGng",
};

router.get("/", async (req, res) => {
  if (req.query.url) {
    try {
      const randomCover = Random(73);
      const music = await GetPlaylist(req.query.url, { pages: Infinity });
      const musicList = music.items.map((music, i) => ({
        id: i,
        title: music.title,
        artist: music.author.name,
        audio: music.shortUrl,
        cover:
          "https://your-napster.vercel.app" +
          "/Cover/" +
          randomCover() +
          ".webp",
      }));
      res.json(musicList);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.json({ message: "no url Provided" });
  }
});

router.get("/:s?", async (req, res) => {
  try {
    const query = req.params.s;
    res.json(await Search(query));
  } catch (error) {
    if (error.message == "Cannot read properties of null (reading 'split')") {
      res.status(200).json([de]);
      return;
    }
    res.status(500).json({ message: error.message });
  }
});

router.get("/is/p/:l?", async (req, res) => {
  try {
    const p = await GetPlaylist.getPlaylistID(req.query.l);
    console.log(p);
    res.status(200).json(p);
  } catch (error) {
    res.status(500).send("Error Sending Message");
  }
});

module.exports = router;

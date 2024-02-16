const Axios = require("axios");
const express = require("express");
const router = express.Router();
const GetPlaylist = require("ytpl");
const Random = require('../models/random')
const Search = require("../models/search")

router.get("/", async (req, res) => {
  if (req.query.url) {
    try {
      const randomCover = Random(73);
      const music = await GetPlaylist(req.query.url,{pages:Infinity});
      const musicList = music.items.map((music, i) => ({
            id: i,
            title: music.title,
            artist: music.author.name,
            audio: music.shortUrl,
            cover:  "https://your-napster.vercel.app" +
          "/Cover/" +
          randomCover() +
          ".webp",
      }))
      res.json(musicList);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.json({ "message": "no url Provided"});
  }
});

router.get("/:s?", async (req, res) => {
  try {
    const query =  req.params.s
    res.json( await Search(query))
  } catch (error) {
    res.status(500).json({message:error.message})
  }
})


router.post("/message", async (req, res) => {
  try {
    const url = `https://api.telegram.org/bot6296316080:AAFc7DoB9b2kOivNMRRK3kg-_WUW2cIatC4/sendMessage?chat_id=5356614395&text=${encodeURIComponent(
    req.body.message
    )}`;
    await Axios.post(url);
    res.status(200).send("Message sent successfully");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Error Sending Message");
  }
});



module.exports = router;

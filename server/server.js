require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');
const axios = require('axios');
//const querystring = require("node:querystring");

const lyricsFinder = require('lyrics-finder');
// const Musixmatch = require("musixmatch-node");
// const mxm = new Musixmatch(process.env.MUSIXMATCH_API_KEY);

// const music = require("musicmatch")({ apikey: process.env.MUSIXMATCH_API_KEY });

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/refresh', (req, res) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken,
  });
  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

app.post('/login', (req, res) => {
 
  const code = req.body.code;
  console.log('CODE', code)
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      console.log('THIS IS DATA', data);
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      console.log('The error for app.post LOGIN: ', err);
      res.sendStatus(400);
    });
});

app.get('/lyrics', async (req, res) => {
  const lyrics =
    (await lyricsFinder(req.query.artist, req.query.track)) ||
    'No Lyrics found';
  res.json({ lyrics });
});

// app.get("/lyrics", async (req, res) => {
//   const lyrics =
//     (await mxm.getLyricsMatcher({
//       q_track: req.query.track,
//       q_artist: req.query.artist,
//     })) || "No lyrics found";
//   console.log("lYRICS: ", lyrics.message.body.lyrics.lyrics_body);
//   res.json(lyrics.message.body.lyrics);
// });

// app.get("/lyrics", async (req, res) => {
//   const track_Id = await music
//     .trackSearch({
//       q_track: req.query.track,
//       q_artist: req.query.artist,
//       page: 1,
//       page_size: 3,
//     })
//     .then(function (data) {
//       return data.message.body.track_list[0].track.track_id;
//     });
//   const lyrics = await music
//     .trackLyrics({
//       track_id: track_Id,
//     })
//     .then(function (data) {
//       console.log("lyricsBody", data.message.body.lyrics);
//       res.json(data.message.body.lyrics);
//     });
// });

// app.get("/category", async (req, res) => {
//   const accessToken = req.body.accessToken;
//   axios("https://api.spotify.com/v1/browse/categories?limit=50", {
//     method: "GET",
//     headers: {
//       Authorization: "Bearer " + accessToken,
//     },
//   }).then((categoryResponse) => {
//     res.json(categoryResponse.data.categories.items);
//   });
// });

app.listen(3001);
console.log('server is on')

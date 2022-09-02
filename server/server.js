require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const SpotifyWebApi = require("spotify-web-api-node");
const axios = require("axios");

const lyricsFinder = require("lyrics-finder");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REACT_APP_REDIRECT_URI,
    clientId: process.env.REACT_APP_CLIENT_ID,
    clientSecret: process.env.REACT_APP_CLIENT_SECRET,
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

app.post("/login", (req, res) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REACT_APP_REDIRECT_URI,
    clientId: process.env.REACT_APP_CLIENT_ID,
    clientSecret: process.env.REACT_APP_CLIENT_SECRET,
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      console.log("The error for app.post LOGIN: ", err);
      res.sendStatus(400);
    });
});

app.get("/lyrics", async (req, res) => {
  const lyrics =
    (await lyricsFinder(req.query.artist, req.query.track)) ||
    "No Lyrics found";
  res.json({ lyrics });
});

app.get("/category", async (req, res) => {
  try {
    const categoryResponse = await axios.get(
      "https://api.spotify.com/v1/browse/categories?limit=50",
      { headers: { Authorization: req.headers.authorization } }
    );
    res.json(categoryResponse.data.categories.items);
  } catch (err) {
    console.log(err);
  }
});

app.get("/category/:categoryId", async (req, res) => {
  try {
    const singleCategoryResponse = await axios.get(
      `https://api.spotify.com/v1/browse/categories/${req.params.categoryId}/playlists`,
      { headers: { Authorization: req.headers.authorization } }
    );
    res.json(singleCategoryResponse.data.playlists.items);
  } catch (err) {
    console.log(err);
  }
});

app.get("/playlists/:playlistId", async (req, res) => {
  try {
    const singlePlaylistResponse = await axios.get(
      `https://api.spotify.com/v1/playlists/${req.params.playlistId}`,
      { headers: { Authorization: req.headers.authorization } }
    );
    res.json(singlePlaylistResponse.data.tracks.items);
  } catch (err) {
    console.log(err);
  }
});

app.get("/track/:trackId", async (req, res) => {
  try {
    const singleTrackResponse = await axios.get(
      `https://api.spotify.com/v1/tracks/${req.params.trackId}`,
      { headers: { Authorization: req.headers.authorization } }
    );
    res.json(singleTrackResponse.data);
  } catch (err) {
    console.log(err);
  }
});

app.listen(3001);
console.log("server is on");

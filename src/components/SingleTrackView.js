import React, { useState, useEffect } from "react";
import useAuth from "./useAuth";
//import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";
import { Link } from "react-router-dom";

export default function SingleTrackView({ code }) {
  const accessToken = useAuth(code);
  const trackId = window.location.pathname.split("/").slice(-1)[0];
  const [track, setTrack] = useState({});
  const [lyrics, setLyrics] = useState("");
  //console.log(track);

  useEffect(() => {
    axios(`	https://api.spotify.com/v1/tracks/${trackId}`, {
      method: "GET",
      //headers: { Authorization: "Bearer " + accessToken },
      headers: {
        Authorization:
          "Bearer " +
          "BQDXSikk0lFXrnxikZrL_WVnqTVrJCZiYn9zsQSKvJb7d-InJJW61tIqeUZetEV9CYMkONjnN_1Ws5kgJWPJdGcCVtz3u9wASWJ2FdWVH0rrPvuW2X_5KeNrCdoEHCGyr5w3C-1s-fALmU6WQ2QfPi_0DdgIwS5FAzdKrmLIek_LlaWlYtjKgj7kOTwezrCGj9LDHfw",
      },
    }).then((trackResponse) => {
      setTrack(trackResponse.data);
    });
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/lyrics", {
        params: {
          track: track.name,
          artist: track.artists[0].name,
        },
      })
      .then((res) => {
        setLyrics(res.data.lyrics);
      });
  }, [track]);

  return (
    <div>
      <h1>{track.name}</h1>
      <h2>By: {track.artists[0].name}</h2>

      <img src={track.album.images[2].url} alt="album" />

      <div className="text-center" style={{ whiteSpace: "pre" }}>
        Lyrics: {lyrics}
      </div>
    </div>
  );
}

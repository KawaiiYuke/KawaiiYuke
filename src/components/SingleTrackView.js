import React, { useState, useEffect } from "react";
import useAuth from "./useAuth";
//import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

function SingleTrackView(props) {
  const accessToken = props?.accessToken;
  const trackId = window.location.pathname.split("/").slice(-1)[0];
  const [track, setTrack] = useState("");
  const [lyrics, setLyrics] = useState("");

  useEffect(() => {
    const fetchTrack = async () => {
      await axios(`	https://api.spotify.com/v1/tracks/${trackId}`, {
        method: "GET",
        headers: { Authorization: "Bearer " + accessToken },
      }).then((trackResponse) => {
        setTrack(trackResponse.data);
      });
    };
    fetchTrack();
  }, [trackId, accessToken]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/lyrics", {
        params: {
          track: track.name,
          //artist: track.artists[0].name,
        },
      })
      .then((res) => {
        setLyrics(res.data.lyrics);
      });
  }, [track]);

  return (
    <div>
      {track && (
        <div>
          <h1>{track.name}</h1>
          {/* <h2>By: {track.artists[0].name}</h2>

          <img src={track.album.images[2].url} alt="album" />

          <div className="text-center" style={{ whiteSpace: "pre" }}>
            Lyrics: {lyrics}
          </div> */}
        </div>
      )}
    </div>
  );
}

const mapState = (state) => {
  return state;
};

export default connect(mapState)(SingleTrackView);

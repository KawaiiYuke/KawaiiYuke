import React, { useState, useEffect } from 'react';
import useAuth from './useAuth';
//import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from 'spotify-web-api-node';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function SingleTrackView({ code }) {
  const accessToken = useAuth(code);
  const trackId = window.location.pathname.split('/').slice(-1)[0];
  const [track, setTrack] = useState('');
  const [lyrics, setLyrics] = useState('');

  useEffect(() => {
    const fetchTrack = async () => {
      await axios(`	https://api.spotify.com/v1/tracks/${trackId}`, {
        method: 'GET',
        //headers: { Authorization: "Bearer " + accessToken },
        headers: {
          Authorization:
            'Bearer ' +
            'BQDygyZDcyIWDiL_VOthX9vEbu6BzpR32i1bQFIsgRpqRlD_7U3U2TNzM2nM4A9jNHFATAKAWw9xmoSfCsS2LjZeOTTIXdJepD09YGebQ93jotT-TFjLkz0ERV8Jnq--w5dFyDOulun25E_ZXZA7HJWNcKxqZMvcLpchHKrO_WOdguB-A4QnYMQ33cDLWmWa7xhquRA',
        },
      }).then((trackResponse) => {
        setTrack(trackResponse.data);
      });
    };
    fetchTrack();
  }, [trackId]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/lyrics', {
        params: {
          track: track.name,
          // artist: track.artists[0].name,
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
          <h2>By: {track.artists[0].name}</h2>

          <img src={track.album.images[2].url} alt="album" />

          <div className="text-center" style={{ whiteSpace: 'pre' }}>
            Lyrics: {lyrics}
          </div>
        </div>
      )}
    </div>
  );
}

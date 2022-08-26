import React, { useState, useEffect } from "react";
import useAuth from "./useAuth";
//import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";
import { Link } from "react-router-dom";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
});

export default function SinglePlaylistView({ code }) {
  const accessToken = useAuth(code);
  const playlistId = window.location.pathname.split("/").slice(-1)[0];
  const [playlist, setPlaylist] = useState([]);
  const [tracks, setTracks] = useState([]);
  useEffect(() => {
    axios(`https://api.spotify.com/v1/playlists/${playlistId}`, {
      method: "GET",
      //headers: { Authorization: "Bearer " + accessToken },
      headers: {
        Authorization:
          "Bearer " +
          "BQDygyZDcyIWDiL_VOthX9vEbu6BzpR32i1bQFIsgRpqRlD_7U3U2TNzM2nM4A9jNHFATAKAWw9xmoSfCsS2LjZeOTTIXdJepD09YGebQ93jotT-TFjLkz0ERV8Jnq--w5dFyDOulun25E_ZXZA7HJWNcKxqZMvcLpchHKrO_WOdguB-A4QnYMQ33cDLWmWa7xhquRA",
      },
    }).then((playlistResponse) => {
      setPlaylist(playlistResponse.data);
    });
  });

  useEffect(() => {
    axios(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: "GET",
      //headers: { Authorization: "Bearer " + accessToken },
      headers: {
        Authorization:
          "Bearer " +
          "BQDygyZDcyIWDiL_VOthX9vEbu6BzpR32i1bQFIsgRpqRlD_7U3U2TNzM2nM4A9jNHFATAKAWw9xmoSfCsS2LjZeOTTIXdJepD09YGebQ93jotT-TFjLkz0ERV8Jnq--w5dFyDOulun25E_ZXZA7HJWNcKxqZMvcLpchHKrO_WOdguB-A4QnYMQ33cDLWmWa7xhquRA",
      },
    }).then((tracksResponse) => {
      setTracks(tracksResponse.data.items);
    });
  });

  return (
    <div>
      <h1>Playlist: {playlist.name}</h1>
      {/* <img src={playlist.images[0].url} alt="album" /> */}

      <div>
        <table>
          <thead>
            <tr>
              <th>Number</th>
              <th>Track</th>
              <th>Artist</th>
              <th>Album</th>
              <th>Option</th>
            </tr>
          </thead>
          <tbody>
            {tracks.map((track, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>

                  <Link to={`/track/${track.track.id}`}>
                    <td>
                      <img src={track.track.album.images[2].url} alt="album" />
                      {track.track.name}
                    </td>
                  </Link>
                  <td>{track.track.artists[0].name}</td>
                  <td>{track.track.album.name}</td>
                  <td>+ play</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
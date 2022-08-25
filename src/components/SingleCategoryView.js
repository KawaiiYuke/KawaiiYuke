import React, { useState, useEffect } from "react";
import useAuth from "./useAuth";
//import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";
import { Link } from "react-router-dom";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
});

export default function SingleCategoryView({ code }) {
  const accessToken = useAuth(code);
  const [playlists, setPlaylists] = useState([]);
  const categoryId = window.location.pathname.split("/").slice(-1)[0];
  const [singlePlaylist, setSinglePlaylist] = useState([]);

  useEffect(() => {
    axios(
      `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists`,
      {
        method: "GET",
        //headers: { Authorization: "Bearer " + accessToken },
        headers: {
          Authorization:
            "Bearer " +
            "BQDygyZDcyIWDiL_VOthX9vEbu6BzpR32i1bQFIsgRpqRlD_7U3U2TNzM2nM4A9jNHFATAKAWw9xmoSfCsS2LjZeOTTIXdJepD09YGebQ93jotT-TFjLkz0ERV8Jnq--w5dFyDOulun25E_ZXZA7HJWNcKxqZMvcLpchHKrO_WOdguB-A4QnYMQ33cDLWmWa7xhquRA",
        },
      }
    ).then((playlistsResponse) => {
      setPlaylists(playlistsResponse.data.playlists.items);
    });
  });
  return (
    <div>
      single category page
      {playlists.map((playlist) => {
        return (
          <div key={playlist.id} onClick={() => setSinglePlaylist(playlist.id)}>
            <Link to={`/playlists/${playlist.id}`}>
              <img src={playlist.images[0].url} alt="cover" />
              <h2>{playlist.name}</h2>
            </Link>
          </div>
        );
      })}
      <Link to="/explore">
        <button> Return to All Categories</button>
      </Link>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import useAuth from "./useAuth";
//import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
});

function SingleCategoryView() {
  const logInState = useSelector((state) => state.logIn);
  const accessToken = logInState?.accessToken;
  const [playlists, setPlaylists] = useState([]);
  const categoryId = window.location.pathname.split("/").slice(-1)[0];
  const [singlePlaylist, setSinglePlaylist] = useState([]);

  useEffect(() => {
    axios(
      `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + accessToken },
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

export default SingleCategoryView;

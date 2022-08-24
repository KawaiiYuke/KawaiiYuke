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

  useEffect(() => {
    axios(
      `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists`,
      {
        method: "GET",
        //headers: { Authorization: "Bearer " + accessToken },
        headers: {
          Authorization:
            "Bearer " +
            "BQDZ63m-EZeiFfSnRrdk_rXeRoM_d8K3ddAw0ZjsP7iZqykNDMD9CLguLIe5FBSRe8TGvpiBZGqZlHXzhvoqpSO7JHjT6z8C2t5FEOIrAY1uviEK517Bd9rWTqDISQqXpKpn1tOAwiNCPGSyEtQLshJfIGCsl-JH7SxcUQxCY_K6CryQrua0Jo_wcjtvU6gnXN5aSuk",
        },
      }
    ).then((playlistsResponse) => {
      console.log("playlistsResponse: ", playlistsResponse);
      setPlaylists(playlistsResponse.data.playlists.items);
    });
  });
  return (
    <div>
      single category page
      {playlists.map((playlist) => {
        return (
          <div key={playlist.id}>
            <img src={playlist.images[0].url} alt="cover" />
            <h2>{playlist.name}</h2>
          </div>
        );
      })}
      <Link to="/explore">
        <button> Return to All Categories</button>
      </Link>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import useAuth from "./useAuth";
//import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./css/SingleCategoryViewButton.css";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
});

function SingleCategoryView(props) {
  const accessToken = props?.accessToken;
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
      <Link to="/explore" style={{ textDecoration: "none" }}>
        <button className="button-return-categories">
          Return to All Categories
        </button>
      </Link>
      single category page
      <div className="container">
        <div className="row align-items-center">
          {playlists.map((playlist) => {
            return (
              <div
                className="col-sm-3"
                key={playlist.id}
                onClick={() => setSinglePlaylist(playlist.id)}
              >
                <Link
                  to={`/playlists/${playlist.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <img
                    src={playlist.images[0].url}
                    alt="cover"
                    className="img-fluid mb-3"
                    style={{ borderRadius: "4rem" }}
                  />
                  <h2>{playlist.name}</h2>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const mapState = (state) => {
  return state;
};

export default connect(mapState)(SingleCategoryView);

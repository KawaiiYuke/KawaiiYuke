import React, { useState, useEffect } from "react";
import useAuth from "./useAuth";
//import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./css/SinglePlaylistView.css";
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
});

function SinglePlaylistView(props) {
  const accessToken = props?.accessToken;
  const playlistId = window.location.pathname.split("/").slice(-1)[0];
  const [playlist, setPlaylist] = useState([]);
  const [tracks, setTracks] = useState([]);
  useEffect(() => {
    axios(`https://api.spotify.com/v1/playlists/${playlistId}`, {
      method: "GET",
      headers: { Authorization: "Bearer " + accessToken },
    }).then((playlistResponse) => {
      setPlaylist(playlistResponse.data);
    });
  }, [playlistId, accessToken]);

  useEffect(() => {
    axios(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: "GET",
      headers: { Authorization: "Bearer " + accessToken },
    }).then((tracksResponse) => {
      setTracks(tracksResponse.data.items);
    });
  });

  return (
    <div>
      <Link to="/explore" style={{ textDecoration: "none" }}>
        <button className="button-return-categories">
          Return to All Categories
        </button>
      </Link>
      <div className="container">
        <div className="table">
          <div>
            <h1> {playlist.name}</h1>
            {/* <img src={playlist.images[0].url} alt="album" /> */}

            <div>
              <table>
                <thead>
                  <tr>
                    <th>Album Cover</th>
                    <th style={{ textAlign: "start", paddingLeft: "1em" }}>
                      Track
                    </th>
                    <th style={{ textAlign: "start", paddingLeft: "1em" }}>
                      Artist
                    </th>
                    <th style={{ textAlign: "start", paddingLeft: "1em" }}>
                      Album
                    </th>
                    <th style={{ textAlign: "start", paddingLeft: "1em" }}>
                      Option
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tracks.map((track, index) => {
                    return (
                      <tr key={index}>
                        <td className="album-cover">
                          <Link to={`/track/${track.track.id}`}>
                            <img
                              src={track.track.album.images[2].url}
                              alt="album"
                            />
                          </Link>
                        </td>

                        <td style={{ textAlign: "left" }}>
                          <Link
                            to={`/track/${track.track.id}`}
                            style={{ textDecoration: "none", padding: "1em" }}
                          >
                            {track.track.name}
                          </Link>
                        </td>

                        <td style={{ textAlign: "left", padding: "1em" }}>
                          {track.track.artists[0].name}
                        </td>
                        <td style={{ textAlign: "left" }}>
                          {track.track.album.name}
                        </td>

                        <td>
                          <button className="button-8">+ play</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapState = (state) => {
  return state;
};

export default connect(mapState)(SinglePlaylistView);

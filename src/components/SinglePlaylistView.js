import React, { useState, useEffect } from "react";
import useAuth from "./useAuth";
//import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

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

                  <td>
                    <Link to={`/track/${track.track.id}`}>
                      <img src={track.track.album.images[2].url} alt="album" />
                      {track.track.name}
                    </Link>
                  </td>

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

const mapState = (state) => {
  return state;
};

export default connect(mapState)(SinglePlaylistView);

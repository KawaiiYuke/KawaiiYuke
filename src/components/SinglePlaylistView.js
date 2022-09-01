import React, { useState, useEffect } from 'react';
import useAuth from './useAuth';
import SpotifyWebApi from 'spotify-web-api-node';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './css/SinglePlaylistView.css';
import { useSelector } from 'react-redux';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
});

function SinglePlaylistView() {
  const logInState = useSelector((state) => state.logIn);
  const accessToken = logInState?.accessToken;
  const playlistId = window.location.pathname.split('/').slice(-1)[0];
  const [playlist, setPlaylist] = useState([]);
  const [tracks, setTracks] = useState([]);
  useEffect(() => {
    axios(`https://api.spotify.com/v1/playlists/${playlistId}`, {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + accessToken },
    }).then((playlistResponse) => {
      setPlaylist(playlistResponse.data);
    });
  }, [playlistId, accessToken]);

  useEffect(() => {
    axios(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + accessToken },
    }).then((tracksResponse) => {
      setTracks(tracksResponse.data.items);
    });
  });

  return (
    <div style={{ paddingRight: '17rem' }}>
      <h1 style={{ color: 'white' }}>{playlist.name}</h1>
      <div className="d-flex justify-content-center">
        <Link to="/explore" style={{ textDecoration: 'none' }}>
          <button
            className="button-return-categories"
            style={{ fontSize: '.9rem' }}
          >
            Return to All Categories
          </button>
        </Link>
      </div>
      <div className="container">
        <div className="table" style={{ color: 'white' }}>
          <div>
            <div>
              <table style={{ background: 'hsla(0, 100%, 90%, 0.3)' }}>
                <thead>
                  <tr>
                    <th>Album Cover</th>
                    <th style={{ textAlign: 'start', paddingLeft: '1em' }}>
                      Track
                    </th>
                    <th style={{ textAlign: 'start', paddingLeft: '1em' }}>
                      Artist
                    </th>
                    <th style={{ textAlign: 'start', paddingLeft: '1em' }}>
                      Album
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

                        <td style={{ textAlign: 'left' }}>
                          <Link
                            to={`/track/${track.track.id}`}
                            style={{
                              textDecoration: 'none',
                              padding: '1em',
                              color: 'white',
                            }}
                          >
                            {track.track.name}
                          </Link>
                        </td>

                        <td style={{ textAlign: 'left', padding: '1em' }}>
                          {track.track.artists[0].name}
                        </td>
                        <td style={{ textAlign: 'left' }}>
                          {track.track.album.name}
                        </td>

                        <td>
                          <button className="playButton">PLAY</button>
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

export default SinglePlaylistView;

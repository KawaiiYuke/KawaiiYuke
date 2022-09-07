import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/SinglePlaylistView.css';
import { useSelector, useDispatch } from 'react-redux';
import { setSinglePlaylist, setTrack } from '../redux/browse';

import { db } from './VideoTest';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

function SinglePlaylistView() {
  const logInState = useSelector((state) => state.logIn);
  let accessToken = logInState?.accessToken;
  const dispatch = useDispatch();
  const playlistInfo = useSelector((state) => state.browse.singlePlaylistId);
  const categoryId = useSelector((state) => state.browse.singleCategoryId);
  const singlePlaylist = useSelector(
    (state) => state.browse.singlePlaylistTracks
  );
  const reduxRoomId = useSelector((state) => state.room.roomId);

  useEffect(() => {
    dispatch(setSinglePlaylist(accessToken, playlistInfo.playlistId));
  }, []);

  async function handlePlaylist(track) {
    if (reduxRoomId) {
      await updateDoc(doc(db, 'RoomPlaylist', reduxRoomId), {
        playlist: arrayUnion({
          artist: track.track.artists[0].name,
          title: track.track.name,
          uri: track.track.uri,
          albumUrl: track.track.album.images[2].url,
          id: track.track.id,
        }),
      });
    }
  }

  return (
    <div>
      <div className="container">
        <div className="table" style={{ color: 'white' }}>
          <div>
            <h1 style={{ paddingTop: '1em', textShadow: '2px 4px black' }}>
              {' '}
              {playlistInfo.playlistName}
            </h1>
            <div className="d-flex justify-content-center">
              <Link
                to={`/category/${categoryId.categoryId}`}
                style={{ textDecoration: 'none' }}
              >
                <button
                  className="button-return-categories"
                  style={{ fontSize: '.9rem' }}
                >
                  Return to {categoryId.categoryName}
                </button>
              </Link>
            </div>

            {singlePlaylist[0].track.id ? (
              <div style={{ paddingTop: '1em' }}>
                <table
                  style={{
                    background: 'hsla(0, 100%, 90%, 0.3)',
                  }}
                >
                  <thead>
                    <tr style={{ fontSize: '15px' }}>
                      <th>Album Cover</th>
                      <th style={{ textAlign: 'start', paddingLeft: '1em' }}>
                        Track
                      </th>
                      <th style={{ textAlign: 'start', paddingLeft: '1em' }}>
                        Artist
                      </th>
                      <th style={{ textAlign: 'start', paddingLeft: '3em' }}>
                        Album
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {singlePlaylist &&
                      singlePlaylist.map((track, index) => {
                        return (
                          track.track && (
                            <tr
                              key={index}
                              onClick={() =>
                                dispatch(setTrack(accessToken, track.track.id))
                              }
                            >
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
                                    textShadow: '2px 1px black',
                                  }}
                                >
                                  {track.track.name}
                                </Link>
                              </td>

                              <td
                                style={{
                                  textAlign: 'left',
                                  padding: '1em',
                                  textShadow: '2px 1px black',
                                  color: 'white',
                                }}
                              >
                                {track.track.artists[0].name}
                              </td>
                              <td
                                style={{
                                  textAlign: 'left',
                                  paddingLeft: '3em',
                                  textShadow: '2px 1px black',
                                  color: 'white',
                                }}
                              >
                                {track.track.album.name}
                              </td>

                              {reduxRoomId ? (
                                <td>
                                  <button
                                    className="playButton"
                                    onClick={() => handlePlaylist(track)}
                                  >
                                    Add to Playlist
                                  </button>
                                </td>
                              ) : null}
                            </tr>
                          )
                        );
                      })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div>Sorry, there is no song in this album.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePlaylistView;

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./css/SinglePlaylistView.css";
import { useSelector, useDispatch } from "react-redux";
import { setSinglePlaylist, setTrack } from "../redux/browse";

import app, { db } from "./VideoTest";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  getFirestore,
} from "firebase/firestore";

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

  console.log("reduxRoomId", reduxRoomId);
  useEffect(() => {
    dispatch(setSinglePlaylist(accessToken, playlistInfo.playlistId));
  }, []);

  async function handlePlaylist(trackId) {
    if (reduxRoomId) {
      const playlistRef = await updateDoc(
        doc(db, "RoomPlaylist", reduxRoomId),
        {
          playlist: arrayUnion(trackId),
        }
      );
    }
  }
  console.log("single playlist", singlePlaylist);
  return (
    <div>
      <div className="container" style={{ marginLeft: "24em" }}>
        <div className="table" style={{ color: "white" }}>
          <div>
            <h1 style={{ paddingTop: "1em", textShadow: "2px 4px black" }}>
              {" "}
              {playlistInfo.playlistName}
            </h1>
            <div className="d-flex justify-content-center">
              <Link
                to={`/category/${categoryId.categoryId}`}
                style={{ textDecoration: "none" }}
              >
                <button
                  className="button-return-categories"
                  style={{ fontSize: ".9rem" }}
                >
                  Return to {categoryId.categoryName}
                </button>
              </Link>
            </div>
            {singlePlaylist[0].track.id ? (
              <div style={{ paddingTop: "1em" }}>
                <table
                  style={{
                    background: "hsla(0, 100%, 90%, 0.3)",
                  }}
                >
                  <thead>
                    <tr style={{ fontSize: "15px" }}>
                      <th>Album Cover</th>
                      <th style={{ textAlign: "start", paddingLeft: "1em" }}>
                        Track
                      </th>
                      <th style={{ textAlign: "start", paddingLeft: "1em" }}>
                        Artist
                      </th>
                      <th style={{ textAlign: "start", paddingLeft: "3em" }}>
                        Album
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {singlePlaylist.map((track, index) => {
                      return (
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

                          <td style={{ textAlign: "left" }}>
                            <Link
                              to={`/track/${track.track.id}`}
                              style={{
                                textDecoration: "none",
                                padding: "1em",
                                color: "white",
                                textShadow: "2px 4px black",
                              }}
                            >
                              {track.track.name}
                            </Link>
                          </td>

                          <td
                            style={{
                              textAlign: "left",
                              padding: "1em",
                              textShadow: "2px 4px black",
                            }}
                          >
                            {track.track.artists[0].name}
                          </td>
                          <td
                            style={{
                              textAlign: "left",
                              paddingLeft: "3em",
                              textShadow: "2px 4px black",
                            }}
                          >
                            {track.track.album.name}
                          </td>

                          {/* <td>
                          <button className="playButton">
                            Add to playlist
                          </button> */}
                          {reduxRoomId ? (
                            <td>
                              <button
                                className="playButton"
                                onClick={() => handlePlaylist(track.track.id)}
                              >
                                Add to Playlist
                              </button>
                            </td>
                          ) : null}
                          {/* </td> */}
                        </tr>
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

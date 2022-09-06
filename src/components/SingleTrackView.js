import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setLyrics } from "../redux/browse";
import "./css/SingleTrackView.css";
import { loggingIn } from "../redux/logIn";
import Player from "./Player";

function SingleTrackView() {
  const logInState = useSelector((state) => state.logIn);
  const reduxRoomId = useSelector((state) => state.room.roomId);
  let accessToken = logInState?.accessToken;
  const trackInfo = useSelector((state) => state.browse.singleTrackInfo);
  const lyrics = useSelector((state) => state.browse.lyrics);
  const playlistInfo = useSelector((state) => state.browse.singlePlaylistId);
  const dispatch = useDispatch();
  useEffect(() => {
    if (trackInfo.name) {
      dispatch(setLyrics(trackInfo.name, trackInfo.artists[0].name));
    }
  }, [trackInfo]);

  return (
    <div className="single-track-view">
      <div className="track-view">
        <div>
          {trackInfo.name ? (
            <div>
              <div>
                <h1>{trackInfo.name}</h1>
                <h2>By: {trackInfo.artists[0].name}</h2>

                <img src={trackInfo.album.images[2].url} alt="album" />
                <Link
                  to={`/playlists/${playlistInfo.playlistId}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="return-to-button">
                    <button className="button-return-categories">
                      Return to {playlistInfo.playlistName}
                    </button>
                  </div>
                </Link>
                <div className="text-center" style={{ whiteSpace: "pre" }}>
                  {lyrics}
                </div>
              </div>

              {reduxRoomId ? (
                ""
              ) : (
                <div>
                  <Player accessToken={accessToken} trackUri={trackInfo?.uri} />
                </div>
              )}
            </div>
          ) : (
            <h2>Sorry, no track was found. Please try again.</h2>
          )}
        </div>
      </div>
    </div>
  );
}

export default SingleTrackView;

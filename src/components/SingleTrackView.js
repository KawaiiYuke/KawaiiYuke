import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setLyrics } from "../redux/browse";

function SingleTrackView() {
  const logInState = useSelector((state) => state.logIn);
  const accessToken = logInState?.accessToken;
  const trackInfo = useSelector((state) => state.browse.singleTrackInfo);
  const lyrics = useSelector((state) => state.browse.lyrics);
  const playlistInfo = useSelector((state) => state.browse.singlePlaylistId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLyrics(trackInfo.name, trackInfo.artists[0].name));
  }, [trackInfo]);

  return (
    <div>
      <Link
        to={`/playlists/${playlistInfo.playlistId}`}
        style={{ textDecoration: "none" }}
      >
        <button className="button-return-categories">
          Return to {playlistInfo.playlistName}
        </button>
      </Link>

      <div>
        {trackInfo.name ? (
          <div>
            <h1>{trackInfo.name}</h1>
            {/* <h2>By: {trackInfo.artists[0].name}</h2>

            <img src={trackInfo.album.images[2].url} alt="album" /> */}

            <div className="text-center" style={{ whiteSpace: "pre" }}>
              Lyrics: {lyrics}
            </div>
          </div>
        ) : (
          <h2>Sorry, no track was found. Please try again.</h2>
        )}
      </div>
    </div>
  );
}

export default SingleTrackView;

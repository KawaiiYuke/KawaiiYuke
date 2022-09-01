import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./css/SinglePlaylistView.css";
import { useSelector, useDispatch } from "react-redux";
import { setSinglePlaylist, setTrack } from "../redux/browse";
import { loggingIn } from "../redux/logIn";

function SinglePlaylistView() {
  const logInState = useSelector((state) => state.logIn);
  let accessToken = logInState?.accessToken;
  const dispatch = useDispatch();
  const playlistInfo = useSelector((state) => state.browse.singlePlaylistId);
  const categoryId = useSelector((state) => state.browse.singleCategoryId);
  const singlePlaylist = useSelector(
    (state) => state.browse.singlePlaylistTracks
  );

  useEffect(() => {
    dispatch(setSinglePlaylist(accessToken, playlistInfo.playlistId));
  }, []);

  if (!accessToken) {
    let codeFromLocalStorage = window.localStorage.getItem("code");
    if (codeFromLocalStorage) {
      dispatch(loggingIn(codeFromLocalStorage));
    }
  }

  return (
    <div>
      <Link
        to={`/category/${categoryId.categoryId}`}
        style={{ textDecoration: "none" }}
      >
        <button className="button-return-categories">
          Return to {categoryId.categoryName}
        </button>
      </Link>

      <div className="container">
        <div className="table" style={{ color: "white" }}>
          <div>
            <h1> {playlistInfo.playlistName}</h1>
            <div>
              <table style={{ background: "hsla(0, 100%, 90%, 0.3)" }}>
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
                            }}
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

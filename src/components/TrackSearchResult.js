import React from "react";
import "./css/TrackSearch.css";
import { useSelector, useDispatch } from "react-redux";
import app, { db } from "./VideoTest";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

export default function TrackSearchResult({ track, chooseTrack }) {
  function handlePlay() {
    chooseTrack(track);
  }

  const reduxRoomId = useSelector((state) => state.room.roomId);

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
  return (
    <div
      className="d-flex m-1 justify-content-evenly TrackSearch container"
      style={{
        cursor: "pointer",
        display: "flex",
        justifyContent: "flex-end",
        backgroundColor: "hsla(0, 100%, 100%, 0.3)",
        border: "solid",
        borderColor: "rgb(255, 255, 255, 0.5)",
      }}
      onClick={handlePlay}
    >
      <div>
        <img
          src={track.albumUrl}
          style={{
            height: "64px",
            width: "64px",
            marginTop: ".7em",
          }}
          alt="album"
        />
        <div
          style={{
            fontWeight: "bold",
            color: "rgb(255, 255, 255, 0.8)",
            display: "flex",

            alignItems: "center",
            flexDirection: "column",
            marginBottom: "0.5em",
          }}
        >
          {track.title} By {track.artist}
          {reduxRoomId ? (
            <button
              className="AddToPlaylist"
              onClick={() => handlePlaylist(track.id)}
            >
              Add to Playlist
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

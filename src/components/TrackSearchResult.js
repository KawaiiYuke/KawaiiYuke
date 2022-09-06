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
import addTrack from "../redux/roomPlaylist";

export default function TrackSearchResult({ track, chooseTrack }) {
  function handlePlay() {
    chooseTrack(track);
  }

  const reduxRoomId = useSelector((state) => state.room.roomId);
  const dispatch = useDispatch();

  async function handlePlaylist(track) {
    if (reduxRoomId) {
      const playlistRef = await updateDoc(
        doc(db, "RoomPlaylist", reduxRoomId),
        {
          playlist: arrayUnion(track),
        }
      );
      dispatch(addTrack(reduxRoomId, track));
    }
  }
  return (
    <div
      className="d-flex m-1 justify-content-evenly TrackSearch container"
      style={{
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        border: "solid",
        borderColor: "rgb(255, 255, 255, 0.5)",
      }}
      onClick={handlePlay}
    >
      <div style={{ fontWeight: "bold", color: "rgb(255, 255, 255, 0.8)" }}>
        {track.title} By {track.artist}
        <img
          src={track.albumUrl}
          style={{ height: "64px", width: "64px", marginTop: ".7em" }}
          alt="album"
        />
        {reduxRoomId ? (
          <button
            className="AddToPlaylist"
            onClick={() => handlePlaylist(track)}
          >
            Add to Playlist
          </button>
        ) : null}
      </div>
    </div>
  );
}

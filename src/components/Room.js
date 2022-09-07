import React, { useState, useEffect } from "react";
import Carousel from "./Carousel";
import "./css/Room.css";
import VideoTest from "./VideoTest";
import { useSelector } from "react-redux";
import Player from "./Player";
import { db } from "./VideoTest";
import { doc, getDoc } from "firebase/firestore";

const Room = () => {
  const logInState = useSelector((state) => state.logIn);
  let accessToken = logInState?.accessToken;
  const reduxRoomId = useSelector((state) => state.room.roomId);
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    async function callPlaylist(reduxRoomId) {
      const docRef = doc(db, "RoomPlaylist", reduxRoomId);
      const getdocSnap = await getDoc(docRef);
      if (getdocSnap.exists()) {
        const res = getdocSnap.data();
        if (res) setPlaylist(res.playlist);
      }
    }
    callPlaylist(reduxRoomId);
  }, []);

  return (
    <div className="room">
      <Carousel />
      <VideoTest />
    </div>
  );
};

export default Room;

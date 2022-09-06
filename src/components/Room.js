import React from "react";
import Carousel from "./Carousel";
import "./css/Room.css";
import VideoTest from "./VideoTest";
import { useSelector } from "react-redux";
import Player from "./Player";

const Room = () => {
  const logInState = useSelector((state) => state.logIn);
  let accessToken = logInState?.accessToken;
  return (
    <div className="room">
      <Carousel />

      <VideoTest />
      <Player accessToken={accessToken} />
    </div>
  );
};

export default Room;

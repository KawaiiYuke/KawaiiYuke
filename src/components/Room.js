import React from "react";
import Carousel from "./Carousel";
import "./css/Room.css";
import VideoTest from "./VideoTest";
import Home from "./Home";

const Room = () => {
  return (
    <div className="room">
      <Carousel />
      {/* <Home /> */}
      <VideoTest />
    </div>
  );
};

export default Room;

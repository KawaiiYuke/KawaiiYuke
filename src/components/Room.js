import React from 'react';
import Carousel from './Carousel';
import './css/Room.css';
import VideoTest from './VideoTest';
import { useSelector } from 'react-redux';
import Player from './Player';

const Room = () => {
  const logInState = useSelector((state) => state.logIn);
  let accessToken = logInState?.accessToken;
  return (
    <div className="room">
      <div className="roomComponents">
        <Carousel />
        <VideoTest />
        <Player accessToken={accessToken} />
      </div>
    </div>
  );
};

export default Room;

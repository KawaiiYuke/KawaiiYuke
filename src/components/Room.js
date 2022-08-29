import React from 'react';
import Carousel from './Carousel';
import './css/Room.css';
import VideoTest from './VideoTest';

const Room = () => {
  return (
    <div className="room">
      <Carousel />
      <VideoTest />
    </div>
  );
};

export default Room;

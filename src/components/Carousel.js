import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from 'swiper';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import './css/Carousel.scss';
import Home from './Home';
import RoomPlaylist from './RoomPlaylist';
import { db } from './VideoTest';
import { useSelector } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';

const Carousel = () => {
  const logInState = useSelector((state) => state.logIn);
  let accessToken = logInState?.accessToken;
  const reduxRoomId = useSelector((state) => state.room.roomId);
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    async function callPlaylist(reduxRoomId) {
      const docRef = doc(db, 'RoomPlaylist', reduxRoomId);
      const getdocSnap = await getDoc(docRef);
      if (getdocSnap.exists()) {
        const res = getdocSnap.data();
        if (res) setPlaylist(res.playlist);
      }
    }
    callPlaylist(reduxRoomId);
  }, []);

  return (
    <React.Fragment>
      <div className="swiperContainer" style={{ width: '50%' }}>
        <Swiper
          modules={[Navigation]}
          navigation
          speed={800}
          slidesPerView={1}
          loop
          className="myswiper"
        >
          <SwiperSlide className="swiperslide">
            <Home />
          </SwiperSlide>
          <SwiperSlide className="swiperslide">
            <RoomPlaylist />
          </SwiperSlide>
        </Swiper>
      </div>
    </React.Fragment>
  );
};

export default Carousel;

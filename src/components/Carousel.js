import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "./css/Carousel.scss";
import Home from "./Home";
import { Form } from "react-bootstrap";
import RoomPlaylist from "./RoomPlaylist";
import Explore from "./Explore";
import Player from "./Player";
import { useSelector, useDispatch } from "react-redux";

const Carousel = () => {
  const logInState = useSelector((state) => state.logIn);
  let accessToken = logInState?.accessToken;
  return (
    <React.Fragment>
      <div className="swiperContainer">
        <Swiper
          modules={[Navigation]}
          navigation
          speed={800}
          slidesPerView={1}
          loop
          className="myswiper"
        >
          <SwiperSlide className="swiperslide">
            {/* <img src="https://i.imgur.com/DtTzXpu.jpg" alt="" /> */}
            <Explore />
          </SwiperSlide>
          <SwiperSlide className="swiperslide">
            {/* <img src="https://i.imgur.com/DtTzXpu.jpg" alt="" /> */}
            <Home />
          </SwiperSlide>
          <SwiperSlide className="swiperslide">
            {/* <img src="https://i.imgur.com/N0kXRqz.jpg" alt="" /> */}
            <RoomPlaylist />
          </SwiperSlide>
          <SwiperSlide className="swiperslide">
            <img src="https://i.imgur.com/eqxiyho.jpg" alt="" />
          </SwiperSlide>
        </Swiper>
      </div>
      <div>
        <Player
          accessToken={accessToken}
          //       // trackUri={playingTrack?.uri}
        />
      </div>
    </React.Fragment>
  );
};

export default Carousel;

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "./css/Carousel.scss";
import Home from "./Home";
import RoomPlaylist from "./RoomPlaylist";

const Carousel = () => {
  return (
    <React.Fragment>
      <div className="swiperContainer" style={{ width: "70%" }}>
        <Swiper
          modules={[Navigation]}
          navigation
          speed={800}
          slidesPerView={1}
          loop
          className="myswiper"
        >
          <SwiperSlide className="swiperslide" style={{ width: "50%" }}>
            <Home />
          </SwiperSlide>
          <SwiperSlide className="swiperslide" style={{ width: "50%" }}>
            <RoomPlaylist />
          </SwiperSlide>
        </Swiper>
      </div>
    </React.Fragment>
  );
};

export default Carousel;

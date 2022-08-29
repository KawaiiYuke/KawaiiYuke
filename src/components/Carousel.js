import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "./css/Carousel.scss";
import Home from "./Home";
import { Form } from "react-bootstrap";

const Carousel = () => {
  return (
    <div className="swiperContainer">
      <div className="search_div">
        <Form.Control type="search" placeholder="Search Songs/Artists" />
      </div>
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
          <Home />
        </SwiperSlide>
        <SwiperSlide className="swiperslide">
          <img src="https://i.imgur.com/N0kXRqz.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide className="swiperslide">
          <img src="https://i.imgur.com/eqxiyho.jpg" alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Carousel;

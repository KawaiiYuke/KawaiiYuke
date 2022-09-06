import React, { useState, useEffect } from "react";
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
import app, { db } from "./VideoTest";
import { useSelector } from "react-redux";
import { doc, getDoc } from "firebase/firestore";

const Carousel = () => {
  const logInState = useSelector((state) => state.logIn);
  let accessToken = logInState?.accessToken;
  //const reduxRoomId = useSelector((state) => state.room.roomId);
  const reduxRoomId = "ZkbPky8S0YWyGlWHgn0d";
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    async function callPlaylist(reduxRoomId) {
      const docRef = doc(db, "RoomPlaylist", reduxRoomId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPlaylist(docSnap.data().playlist);
      }
      //below is to get all room playlists
      // const q = query(collection(db, "RoomPlaylist"));
      // const querySnapshot = await getDocs(q);
      // const queryAllRoomPlaylistData = querySnapshot.docs.map((detail) => ({
      //   ...detail.data(),
      //   id: detail.id,
      // }));
      // console.log("queryData", queryAllRoomPlaylistData);
    }
    callPlaylist(reduxRoomId);
  }, []);

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
            <img src="https://i.imgur.com/DtTzXpu.jpg" alt="" />
            {/* <Explore /> */}
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
        <Player accessToken={accessToken} trackUri={playlist[0]?.uri} />
      </div>
    </React.Fragment>
  );
};

export default Carousel;

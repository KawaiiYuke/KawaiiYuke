import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Explore from './Explore';
import AboutUs from './AboutUs';
import SignIn from './SignIn';
import SignOut from './SignOut';
import Home from './Home';
import Navigation from './Navbar';
import Room from './Room';
import SingleCategoryView from './SingleCategoryView';
import SinglePlaylistView from './SinglePlaylistView';
import VideoTest from './VideoTest';
import './css/Paths.css';
import SingleTrackView from './SingleTrackView';
import { useSelector } from 'react-redux';
import RoomPlaylist from './RoomPlaylist';

const Paths = () => {
  useSelector((state) => state.logIn);

  return (
    <Router>
      <div className="allPaths">
        <div className="navigationBar">
          <Navigation />
        </div>
        <div className="main_content">
          <Routes>
            <Route path="/" element={<Explore />} />
            <Route path="/aboutus" element={<AboutUs />} />c
            <Route path="/signin" element={<SignIn />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/signout" element={<SignOut />} />
            <Route path="/room" element={<Room />} />
            <Route path="/search" element={<Home />} />
            <Route
              path="/category/:categoryId"
              element={<SingleCategoryView />}
            />
            <Route
              path="/playlists/:playlistId"
              element={<SinglePlaylistView />}
            />
            <Route path="/track/:trackid" element={<SingleTrackView />} />
            <Route path="/video" element={<VideoTest />} />
            <Route path="/roomplaylist" element={<RoomPlaylist />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default Paths;

import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Explore from './Explore';
import SignIn from './SignIn';
import SignOut from './SignOut';
import Home from './Home';
import Navigation from './Navbar';
import Room from './Room';
import SingleCategoryView from './SingleCategoryView';
import SinglePlaylistView from './SinglePlaylistView';
import VideoTest from './VideoTest';

// import Webcam from "./Webcam";
import WebcamReact from './WebcamReact';
import SingleTrackView from './SingleTrackView';

import { useSearchParams } from 'react-router-dom';

const Paths = () => {
  return (
    <Router>
      <div className="Paths">
        <div>
          <Navigation />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/room" element={<Room />} />

          <Route
            path="/category/:categoryId"
            element={<SingleCategoryView />}
          />
          <Route
            path="/playlists/:playlistId"
            element={<SinglePlaylistView />}
          />
          <Route path="/track/:trackid" element={<SingleTrackView />} />

          {/* <Route path="/webcam" element={<Webcam />} /> */}
          <Route path="/test" element={<VideoTest />} />
        </Routes>
      </div>
    </Router>
  );
};

export default Paths;

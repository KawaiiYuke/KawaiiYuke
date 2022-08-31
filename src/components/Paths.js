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
import './css/Paths.css';
import SingleTrackView from './SingleTrackView';

const Paths = () => {
  return (
    <Router>
      <div className="allPaths">
        <div>
          <Navigation />
        </div>
        <div className="main_content" style={{ marginLeft: '250px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/explore" element={<Explore />} />

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
            <Route path="/test" element={<VideoTest />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default Paths;

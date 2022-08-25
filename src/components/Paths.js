import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Explore from "./Explore";
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import Home from "./Home";
import Navigation from "./Navbar";
import Room from "./Room";
import SingleCategoryView from "./SingleCategoryView";
import SinglePlaylistView from "./SinglePlaylistView";

// import Webcam from "./Webcam";
import WebcamReact from "./WebcamReact";
import SingleTrackView from "./SingleTrackView";

const Paths = () => {
  const code = new URLSearchParams(window.location.search).get("code");
  return (
    <Router>
      <div className="Paths">
        <div>
          <Navigation />
        </div>
        <Routes>
          {code ? (
            <Route path="/" element={<Home code={code} />} />
          ) : (
            <Route path="/signin" element={<SignIn />} />
          )}
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/explore" element={<Explore code={code} />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/room" element={<Room />} />

          <Route
            path="/category/:categoryId"
            element={<SingleCategoryView code={code} />}
          />
          <Route
            path="/playlists/:playlistId"
            element={<SinglePlaylistView code={code} />}
          />
          <Route
            path="/track/:trackid"
            element={<SingleTrackView code={code} />}
          />

          {/* <Route path="/webcam" element={<Webcam />} /> */}
          <Route path="/test" element={<WebcamReact />} />
        </Routes>
      </div>
    </Router>
  );
};

export default Paths;

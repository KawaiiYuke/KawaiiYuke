import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSpotify from './LoginSpotify';
import MusicPlayer from './MusicPlayer';

const code = new URLSearchParams(window.location.search).get('code');

const Paths = () => {
  return (
    <Router>
      <Routes>
        {code ? (
          <Route exact path="/" element={<MusicPlayer code={code} />} />
        ) : (
          <Route path="/" element={<LoginSpotify />} />
        )}
      </Routes>
    </Router>
  );
};

export default Paths;

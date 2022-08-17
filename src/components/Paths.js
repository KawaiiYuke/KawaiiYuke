import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MusicPlayer from './MusicPlayer';

const Paths = () => {
  return (
    <Router>
      <Routes>
        <Route path="/music" element={<MusicPlayer />} />
      </Routes>
    </Router>
  );
};

export default Paths;

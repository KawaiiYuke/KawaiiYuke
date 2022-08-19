import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Explore from './Explore';
import SignIn from './SignIn';
import SignOut from './SignOut';
import Home from './Home';
import Navigation from './Navbar';
import Room from './Room';

const Paths = () => {
  return (
    <Router>
      <div className="Paths">
        <div>
          <Navigation />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Explore />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/room" element={<Room />} />
        </Routes>
      </div>
    </Router>
  );
};

export default Paths;

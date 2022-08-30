import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/Navbar.css';
import menu from '../images/menu.png';
import logo from '../images/kawaii_logo.png';
import explore from '../images/explore.png';
import signin from '../images/signin.png';
import search from '../images/search.png';

import { AUTH_URL } from './SignIn';

const Navigation = () => {
  const [navBar, setBar] = useState(false);

  useEffect(() => {
    window.onresize = function () {
      if (document.body.offsetWidth < 960) {
        setBar(true);
      } else {
        setBar(false);
      }
    };
  });
  return (
    <div className="wrapper">
      <div className="sidebar" style={{ width: navBar ? '50px' : '225px' }}>
        <Link to="/">
          <img src={logo} alt="" width="100%" />
        </Link>
        <ul>
          <li>
            <Link to="/explore">
              <img className="navIcon" src={explore} alt="" />
              Explore
            </Link>
          </li>

          <li>
            <Link to="/signin">
              <img className="navIcon" src={signin} alt="" />
              Sign In
            </Link>
          </li>

          <li>
            <a href={AUTH_URL}>
              <img className="navIcon" src={search} alt="" />
              Search
            </a>
          </li>
        </ul>
        <div
          className="menu"
          onClick={() => {
            setBar(!navBar);
          }}
        >
          <img src={menu} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Navigation;

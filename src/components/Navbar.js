import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./css/Navbar.css";
import menu from "../images/menu.png";
import logo from "../images/kawaii_logo.png";
import explore from "../images/explore.png";
import signout from "../images/signout.png";
import seach from "../images/seach.png";
import signin from "../images/signin.png";

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
      <div className="sidebar" style={{ width: navBar ? "50px" : "300px" }}>
        <Link to="/">
          <img src={logo} alt="" width="100%" />
        </Link>
        <ul>
          <li>
            <div className="navIcon">
              <img src={seach} alt="" />
            </div>
            <input type="search" placeholder="Search Songs" />
          </li>

          <li>
            <Link to="/explore">
              <div className="navIcon">
                <img src={explore} alt="" />
              </div>
              <i className="fas fa-home"></i>Explore
            </Link>
          </li>
          <li>
            <Link to="/signin">
              <div className="navIcon">
                <img src={signin} alt="" />
              </div>
              <i className="fas fa-user"></i>Sign In
            </Link>
          </li>
          <li>
            <Link to="/signout">
              <div className="navIcon">
                <img src={signout} alt="" />
              </div>
              <i className="fas fa-address-card"></i>Sign Out
            </Link>
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

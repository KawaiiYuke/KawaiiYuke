
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./css/Navbar.css";
import menu from "../images/menu.png";
import logo from "../images/kawaii_logo.png";



import { AUTH_URL } from "./SignIn";



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
            <input type="search" placeholder="Search Songs" />
          </li>

          <li>
            <Link to="/explore">
              <i className="fas fa-home"></i>Explore
            </Link>
          </li>
          <li>
            <Link to="/signin">
              <i className="fas fa-user"></i>Sign In
            </Link>
          </li>

          <li>
            <a href={AUTH_URL}>
              <i className="fas fa-address-card"></i>Search
            </a>
          </li>
          <li>
            <Link to="/signout">
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

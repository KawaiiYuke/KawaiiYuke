import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./css/Navbar.css";
import menu from "../images/menu.png";
import logo from "../images/kawaii_logo.png";
import explore from "../images/explore.png";
import signin from "../images/signin.png";
import search from "../images/search.png";
import signout from "../images/signout.png";
import room from "../images/room.png";
import { useDispatch, useSelector } from "react-redux";
import { loggingOut } from "../redux/logIn";

import { AUTH_URL } from "./SignIn";

const Navigation = () => {
  const dispatch = useDispatch();
  const logInState = useSelector((state) => state.logIn);

  const [signIn, setSignIn] = useState(false);
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

  useEffect(() => {
    setSignIn(logInState.loggedIn);
  }, [logInState.loggedIn]);

  return (
    <div className="wrapper">
      <div className="sidebar" style={{ width: navBar ? "50px" : "225px" }}>
        <Link to="/">
          <img src={logo} alt="" width="100%" />
        </Link>
        {!logInState.loggedIn ? (
          <ul>
            <li>
              <Link to="/signin">
                <img className="navIcon" src={signin} alt="" />
                Sign In
              </Link>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <Link to="/aboutus">
                <img className="navIcon" src={room} alt="" />
                About Us
              </Link>
            </li>
            <li>
              <Link to="/explore">
                <img className="navIcon" src={explore} alt="" />
                Explore
              </Link>
            </li>

            <li>
              <Link to="/room">
                <img className="navIcon" src={room} alt="" />
                Room
              </Link>
            </li>

            <li>
              <Link to="/search">
                <img className="navIcon" src={search} alt="" />
                Search
              </Link>
            </li>

            <li onClick={() => dispatch(loggingOut())}>
              <Link to="/signout">
                <img className="navIcon" src={signout} alt="" />
                Sign Out
              </Link>
            </li>
            <div
              className="menu"
              onClick={() => {
                setBar(!navBar);
              }}
            >
              <img src={menu} alt="" />
            </div>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navigation;

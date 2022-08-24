import React from "react";
import { Link } from "react-router-dom";
import "./css/Navbar.css";

const Navigation = () => {
  return (
    <div className="wrapper">
      <div className="sidebar">
        <Link to="/">
          <h2>KawaiiYuke</h2>
        </Link>
        <ul>
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
            <Link to="/signout">
              <i className="fas fa-address-card"></i>Sign Out
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navigation;

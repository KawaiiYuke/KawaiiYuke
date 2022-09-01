import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "react-bootstrap";
import { loggingIn } from "../redux/logIn";
import "./css/SignIn.css";

const redirect = window.location.href.split("/");

export const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=462ea59988b243c8962ff48e65527091&response_type=code&redirect_uri=${redirect[0]}//${redirect[2]}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;

const SignIn = () => {
  return (
    <div>
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="mic-image">{/* <img src={hangMic} alt="" /> */}</div>
        <div className="welcome-box">
          <h1 className="welcome-sentence">WELCOME TO KAWAIIYUKE</h1>
          <button className="spotifyButton">
            <a
              href={AUTH_URL}
              style={{ textDecoration: "none", color: "white" }}
            >
              Log in With Spotify
            </a>
          </button>
        </div>
      </Container>
    </div>
  );
};

// btn btn-success btn-lg

export default SignIn;

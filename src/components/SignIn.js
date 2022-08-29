import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';
import { loggingIn } from '../redux/store'

const redirect = window.location.href.split('/');

export const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=462ea59988b243c8962ff48e65527091&response_type=code&redirect_uri=${redirect[0]}//${redirect[2]}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;

const SignIn = () => {
  return (
    <div>
      <h3>
        <Container
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: '100vh' }}
        >
          <a className="btn btn-success btn-lg" href={AUTH_URL}>
            Log in With Spotify
          </a>
        </Container>
      </h3>
    </div>
  );
};

const mapState = (state) => {
  return state
}

const mapDispatch = (dispatch) => {
  return {
    loggingIn: (code) => dispatch(loggingIn(code))
  }
}

export default connect(mapState, mapDispatch)(SignIn);

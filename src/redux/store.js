import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// //THUNK
export const loggingIn = (code) => {
   
    return async () => {
        try {
          console.log('thunk code', code)
          const response = await axios.post('/login', {code})
          const data = response.data;
          console.log('thunk data', data);
          store.dispatch({type: 'LOGGING_IN', data})
        } catch (error) {
            console.log('thunk error', error);
        }
    }
}

const initialState = {
  accessToken: '',
  refreshToken: '',
  expiresIn: 0,
  loggedIn: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGGING_IN':
    state = {
      accessToken: action.data.accessToken, 
      refreshToken: action.data.refreshToken, 
      expiresIn: action.data.expiresIn,
      loggedIn: true
    }
    console.log('reducer state after action', state);
    return state
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunk));

export default store;

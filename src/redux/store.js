import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// //THUNK
// export const loggingIn = () => {
//     return async () => {
//         try {

//         } catch (error) {

//         }
//     }
// }

const initialState = {
  loggedIn: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunk));

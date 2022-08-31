import axios from "axios";

const LOGGING_IN = "LOGGING_IN";

const initialState = {
  accessToken: "",
  refreshToken: "",
  expiresIn: 0,
  loggedIn: false,
};

export const _LOGGING_IN = (data) => {
  return {
    type: LOGGING_IN,
    data,
  };
};

export const loggingIn = (code) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/login", { code });

      dispatch(_LOGGING_IN(data));
    } catch (error) {
      console.log("thunk error", error);
    }
  };
};

const logInReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGGING_IN:
      return {
        ...state,
        accessToken: action.data.accessToken,
        refreshToken: action.data.refreshToken,
        expiresIn: action.data.expiresIn,
        loggedIn: true,
      };
    default:
      return state;
  }
};

export default logInReducer;

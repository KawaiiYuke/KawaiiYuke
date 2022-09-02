import axios from "axios";

const LOGGING_IN = "LOGGING_IN";
const LOGGING_OUT = "LOGGING_OUT";

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

export const _LOGGING_OUT = () => {
  return {
    type: LOGGING_OUT,
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

export const loggingOut = () => {
  return async (dispatch) => {
    try {
      dispatch(_LOGGING_OUT());
    } catch (error) {
      console.log("thunk error", error);
    }
  };
};

const logInReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGGING_IN:
      window.localStorage.setItem("AccessToken", action.data.accessToken);
      return {
        ...state,
        accessToken: action.data.accessToken,
        refreshToken: action.data.refreshToken,
        expiresIn: action.data.expiresIn,
        loggedIn: true,
      };
    case LOGGING_OUT:
      window.localStorage.clear();
      return {
        ...state,
        accessToken: "",
        refreshToken: "",
        expiresIn: "",
        loggedIn: false,
      };
    default:
      return state;
  }
};

export default logInReducer;

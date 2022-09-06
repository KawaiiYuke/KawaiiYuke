import axios from "axios";

const SET_ROOM_ID = "SET_ROOM_ID";
const CLEAR_ROOM_ID = "CLEAR_ROOM_ID";
const ADD_TRACK = "ADD_TRACK";

const initialState = {
  roomId: "",
  playlist: [],
  currentPlaying: {},
};

export const _SET_ROOM_ID = (roomId) => {
  return {
    type: SET_ROOM_ID,
    roomId,
  };
};

export const _CLEAR_ROOM_ID = (roomId) => {
  return {
    type: CLEAR_ROOM_ID,
    roomId,
  };
};
export const addedTrack = (track) => {
  return {
    type: ADD_TRACK,
    track,
  };
};

export const setReduxRoomId = (roomId) => {
  return async (dispatch) => {
    try {
      dispatch(_SET_ROOM_ID(roomId));
    } catch (error) {
      console.log("thunk error", error);
    }
  };
};

export const clearReduxRoomId = (roomId) => {
  return async (dispatch) => {
    try {
      dispatch(_CLEAR_ROOM_ID(roomId));
    } catch (error) {
      console.log("thunk error", error);
    }
  };
};

export const addTrack = (track) => {
  return async (dispatch) => {
    try {
      //const { data } = await axios.post(`/room/${roomId}`, track);
      dispatch(addedTrack(track));
    } catch (error) {
      console.log("thunk error", error);
    }
  };
};

const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ROOM_ID:
      return {
        ...state,
        roomId: action.roomId,
      };
    case CLEAR_ROOM_ID:
      return {
        ...state,
        roomId: "",
      };
    case ADD_TRACK:
      if (!state.playlist) {
        return {
          ...state,
          playlist: [action.track],
        };
      } else {
        //const newPlaylist = state.playlist.push(action.track)
        return {
          ...state,
          playlist: [...state.playlist, action.track],
        };
      }

    // console.log("state: ", state);
    // console.log("state.playlist: ", state.playlist);
    // if (!state.playlist) {
    //   return {
    //     ...state,
    //     playlist: [action.track],
    //   };
    // } else {
    //   return {
    //     ...state,
    //     playlist: [...state.playlist, action.track],
    //   };
    // }

    default:
      return state;
  }
};

export default roomReducer;

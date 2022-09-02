import axios from "axios";

const SET_ROOM_ID = "SET_ROOM_ID";

const initialState = {
  roomId: "",
};

export const _SET_ROOM_ID = (roomId) => {
  return {
    type: SET_ROOM_ID,
    roomId,
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

const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ROOM_ID:
      return {
        ...state,
        roomId: action.roomId,
      };

    default:
      return state;
  }
};

export default roomReducer;

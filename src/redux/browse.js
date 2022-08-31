import axios from "axios";

const SET_CATEGORIES = "SET_CATEGORIES";

const initialState = {
  categoryList: [],
  singleCategory: "",
  singlePlaylist: [],
  singleTrack: "",
};

export const _setCategoryList = (categories) => {
  return {
    type: SET_CATEGORIES,
    categories,
  };
};

export const setCategoryList = (accessToken) => {
  return async (dispatch) => {
    console.log("accessToken in redux: ", accessToken);
    try {
      const { data } = await axios.get("/category", {
        headers: { Authorization: "Bearer " + accessToken },
      });
      dispatch(_setCategoryList(data));
    } catch (error) {
      console.log("thunk error", error);
    }
  };
};

const BrowseReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return { ...state, categoryList: action.categories };
    default:
      return state;
  }
};

export default BrowseReducer;

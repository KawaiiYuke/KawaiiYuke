import axios from "axios";

const SET_CATEGORIES = "SET_CATEGORIES";
const SET_SINGLE_CATEGORY = "SET_SINGLE_CATEGORY";
const SET_SINGLE_CATEGORY_LIST = "SET_SINGLE_CATEGORY_LIST";

const initialState = {
  categoryList: [],
  singleCategoryId: {},
  singleCategoryLists: [],
  singlePlaylist: [],
  singleTrack: "",
};

export const _setCategoryList = (categories) => {
  return {
    type: SET_CATEGORIES,
    categories,
  };
};

export const _setSingleCategory = (category) => {
  return {
    type: SET_SINGLE_CATEGORY,
    category,
  };
};

export const _setSingleCategoryList = (category) => {
  return {
    type: SET_SINGLE_CATEGORY_LIST,
    category,
  };
};

export const setCategoryList = (accessToken) => {
  return async (dispatch) => {
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

export const setSingleCategory = (categoryId, categoryName) => {
  return async (dispatch) => {
    try {
      dispatch(_setSingleCategory({ categoryId, categoryName }));
    } catch (error) {
      console.log("thunk error", error);
    }
  };
};

export const setSingleCategoryList = (accessToken, categoryId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/category/${categoryId}`, {
        headers: { Authorization: "Bearer " + accessToken },
      });
      dispatch(_setSingleCategoryList(data));
    } catch (error) {
      console.log("thunk error", error);
    }
  };
};
const BrowseReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return { ...state, categoryList: action.categories };
    case SET_SINGLE_CATEGORY:
      return { ...state, singleCategoryId: action.category };
    case SET_SINGLE_CATEGORY_LIST:
      return { ...state, singleCategoryLists: action.category };
    default:
      return state;
  }
};

export default BrowseReducer;

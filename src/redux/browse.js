import axios from "axios";

const SET_CATEGORIES = "SET_CATEGORIES";
const SET_SINGLE_CATEGORY = "SET_SINGLE_CATEGORY";
const SET_SINGLE_CATEGORY_LIST = "SET_SINGLE_CATEGORY_LIST";
const SET_SINGLE_PLAYLIST_INFO = "SET_SINGLE_PLAYLIST_INFO";
const SET_SINGLE_PLAYLIST_TRACKS = "SET_SINGLE_PLAYLIST_TRACKS";
const SET_SINGLE_TRACK = "SET_SINGLE_TRACK";
const SET_LYRICS = "SET_LYRICS";

const initialState = {
  categoryList: [],
  singleCategoryId: {},
  singleCategoryLists: [],
  singlePlaylistId: {},
  singlePlaylistTracks: [],
  singleTrackInfo: {},
  lyrics: {},
};

export const _setCategoryList = (categories) => {
  return {
    type: SET_CATEGORIES,
    categories,
  };
};

export const _setSingleCategory = (categoryInfo) => {
  return {
    type: SET_SINGLE_CATEGORY,
    categoryInfo,
  };
};

export const _setSingleCategoryList = (category) => {
  return {
    type: SET_SINGLE_CATEGORY_LIST,
    category,
  };
};

export const _setSinglePlaylistInfo = (playlistInfo) => {
  return {
    type: SET_SINGLE_PLAYLIST_INFO,
    playlistInfo,
  };
};

export const _setSinglePlaylist = (playlist) => {
  return {
    type: SET_SINGLE_PLAYLIST_TRACKS,
    playlist,
  };
};

export const _setTrack = (track) => {
  return {
    type: SET_SINGLE_TRACK,
    track,
  };
};

export const _setLyrics = (trackInfo) => {
  return {
    type: SET_CATEGORIES,
    trackInfo,
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

export const setSinglePlaylistInfo = (playlistId, playlistName) => {
  return async (dispatch) => {
    try {
      dispatch(_setSinglePlaylistInfo({ playlistId, playlistName }));
    } catch (error) {
      console.log("thunk error", error);
    }
  };
};

export const setSinglePlaylist = (accessToken, playlistId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/playlists/${playlistId}`, {
        headers: { Authorization: "Bearer " + accessToken },
      });
      dispatch(_setSinglePlaylist(data));
    } catch (error) {
      console.log("thunk error", error);
    }
  };
};

export const setTrack = (accessToken, trackId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/track/${trackId}`, {
        headers: { Authorization: "Bearer " + accessToken },
      });
      dispatch(_setTrack(data));
    } catch (error) {
      console.log("thunk error", error);
    }
  };
};

export const setLyrics = (trackName, artist) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/lyrics`, {
        track: trackName,
        artist: artist,
      });
      dispatch(_setLyrics(data));
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
      return { ...state, singleCategoryId: action.categoryInfo };
    case SET_SINGLE_CATEGORY_LIST:
      return { ...state, singleCategoryLists: action.category };
    case SET_SINGLE_PLAYLIST_INFO:
      return { ...state, singlePlaylistId: action.playlistInfo };
    case SET_SINGLE_PLAYLIST_TRACKS:
      return { ...state, singlePlaylistTracks: action.playlist };
    case SET_SINGLE_TRACK:
      return { ...state, singleTrackInfo: action.track };
    case SET_LYRICS:
      return { ...state, lyrics: action.track };

    default:
      return state;
  }
};

export default BrowseReducer;

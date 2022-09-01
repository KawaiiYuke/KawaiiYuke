import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./css/SingleCategoryViewButton.css";
import { useSelector, useDispatch } from "react-redux";
import { setSingleCategoryList, setSinglePlaylistInfo } from "../redux/browse";
import { loggingIn } from "../redux/logIn";

function SingleCategoryView() {
  const logInState = useSelector((state) => state.logIn);
  const categoryId = useSelector((state) => state.browse.singleCategoryId);
  const dispatch = useDispatch();
  let accessToken = logInState?.accessToken;
  const singleCategoryState = useSelector(
    (state) => state.browse.singleCategoryLists
  );

  useEffect(() => {
    dispatch(setSingleCategoryList(accessToken, categoryId.categoryId));
  }, []);

  if (!accessToken) {
    let codeFromLocalStorage = window.localStorage.getItem("code");
    if (codeFromLocalStorage) {
      dispatch(loggingIn(codeFromLocalStorage));
    }
  }

  return (
    <div style={{ color: "white", paddingRight: "17rem" }}>
      <h1>{categoryId.categoryName}</h1>
      <div className="d-flex justify-content-center">
        <Link
          to="/explore"
          style={{ textDecoration: "none", paddingBottom: ".7rem" }}
        >
          <button
            className="button-return-categories"
            style={{ fontSize: ".9rem" }}
          >
            Return to All Categories
          </button>
        </Link>
      </div>
      <div className="container">
        <div className="row align-items-center">
          {singleCategoryState.map((playlist) => {
            return (
              <div
                key={playlist.id}
                className="col-sm-3"
                onClick={() =>
                  dispatch(setSinglePlaylistInfo(playlist.id, playlist.name))
                }
              >
                <Link
                  to={`/playlists/${playlist.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <img
                    src={playlist.images[0].url}
                    alt="cover"
                    className="img-fluid mb-3"
                    style={{ borderRadius: "4rem" }}
                  />
                  <h2 style={{ color: "white" }}>{playlist.name}</h2>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SingleCategoryView;

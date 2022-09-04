import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./css/SingleCategoryViewButton.css";
import { useSelector, useDispatch } from "react-redux";
import { setSingleCategoryList, setSinglePlaylistInfo } from "../redux/browse";

function SingleCategoryView() {
  const logInState = useSelector((state) => state.logIn);
  const categoryId = useSelector((state) => state.browse.singleCategoryId);
  const dispatch = useDispatch();
  let accessToken = logInState?.accessToken;
  const singleCategoryState = useSelector(
    (state) => state.browse.singleCategoryLists
  );
  console.log(singleCategoryState);
  useEffect(() => {
    dispatch(setSingleCategoryList(accessToken, categoryId.categoryId));
  }, []);

  if (singleCategoryState[0].id) {
    return (
      <div style={{ paddingLeft: "9em" }}>
        <div style={{ color: "white" }}>
          <h1 style={{ paddingTop: "1em", textShadow: "2px 4px black" }}>
            {categoryId.categoryName}
          </h1>
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
                      dispatch(
                        setSinglePlaylistInfo(playlist.id, playlist.name)
                      )
                    }
                    style={{ padding: "2em" }}
                  >
                    <Link
                      to={`/playlists/${playlist.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <img
                        src={playlist.images[0].url}
                        alt="cover"
                        className="img-fluid mb-3"
                        style={{
                          borderRadius: "4rem",
                          boxShadow: "25px 24px 30px black",
                        }}
                      />
                      <h2
                        style={{
                          color: "white",
                          textShadow: "2px 4px black",
                          fontSize: "25px",
                        }}
                      >
                        {playlist.name}
                      </h2>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleCategoryView;

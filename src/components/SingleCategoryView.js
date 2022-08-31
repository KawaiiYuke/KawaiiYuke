import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import "./css/SingleCategoryViewButton.css";

import { useSelector, useDispatch } from "react-redux";
import { setSingleCategoryList } from "../redux/browse";

function SingleCategoryView() {
  const logInState = useSelector((state) => state.logIn);
  const categoryId = useSelector((state) => state.browse.singleCategoryId);
  const dispatch = useDispatch();
  const accessToken = logInState?.accessToken;
  const singleCategoryState = useSelector(
    (state) => state.browse.singleCategoryLists
  );

  useEffect(() => {
    dispatch(setSingleCategoryList(accessToken, categoryId.categoryId));
  }, []);

  return (
    <div>
      <Link to="/explore" style={{ textDecoration: "none" }}>
        <button className="button-return-categories">
          Return to All Categories
        </button>
      </Link>
      <h1>{categoryId.categoryName}</h1>
      <div className="container">
        <div className="row align-items-center">
          {singleCategoryState.map((playlist) => {
            return (
              <div key={playlist.id} className="col-sm-3">
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
                  <h2>{playlist.name}</h2>
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

import React, { useEffect } from "react";
import { Link } from "react-router-dom";

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
      <h1>{categoryId.categoryName}</h1>
      {singleCategoryState.map((playlist) => {
        return (
          <div key={playlist.id}>
            <Link to={`/playlists/${playlist.id}`}>
              <img src={playlist.images[0].url} alt="cover" />
              <h2>{playlist.name}</h2>
            </Link>
          </div>
        );
      })}
      <Link to="/explore">
        <button> Return to All Categories</button>
      </Link>
    </div>
  );
}

export default SingleCategoryView;

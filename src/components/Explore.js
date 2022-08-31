import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryList } from "../redux/browse";
import { setSingleCategory } from "../redux/browse";

const Explore = () => {
  const logInState = useSelector((state) => state.logIn);
  const categoryState = useSelector((state) => state.browse.categoryList);
  const dispatch = useDispatch();
  const accessToken = logInState?.accessToken;

  useEffect(() => {
    dispatch(setCategoryList(accessToken));
  }, []);

  return (
    <div>
      <h1>Welcome to KAWAIIYUKE! </h1>
      <div>
        {categoryState?.map((category) => {
          return (
            <div
              key={category.id}
              onClick={() =>
                dispatch(setSingleCategory(category.id, category.name))
              }
            >
              <Link to={`/category/${category.id}`}>
                <img src={category.icons[0].url} alt="icon" />
                <h3>{category.name}</h3>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Explore;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryList } from "../redux/browse";

const Explore = () => {
  const logInState = useSelector((state) => state.logIn);
  const categoryState = useSelector((state) => state.browse.categoryList);
  const dispatch = useDispatch();
  const accessToken = logInState?.accessToken;

  console.log("categoryState:", categoryState);

  //const [categoryList, setCategoryList] = useState([]);
  //const [category, setCategory] = useState("");
  useEffect(() => {
    console.log("accessToken in UE", accessToken);
    dispatch(setCategoryList(accessToken));
    // axios
    //   .get("/category", {
    //     params: {
    //       accessToken,
    //     },
    //   })
    //   .then((categoryResponse) => {
    //     setCategoryList(categoryResponse.data.categories.items);
    //   });
  }, [categoryState]);
  console.log("categoryState:", categoryState);

  return (
    <div>
      <h1>Welcome to KAWAIIYUKE! </h1>
      <div>
        {categoryState.map((category, index) => {
          return (
            // <div key={index} onClick={() => setCategory(category.id)}>
            //<div key={category.id} onClick={() => setCategory(category.id)}>
            <div key={category.id}>
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

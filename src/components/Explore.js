import React, { useState, useEffect } from "react";
import useAuth from "./useAuth";
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryList } from "../redux/browse";
import { setSingleCategory } from "../redux/browse";

const Explore = () => {
  const logInState = useSelector((state) => state.logIn);
  const categoryState = useSelector((state) => state.browse.categoryList);
  const dispatch = useDispatch();
  let accessToken = logInState?.accessToken;

  useEffect(() => {
    dispatch(setCategoryList(accessToken));
  }, []);

  if (!accessToken) {
    const accessTokenFromLocalStorage =
      window.localStorage.getItem("AccessToken");
    if (accessTokenFromLocalStorage) {
      accessToken = accessTokenFromLocalStorage;
    }
  }

  return (
    <div>
      <h1>Welcome to KAWAIIYUKE! </h1>
      <div className="container">
        <div className="row align-items-center">
          {categoryState?.map((category) => {
            return (
              <div
                className="col-sm-3"
                key={category.id}
                onClick={() =>
                  dispatch(setSingleCategory(category.id, category.name))
                }
              >
                <Link
                  to={`/category/${category.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <img
                    src={category.icons[0].url}
                    alt="icon"
                    className="img-fluid mb-3"
                    style={{ borderRadius: "12rem" }}
                  />
                  <h3>{category.name}</h3>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Explore;

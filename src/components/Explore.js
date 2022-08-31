import React, { useState, useEffect } from "react";
import useAuth from "./useAuth";
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
});

const Explore = (props) => {
  const accessToken = props?.accessToken;
  const [categoryList, setCategoryList] = useState([]);
  const [category, setCategory] = useState("");
  useEffect(() => {
    axios("https://api.spotify.com/v1/browse/categories?limit=50", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    }).then((categoryResponse) => {
      setCategoryList(categoryResponse.data.categories.items);
    });
  });

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3001/category", {
  //       accessToken,
  //     })
  //     .then((res) => {
  //       setCategoryList(res.data);
  //     });
  // });
  return (
    <div>
      <h1>Welcome to KAWAIIYUKE! </h1>
      <div className="container">
        <div className="row align-items-center">
          {categoryList.map((category, index) => {
            return (
              // <div key={index} onClick={() => setCategory(category.id)}>
              <div
                className="col-sm-3"
                key={category.id}
                onClick={() => setCategory(category.id)}
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

const mapState = (state) => {
  return state;
};

export default connect(mapState)(Explore);

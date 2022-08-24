import React, { useState, useEffect } from "react";
import useAuth from "./useAuth";
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
});

const Explore = ({ code }) => {
  const accessToken = useAuth(code);
  const [categoryList, setCategoryList] = useState([]);
  console.log("categoryList: ", categoryList);

  useEffect(() => {
    axios("https://api.spotify.com/v1/browse/categories?locale=sv_US", {
      method: "GET",
      headers: { Authorization: "Bearer " + accessToken },
    }).then((genreResponse) => {
      setCategoryList(genreResponse.data.categories.items);
    });
  });

  return (
    <div>
      <h1>This is explore page</h1>
      <div>
        {categoryList.map((category, index) => {
          return (
            <div key={index}>
              <img src={category.icons[0].url} alt="icon" />
              <h3>{category.name}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Explore;

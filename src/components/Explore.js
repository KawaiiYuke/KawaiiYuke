import React, { useState, useEffect } from "react";
import useAuth from "./useAuth";
//import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";
import { Link } from "react-router-dom";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
});

const Explore = ({ code }) => {
  const accessToken = useAuth(code);
  const [categoryList, setCategoryList] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    axios("https://api.spotify.com/v1/browse/categories?limit=50", {
      method: "GET",
      // headers: {
      //   Authorization: "Bearer " + accessToken,
      // },
      headers: {
        Authorization:
          "Bearer " +
          "BQA0vRBjPcTJmJl-Kj3JkBZzpUW9JDNtVcYJFYsOwBIb0dC-97HuqsS1Eaf-cQZ8LhmtVI6sdplgOuM20H47yxp_SIK5bCyWlx8ce0JmOaIXqSLnPUHOUjoP8gKIBOaNkmL5W-lfj8wVLgoKrh0upMEN4hSZpsTLPwoA1eFHEecRGWSjRYcpBVbiH03FhLkWrdeP26Q",
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
      <div>
        {categoryList.map((category, index) => {
          return (
            // <div key={index} onClick={() => setCategory(category.id)}>
            <div key={category.id} onClick={() => setCategory(category.id)}>
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

import React, { useState, useEffect } from "react";
import useAuth from "./useAuth";
//import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
});

export default function SingleCategoryView({ code }) {
  const accessToken = useAuth(code);
  //const [category, setCategory] = useState("");
  const categoryId = "toplists";
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    axios(
      `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists`,
      {
        method: "GET",
        //headers: { Authorization: "Bearer " + accessToken },
        headers: {
          Authorization:
            "Bearer " +
            "BQA0vRBjPcTJmJl-Kj3JkBZzpUW9JDNtVcYJFYsOwBIb0dC-97HuqsS1Eaf-cQZ8LhmtVI6sdplgOuM20H47yxp_SIK5bCyWlx8ce0JmOaIXqSLnPUHOUjoP8gKIBOaNkmL5W-lfj8wVLgoKrh0upMEN4hSZpsTLPwoA1eFHEecRGWSjRYcpBVbiH03FhLkWrdeP26Q",
        },
      }
    ).then((playlistsResponse) => {
      setPlaylists(playlistsResponse.data.playlists.items);
    });
  });
  return (
    <div>
      single category page
      {playlists.map((playlist) => {
        return (
          <div key={playlist.id}>
            <img src={playlist.images[0].url} alt="cover" />
            <h2>{playlist.name}</h2>
          </div>
        );
      })}
    </div>
  );
}

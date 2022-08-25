import React, { useState, useEffect } from "react";
import useAuth from "./useAuth";
//import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";
import { Link } from "react-router-dom";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
});

export default function SinglePlaylistView({ code }) {
  const accessToken = useAuth(code);
  const playlistId = window.location.pathname.split("/").slice(-1)[0];
  const [playlist, setPlaylist] = useState([]);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    axios(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: "GET",
      //headers: { Authorization: "Bearer " + accessToken },
      headers: {
        Authorization:
          "Bearer " +
          "BQBNl2HGIoK1kAGbBEE-VRkLOkS2074xVceWjlm26YOAZFi-gxcuZ4Dzv51AV21u3lEBZJd9VzRaDUcTrtgAJHeG5PBf0ZKGi7M_VFUXxAEW9qxLdUdUCikhmAkjvdcCqyiUvlOVTx0_zZ4rnvNuYWl6qvT28Nuocyuh8KadEfem0QH3VE1iBCQvcXbjtksH55iHYbI",
      },
    }).then((playlistResponse) => {
      console.log(
        "playlistResponse",
        playlistResponse.data.items[0].track.album.images[2]
      );
      setTracks(playlistResponse.data.items);
    });
  });

  //   function smallesetAlbumImage(imageArray) {
  //     return imageArray.reduce((smallest, image) => {
  //       if (image.height < smallest.height) return image;
  //       return smallest;
  //     }, imageArray[0]);
  //   }

  return (
    <div>
      single playlist view:
      {tracks.map((track, index) => {
        return (
          <div key={index}>
            <h3>{track.track.name}</h3>
            <h4>artist: {track.track.artists[0].name}</h4>
            <h4>album: {track.track.album.name}</h4>
            <img src={track.track.album.images[2].url} alt="album" />
          </div>
        );
      })}
    </div>
  );
}

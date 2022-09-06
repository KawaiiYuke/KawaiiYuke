import React, { useState, useEffect } from "react";
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import TrackSearchResult from "./TrackSearchResult";
import Player from "./Player";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_CLIENT_ID,
});

const Home = () => {
  const logInState = useSelector((state) => state.logIn);
  const reduxRoomId = useSelector((state) => state.room.roomId);
  const accessToken = logInState?.accessToken;

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [lyrics, setLyrics] = useState("");

  function chooseTrack(track) {
    setPlayingTrack(track);
    setSearch("");
    setLyrics("");
  }

  useEffect(() => {
    if (!playingTrack) return;
    axios
      .get("/lyrics", {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist,
        },
      })
      .then((res) => {
        setLyrics(res.data.lyrics);
      });
  }, [playingTrack]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;
    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );
          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
            id: track.id,
          };
        })
      );
    });

    return () => (cancel = true);
  }, [search, accessToken]);

  return (
    <div className="search-track">
      <div style={{ height: "100vh" }}>
        <Container
          className="d-flex flex-column py-2"
          style={{ height: "90vh", width: "40rem", marginTop: "4em" }}
        >
          <Form.Control
            type="search"
            placeholder="Search Songs/Artists"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
            {searchResults.map((track, index) => (
              <div className="search-track-info" key={index}>
                <TrackSearchResult
                  track={track}
                  key={track.uri}
                  chooseTrack={chooseTrack}
                />
              </div>
            ))}

            {searchResults.length === 0 && (
              <div
                className="text-center d-flex"
                style={{
                  whiteSpace: "pre",
                  fontWeight: "bold",
                  color: "#ffffff",
                  backgroundColor: "hsla(0, 100%, 90%, 0.3)",
                  fontFamily: "Monaco",
                }}
              >
                {lyrics}
              </div>
            )}
          </div>

          {reduxRoomId ? (
            ""
          ) : (
            <div>
              <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
            </div>
          )}
        </Container>
      </div>
    </div>
  );
};

export default Home;

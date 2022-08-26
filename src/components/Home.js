import React, { useState, useEffect } from 'react';
import useAuth from './useAuth';
import { Container, Form } from 'react-bootstrap';
import SpotifyWebApi from 'spotify-web-api-node';
import TrackSearchResult from './TrackSearchResult';
import Player from './Player';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
});

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get('code');
  const accessToken = useAuth(code);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [lyrics, setLyrics] = useState('');

  function chooseTrack(track) {
    setPlayingTrack(track);
    setSearch('');
    setLyrics('');
  }

  useEffect(() => {
    if (!playingTrack) return;
    axios
      .get('http://localhost:3001/lyrics', {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist,
        },
      })
      .then((res) => {
        setLyrics(res.data.lyrics);
      });
  }, [playingTrack]);

  // useEffect(() => {
  //   axios(
  //     `https://spclient.wg.spotify.com/color-lyrics/v2/track/${playingTrack?.id}`,
  //     {
  //       method: "GET",
  //       // headers: {
  //       //   Authorization: "Bearer " + accessToken,
  //       // },
  //       headers: {
  //         Authorization:
  //           "Bearer " +
  //           "BQDGeOjFL7ulZYZobeVdJXB2WupxXQmHqUw41hIJ3TKamiyTudjLhx6YUq4ddXzklycKsyZADxarF5Qv6YDkT89MR_Cz10-RaL3XCVB644JNfn6hKpng6jOksznPrPsXVXePD7aw_8OP3ERnwLMPLKqoMJb5J_DXhBeiZgpbG0RGbj14cnfqEXSGYrtasUmzx6CaGt4",
  //       },
  //     }
  //   ).then((lyricsResponse) => {
  //     console.log("lyricsResponse: " + lyricsResponse);
  //     //setLyrics(lyricsResponse);
  //   });
  // });

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
    <Container
      className="d-flex flex-column py-2"
      style={{ height: '90vh', width: '50rem', paddingLeft: '15rem' }}
    >
      <Form.Control
        type="search"
        placeholder="Search Songs/Artists"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="flex-grow-1 my-2" style={{ overflowY: 'auto' }}>
        {searchResults.map((track) => (
          <>
            <TrackSearchResult
              track={track}
              key={track.uri}
              chooseTrack={chooseTrack}
            />
            <button>Add to Playlist</button>
          </>
        ))}

        {searchResults.length === 0 && (
          <div className="text-center" style={{ whiteSpace: 'pre' }}>
            {lyrics}
          </div>
        )}
      </div>

      <div>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
    </Container>
  );
};

export default Home;

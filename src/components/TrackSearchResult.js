import React from 'react';
import './css/TrackSearch.css';

export default function TrackSearchResult({ track, chooseTrack }) {
  function handlePlay() {
    chooseTrack(track);
  }
  return (
    <div
      className="d-flex m-1 justify-content-evenly TrackSearch container"
      style={{
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        border: 'solid',
        borderColor: 'white',
      }}
      onClick={handlePlay}
    >
      <div style={{ fontWeight: 'bold', color: 'white' }}>
        {track.title} By {track.artist}
        <img
          src={track.albumUrl}
          style={{ height: '64px', width: '64px', marginTop: '.7em' }}
          alt="album"
        />
        <button className="AddToPlaylist">Add to Playlist</button>
      </div>
    </div>
  );
}

import React from 'react';

export default function TrackSearchResult({ track, chooseTrack }) {
  function handlePlay() {
    chooseTrack(track);
  }
  return (
    <div
      className="d-flex m-2 align-items-center"
      style={{
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        border: 'solid',
        borderColor: '#C287E8',
      }}
      onClick={handlePlay}
    >
      <img
        src={track.albumUrl}
        style={{ height: '64px', width: '64px', marginTop: '.7em' }}
        alt="album"
      />
      <div style={{ fontWeight: 'bold', color: '#C287E8' }}>
        <div>
          {track.title} By {track.artist}
        </div>
        <button>Add to Playlist</button>
      </div>
    </div>
  );
}

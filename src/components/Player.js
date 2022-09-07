import React, { useEffect, useState } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import { useSelector } from 'react-redux';
import { db } from './VideoTest';
import { doc, getDoc } from 'firebase/firestore';

export default function Player({ accessToken, trackUri }) {
  const [play, setPlay] = useState(false);

  const reduxRoomId = useSelector((state) => state.room.roomId);
  const reduxPlaylist = useSelector((state) => state.room.playlist);
  useEffect(() => setPlay(true), [trackUri]);
  const [playlist, setPlaylist] = useState([]);
  useEffect(() => {
    async function callPlaylist(reduxRoomId) {
      const docRef = doc(db, 'RoomPlaylist', reduxRoomId);
      const getdocSnap = await getDoc(docRef);

      if (getdocSnap.exists()) {
        const res = getdocSnap.data();
        if (res) setPlaylist(res.playlist.map((track) => track.uri));
      }
    }
    callPlaylist(reduxRoomId);
  }, [reduxPlaylist]);

  if (!accessToken) return null;

  return (
    <div>
      {reduxRoomId ? (
        <SpotifyPlayer
          token={accessToken}
          showSaveIcon
          callback={(state) => {
            if (!state.isPlaying) setPlay(false);
          }}
          play={play}
          uris={playlist.length > 0 ? playlist : []}
        />
      ) : (
        <SpotifyPlayer
          token={accessToken}
          showSaveIcon
          callback={(state) => {
            if (!state.isPlaying) setPlay(false);
          }}
          play={play}
          uris={trackUri ? [trackUri] : []}
        />
      )}
    </div>
  );
}

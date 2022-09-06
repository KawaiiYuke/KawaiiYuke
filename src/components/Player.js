import React, { useEffect, useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { useSelector, useDispatch } from "react-redux";
import app, { db } from "./VideoTest";
import { doc, getDoc, onSnapshot } from "firebase/firestore";

export default function Player({ accessToken, trackUri }) {
  const [play, setPlay] = useState(false);

  const reduxRoomId = useSelector((state) => state.room.roomId);
  const reduxPlaylist = useSelector((state) => state.room.playlist);
  useEffect(() => setPlay(true), [trackUri]);
  const [playlist, setPlaylist] = useState([]);
  // console.log("playlist in player", playlist);
  useEffect(() => {
    async function callPlaylist(reduxRoomId) {
      const docRef = doc(db, "RoomPlaylist", reduxRoomId);
      const getdocSnap = await getDoc(docRef);

      if (getdocSnap.exists()) {
        const res = getdocSnap.data();
        if (res) setPlaylist(res.playlist.map((track) => track.uri));
      }
      //below is to get all room playlists
      // const q = query(collection(db, "RoomPlaylist"));
      // const querySnapshot = await getDocs(q);
      // const queryAllRoomPlaylistData = querySnapshot.docs.map((detail) => ({
      //   ...detail.data(),
      //   id: detail.id,
      // }));
      // console.log("queryData", queryAllRoomPlaylistData);
    }
    callPlaylist(reduxRoomId);
  }, [reduxPlaylist]);

  // useEffect(() => {
  //   const unsub = onSnapshot(doc(db, "RoomPlaylist", reduxRoomId), (doc) => {
  //     setPlaylist(doc.data().playlist);
  //   });
  //   return unsub;
  // }, [reduxRoomId]);

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

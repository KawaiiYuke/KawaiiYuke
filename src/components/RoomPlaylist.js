import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import app, { db } from "./VideoTest";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  onSnapshot,
  getDoc,
  query,
  getDocs,
  where,
} from "firebase/firestore";

export default function RoomPlaylist() {
  //const reduxRoomId = useSelector((state) => state.room.roomId);
  const reduxRoomId = "nUKL4DB1CTaewbPlA6cB";
  console.log("reduxRoomId", reduxRoomId);

  const [playlist, setPlaylist] = useState([]);
  console.log("playlist", playlist);
  useEffect(() => {
    async function callPlaylist(reduxRoomId) {
      const docRef = doc(db, "RoomPlaylist", reduxRoomId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        //console.log("Document data:", docSnap.data().playlist);
        setPlaylist(docSnap.data().playlist);
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
  }, []);

  return (
    <div>
      <h1>this is Playlist for room: nUKL4DB1CTaewbPlA6cB</h1>
      <ol>
        {playlist.map((track, index) => {
          return <li key={index}>{track}</li>;
        })}
      </ol>
    </div>
  );
  //<div>this is Playlist for room: {reduxRoomId ? reduxRoomId : 0}</div>;
}

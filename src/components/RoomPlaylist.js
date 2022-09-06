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
  getDoc,
  deleteField,
  onSnapshot,
} from "firebase/firestore";

export default function RoomPlaylist() {
  const reduxRoomId = useSelector((state) => state.room.roomId);
  //const reduxRoomId = "ZkbPky8S0YWyGlWHgn0d";
  const reduxPlaylist = useSelector((state) => state.room.playlist);
  const [playlist, setPlaylist] = useState([]);
  //console.log("playlist", playlist);
  // const docRef = doc(db, "RoomPlaylist", reduxRoomId);
  // //const docSnap = onSnapshot(docRef);
  // const unsub = onSnapshot(doc(db, "RoomPlaylist", reduxRoomId), (doc) => {
  //   //console.log("Current data: ", doc.data());
  //   setPlaylist(doc.data().playlist);
  // });

  useEffect(() => {
    async function callPlaylist(reduxRoomId) {
      const docRef = doc(db, "RoomPlaylist", reduxRoomId);
      const getdocSnap = await getDoc(docRef);
      if (getdocSnap.exists()) {
        setPlaylist(getdocSnap.data().playlist);
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

  // async function handleDelete(index, trackId) {
  //   const playlistRef = doc(db, "RoomPlaylist", reduxRoomId);

  //   // Remove the 'capital' field from the document
  //   await updateDoc(playlistRef, { ...playlistRef, index: deleteField() });
  // }

  return (
    <div>
      <div>
        {reduxRoomId ? (
          <div>
            <h1>This is Playlist for room: {reduxRoomId}</h1>
            <div style={{ paddingTop: "1em" }}>
              <table
                style={{
                  background: "hsla(0, 100%, 90%, 0.3)",
                }}
              >
                <thead>
                  <tr style={{ fontSize: "15px" }}>
                    <th>#</th>
                    <th style={{ textAlign: "start", paddingLeft: "1em" }}>
                      Track
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {playlist.map((track, index) => {
                    return (
                      <tr
                        key={index}
                        // onClick={() =>
                        //   dispatch(setTrack(accessToken, track.track.id))
                        // }
                      >
                        <td>{index + 1}</td>

                        <td style={{ textAlign: "left" }}>{track.title}</td>

                        {/* <td>
                          <button
                            className="playButton"
                            // onClick={() => handleDelete(index, track.id)}
                          >
                            Delete
                          </button>
                        </td> */}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <h1>Please join a room.</h1>
        )}
      </div>
    </div>
  );
}

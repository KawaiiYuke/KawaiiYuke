import React from "react";
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
} from "firebase/firestore";

export default async function RoomPlaylist() {
  const reduxRoomId = useSelector((state) => state.room.roomId);

  const snap = await getDoc(doc(db, "RoomPlaylist", reduxRoomId));
  console.log("snap", snap);
  // querySnapshot.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   console.log(doc.id, " => ", doc.data());
  // });
  // const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //   const cities = [];
  //   querySnapshot.forEach((doc) => {
  //     cities.push(doc.data().name);
  //   });
  //   console.log("Current cities in CA: ", cities.join(", "));
  // });

  return <div>this is Playlist for room: {reduxRoomId ? reduxRoomId : 0}</div>;
}

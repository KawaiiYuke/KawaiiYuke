import React from "react";
import { useSelector, useDispatch } from "react-redux";

export default function RoomPlaylist() {
  const reduxRoomId = useSelector((state) => state.room.roomId);

  return <div>this is Playlist for room: {reduxRoomId}</div>;
}

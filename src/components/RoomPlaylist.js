import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { db } from './VideoTest';
import { doc, getDoc } from 'firebase/firestore';

export default function RoomPlaylist() {
  const reduxRoomId = useSelector((state) => state.room.roomId);
  const reduxPlaylist = useSelector((state) => state.room.playlist);
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    async function callPlaylist(reduxRoomId) {
      const docRef = doc(db, 'RoomPlaylist', reduxRoomId);
      const getdocSnap = await getDoc(docRef);
      if (getdocSnap.exists()) {
        const res = getdocSnap.data();
        if (res) setPlaylist(res.playlist);
      }
    }
    callPlaylist(reduxRoomId);
  }, [reduxPlaylist]);

  return (
    <div style={{ height: '100%', width: '50%' }}>
      <div>
        {reduxRoomId ? (
          <div>
            <h1>Room Playlist:</h1>
            <div style={{ paddingTop: '1em' }}>
              <table
                style={{
                  background: 'hsla(0, 100%, 90%, 0.3)',
                }}
              >
                <thead>
                  <tr style={{ fontSize: '15px' }}>
                    <th>#</th>
                    <th style={{ textAlign: 'start', paddingLeft: '1em' }}>
                      Track
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {playlist.map((track, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>

                        <td style={{ textAlign: 'left' }}>{track.title}</td>
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

import React, { useState, useEffect } from "react";
import "./css/VideoTest.css";
import { useWebRTCFirebase } from "usewebrtc";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { setReduxRoomId, clearReduxRoomId } from "../redux/roomPlaylist";
import "firebase/compat/firestore";
import vback from "../images/vback.gif";

const participantId = uuid();

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Initialize WebRTC
const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

new RTCPeerConnection(servers);

function VideoTest() {
  const [joinedRoom, setJoinedRoom] = useState(false);
  useSelector((state) => state.room.roomId);
  const dispatch = useDispatch();
  const {
    localStream,
    participants,
    shareScreen,
    createRoom,
    joinRoom,
    leaveRoom,
    roomId,
    setRoomId,
  } = useWebRTCFirebase({ db, participantId });

  useEffect(() => {
    if (!roomId) {
      setJoinedRoom(false);
    }
  }, [roomId]);

  useEffect(() => {
    if (roomId) {
      dispatch(setReduxRoomId(roomId));
      setDoc(doc(db, "RoomPlaylist", roomId), {
        playlist: [],
      });
    }
  }, [roomId]);

  return (
    <div className="VideoTest">
      <div className="videoBox">
        <div className="bigVideo">
          <video
            ref={(element) => {
              if (element) {
                element.srcObject = localStream;
              }
            }}
            autoPlay
            playsInline
            className="local"
            muted
            poster={vback}
          />
        </div>
        <div className="sm_video">
          {participants.map(({ id, stream }) => {
            return (
              <div
                key={id}
                onClick={(e) => {
                  if (e.currentTarget.className.indexOf("activeVideo") !== -1) {
                    e.currentTarget.classList.remove("activeVideo");
                  } else {
                    e.currentTarget.classList.add("activeVideo");
                  }
                }}
              >
                <p className="idTitle">🎶🎶🎶</p>
                <video
                  ref={(element) => {
                    if (element) {
                      element.srcObject = stream;
                    }
                  }}
                  key={id}
                  autoPlay
                  playsInline
                  className="remote"
                  poster={vback}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="answer box">
        {!joinedRoom && (
          <input
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="Join with code"
          />
        )}
        <div>
          <button
            onClick={async () => {
              try {
                await joinRoom();
                setJoinedRoom(true);
              } catch (e) {
                console.error(e);
                alert(e.message);
              }
            }}
          >
            JOIN ROOM
          </button>
          {!roomId && (
            <>
              <button
                onClick={async () => {
                  try {
                    await createRoom();
                    setJoinedRoom(true);
                  } catch (e) {
                    alert("Failed to create room,", e.message);
                  }
                }}
              >
                CREATE ROOM
              </button>
            </>
          )}
        </div>
      </div>
      {roomId && (
        <>
          <div className="buttonBtn">
            <p className="room_id">Room Joining Code: {roomId}</p>
            <button
              onClick={() => {
                navigator.clipboard.writeText(roomId);
              }}
            >
              Copy Joining Code
            </button>

            <button
              onClick={async () => {
                shareScreen();
              }}
            >
              Share Screen
            </button>
            <button
              onClick={() => {
                leaveRoom();
                dispatch(clearReduxRoomId(roomId));
              }}
            >
              Leave Room{" "}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default VideoTest;

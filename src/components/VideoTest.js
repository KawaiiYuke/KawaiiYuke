import React, { useState, useEffect } from "react";
import "./css/VideoTest.css";
import { useWebRTCFirebase } from "usewebrtc";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { setReduxRoomId } from "../redux/roomPlaylist";

import "firebase/compat/firestore";
import { ReactComponent as HangupIcon } from "../icons/hangup.svg";
import { ReactComponent as MoreIcon } from "../icons/more-vertical.svg";
import { ReactComponent as CopyIcon } from "../icons/copy.svg";
import icon from "../images/icon-no-bg.png";
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

// firebase.initializeApp(firebaseConfig);

// const firestore = firebase.firestore();
export const db = getFirestore(initializeApp(firebaseConfig));

// Initialize WebRTC
const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

const pc = new RTCPeerConnection(servers);

function VideoTest() {
  const [joinedRoom, setJoinedRoom] = useState(false);
  const reduxRoomId = useSelector((state) => state.room.roomId);
  const dispatch = useDispatch();
  /* eslint-disable no-unused-vars */
  const {
    localStream,
    participants,
    shareScreen,
    endScreenShare,
    createRoom,
    joinRoom,
    leaveRoom,
    roomId,
    setRoomId,
  } = useWebRTCFirebase({ db, participantId });
  /* eslint-enable no-unused-vars */

  useEffect(() => {
    if (!roomId) {
      setJoinedRoom(false);
    }
    // console.log("roomId: ", roomId);
    // const playlistRef = await addDoc(collection(db, "RoomPlaylist"), {
    //   roomId,
    // });
    // console.log("playlistRef", playlistRef);
  }, [roomId]);

  useEffect(() => {
    if (roomId) {
      dispatch(setReduxRoomId(roomId));
    }
  }, [roomId]);

  // async function handleJoin() {
  //   try {
  //             await joinRoom();
  //             setJoinedRoom(true);
  //           } catch (e) {
  //             console.error(e);
  //             alert(e.message);
  //           }
  // }

  async function checkPlaylist(roomId) {
    try {
      //db.collection("RoomPlaylist")

      console.log("roomId: ", roomId);

      // if (roomId) {
      //   const playlistRef = await addDoc(collection(db, "RoomPlaylist"), {
      //     roomId,
      //   });
      //   console.log("roomId: ", roomId);
      // }
    } catch (e) {
      console.error(e);
      alert("Failed to create room,", e.message);
    }
  }

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
              <div key={id}>
                <h1>{id}:</h1>
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
          <div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(roomId);
              }}
            >
              Copy joining code
            </button>
            <p>
              Room: {roomId} <br /> Participant ID: {participantId}
            </p>
            <button
              onClick={async () => {
                // shareScreen({ options: { suppressVideo: true } });
                shareScreen();
              }}
            >
              SHARE SCREEN
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default VideoTest;

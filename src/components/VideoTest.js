import React, { useRef, useState, useEffect } from "react";
import "./css/VideoTest.css";
import { useWebRTCFirebase } from "usewebrtc";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { v4 as uuid } from "uuid";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

import { ReactComponent as HangupIcon } from "../icons/hangup.svg";
import { ReactComponent as MoreIcon } from "../icons/more-vertical.svg";
import { ReactComponent as CopyIcon } from "../icons/copy.svg";
import icon from "../images/icon-no-bg.png";
import vback from "../images/vback.gif";

const participantId = uuid();

const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};
firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const db = getFirestore(initializeApp(firebaseConfig));

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
  }, [roomId]);

  return (
    <div className="VideoTest">
      <div>
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
        />
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
              />
            </div>
          );
        })}
      </div>
      {!roomId && (
        <>
          <button
            onClick={async () => {
              try {
                await createRoom();
                setJoinedRoom(true);
              } catch (e) {
                console.error(e);
                alert("Failed to create room,", e.message);
              }
            }}
          >
            CREATE ROOM
          </button>
        </>
      )}
      <div className="answer box">
        {!joinedRoom && (
          <input
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="Join with code"
          />
        )}
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

// export default function VideoTest() {
//   const [currentPage, setCurrentPage] = useState('home');
//   const [joinCode, setJoinCode] = useState('');

//   return (
//     <div className="webcamRTC">
//       {currentPage === 'home' ? (
//         <Menu
//           joinCode={joinCode}
//           setJoinCode={setJoinCode}
//           setPage={setCurrentPage}
//         />
//       ) : (
//         <Videos mode={currentPage} callId={joinCode} setPage={setCurrentPage} />
//       )}
//     </div>
//   );
// }

// function Menu({ joinCode, setJoinCode, setPage }) {
//   return (
//     <div className="home">
//       {/* <div className="create box">
//         <button onClick={() => setPage('create')}>Create Call</button>
//       </div> */}

//       <div className="answer box">
//         <img src={icon} alt="" width="180px" />
//         <input
//           value={joinCode}
//           onChange={(e) => setJoinCode(e.target.value)}
//           placeholder="Join with code"
//         />
//         <button onClick={() => setPage('join')}>Answer</button>
//         <button onClick={() => setPage('create')}>Create Call</button>
//       </div>
//     </div>
//   );
// }

// function Videos({ mode, callId, setPage }) {
//   const [webcamActive, setWebcamActive] = useState(false);
//   const [roomId, setRoomId] = useState(callId);

//   const localRef = useRef();
//   const remoteRef = useRef();

//   const setupSources = async () => {
//     const localStream = await navigator.mediaDevices.getUserMedia({
//       video: true,
//       audio: true,
//     });
//     const remoteStream = new MediaStream();

//     localStream.getTracks().forEach((track) => {
//       pc.addTrack(track, localStream);
//     });

//     pc.ontrack = (event) => {
//       event.streams[0].getTracks().forEach((track) => {
//         remoteStream.addTrack(track);
//       });
//     };

//     localRef.current.srcObject = localStream;
//     remoteRef.current.srcObject = remoteStream;

//     setWebcamActive(true);

//     if (mode === 'create') {
//       const callDoc = firestore.collection('calls').doc();
//       const offerCandidates = callDoc.collection('offerCandidates');
//       const answerCandidates = callDoc.collection('answerCandidates');

//       setRoomId(callDoc.id);

//       pc.onicecandidate = (event) => {
//         event.candidate && offerCandidates.add(event.candidate.toJSON());
//       };

//       const offerDescription = await pc.createOffer();
//       await pc.setLocalDescription(offerDescription);

//       const offer = {
//         sdp: offerDescription.sdp,
//         type: offerDescription.type,
//       };

//       await callDoc.set({ offer });

//       callDoc.onSnapshot((snapshot) => {
//         const data = snapshot.data();
//         if (!pc.currentRemoteDescription && data?.answer) {
//           const answerDescription = new RTCSessionDescription(data.answer);
//           pc.setRemoteDescription(answerDescription);
//         }
//       });

//       answerCandidates.onSnapshot((snapshot) => {
//         snapshot.docChanges().forEach((change) => {
//           if (change.type === 'added') {
//             const candidate = new RTCIceCandidate(change.doc.data());
//             pc.addIceCandidate(candidate);
//           }
//         });
//       });
//     } else if (mode === 'join') {
//       const callDoc = firestore.collection('calls').doc(callId);
//       const answerCandidates = callDoc.collection('answerCandidates');
//       const offerCandidates = callDoc.collection('offerCandidates');

//       pc.onicecandidate = (event) => {
//         event.candidate && answerCandidates.add(event.candidate.toJSON());
//       };

//       const callData = (await callDoc.get()).data();

//       const offerDescription = callData.offer;
//       await pc.setRemoteDescription(
//         new RTCSessionDescription(offerDescription)
//       );

//       const answerDescription = await pc.createAnswer();
//       await pc.setLocalDescription(answerDescription);

//       const answer = {
//         type: answerDescription.type,
//         sdp: answerDescription.sdp,
//       };

//       await callDoc.update({ answer });

//       offerCandidates.onSnapshot((snapshot) => {
//         snapshot.docChanges().forEach((change) => {
//           if (change.type === 'added') {
//             let data = change.doc.data();
//             pc.addIceCandidate(new RTCIceCandidate(data));
//           }
//         });
//       });
//     }

//     pc.onconnectionstatechange = (event) => {
//       if (pc.connectionState === 'disconnected') {
//         hangUp();
//       }
//     };
//   };

//   const hangUp = async () => {
//     pc.close();

//     if (roomId) {
//       let roomRef = firestore.collection('calls').doc(roomId);
//       await roomRef
//         .collection('answerCandidates')
//         .get()
//         .then((querySnapshot) => {
//           querySnapshot.forEach((doc) => {
//             doc.ref.delete();
//           });
//         });
//       await roomRef
//         .collection('offerCandidates')
//         .get()
//         .then((querySnapshot) => {
//           querySnapshot.forEach((doc) => {
//             doc.ref.delete();
//           });
//         });

//       await roomRef.delete();
//     }

//     // window.location.reload();
//   };

//   return (
//     <div className="video-container">
//       <div className="video_box">
//         <div>
//           <video ref={localRef} autoPlay playsInline muted poster={vback} />
//         </div>
//         <div>
//           <video ref={remoteRef} autoPlay playsInline poster={vback} />
//         </div>
//       </div>
//       <div className={roomId ? 'userPwd' : ''}>{roomId}</div>
//       {/* <div className="buttonsContainer">
//         <button
//           onClick={hangUp}
//           disabled={!webcamActive}
//           className="hangup button"
//         >
//           <HangupIcon />
//         </button>
//         <div tabIndex={0} role="button" className="more button">
//           <MoreIcon />
//           <div className="popover">
//             <button
//               onClick={() => {
//                 navigator.clipboard.writeText(roomId);
//               }}
//             >
//               <CopyIcon /> Copy joining code
//             </button>
//           </div>
//         </div>
//       </div> */}

//       {!webcamActive && (
//         <div>
//           <div>
//             <h3>Turn on your camera and microphone and start the call</h3>
//             <div className="container">
//               <button onClick={() => setPage('home')} className="secondary">
//                 Cancel
//               </button>
//               <button onClick={setupSources}>Start</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

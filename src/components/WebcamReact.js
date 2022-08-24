// import React, { useState, useEffect } from "react";
// import firebase from "firebase/compat/app";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   // apiKey: "AIzaSyDQAallPLiRzCMIqdw-8vzhGrvVkayQh34",
//   // authDomain: "web-rtc-test-7bc63.firebaseapp.com",
//   // databaseURL: "https://web-rtc-test-7bc63-default-rtdb.firebaseio.com",
//   // projectId: "web-rtc-test-7bc63",
//   // storageBucket: "web-rtc-test-7bc63.appspot.com",
//   // messagingSenderId: "376692337610",
//   // appId: "1:376692337610:web:fde634f9a2e55bd918fd33",
//   apiKey: "AIzaSyAy4mqr3tWrbRPgSiewCz02iKl7sADfPGc",
//   authDomain: "kawaiiyuke-10e81.firebaseapp.com",
//   databaseURL: "https://kawaiiyuke-10e81-default-rtdb.firebaseio.com",
//   projectId: "kawaiiyuke-10e81",
//   storageBucket: "kawaiiyuke-10e81.appspot.com",
//   messagingSenderId: "891237213652",
//   appId: "1:891237213652:web:0ada7ae2461bd808322241",
// };

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }
// const firestore = getFirestore();

// export default function WebcamReact() {
//   const [localStream, setLocalStream] = useState(null);
//   const [remoteStream, setRemoteStream] = useState(null);

//   const servers = {
//     iceServers: [
//       {
//         urls: [
//           "stun:stun1.l.google.com:19302",
//           "stun:stun2.l.google.com:19302",
//         ],
//       },
//     ],
//     iceCandidatePoolSize: 10,
//   };

//   const pc = new RTCPeerConnection(servers);
//   const _fetchLocal = async () => {
//     async function fetchLocal() {
//       try {
//         const result = await navigator.mediaDevices.getUserMedia({
//           video: true,
//           audio: true,
//         });
//         return result;
//       } catch (err) {
//         console.log(err);
//       }
//     }

//     const result = await fetchLocal();
//     setLocalStream(result);
//   };
//   console.log("localSTREAM", localStream);
//   useEffect(() => {
//     console.log("localStream", localStream);
//     if (localStream) {
//       localStream.getTracks().forEach((track) => {
//         pc.addTrack(track, localStream);
//       });
//     }
//   }, [localStream]);

//   //   // Pull tracks from remote stream, add to video stream
//   useEffect(() => {
//     if (remoteStream) {
//       pc.ontrack = (event) => {
//         event.streams[0].getTracks().forEach((track) => {
//           remoteStream.addTrack(track);
//         });
//       };
//     }
//   }, [remoteStream]);

//   return (
//     <div>
//       <div>WebcamReact</div> <h2>1. Start your Webcam</h2>
//       <div className="videos">
//         <span>
//           <h3>Local Stream</h3>
//           <video id="webcamVideo" autoPlay playsInline></video>
//         </span>
//         <span>
//           <h3>Remote Stream</h3>
//           <video id="remoteVideo" autoPlay playsInline></video>
//         </span>
//       </div>
//       {localStream ? <p>{localStream.id}</p> : null}
//       <button
//         onClick={() => {
//           _fetchLocal();
//           setRemoteStream(new MediaStream());
//           console.log("local stream", localStream);
//         }}
//       >
//         Start webcam
//       </button>
//       <h2>2. Create a new Call</h2>
//       <button
//         onClick={() => {
//           console.log("call button");
//         }}
//         id="callButton"
//         disabled
//       >
//         Create Call (offer)
//       </button>
//       <h2>3. Join a Call</h2>
//       <p>Answer the call from a different browser window or device</p>
//       <input id="callInput" />
//       <button
//         onClick={() => {
//           console.log("answer button");
//         }}
//         id="answerButton"
//         disabled
//       >
//         Answer
//       </button>
//       <h2>4. Hangup</h2>
//       <button id="hangupButton" disabled>
//         Hangup
//       </button>
//     </div>
//   );
// }

import React, { useState, useEffect, useRef } from "react";
import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAy4mqr3tWrbRPgSiewCz02iKl7sADfPGc",
  authDomain: "kawaiiyuke-10e81.firebaseapp.com",
  databaseURL: "https://kawaiiyuke-10e81-default-rtdb.firebaseio.com",
  projectId: "kawaiiyuke-10e81",
  storageBucket: "kawaiiyuke-10e81.appspot.com",
  messagingSenderId: "891237213652",
  appId: "1:891237213652:web:0ada7ae2461bd808322241",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const firestore = getFirestore();

export default function WebcamReact() {
  const servers = {
    iceServers: [
      {
        urls: [
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
        ],
      },
    ],
    iceCandidatePoolSize: 10,
  };

  // const pc = new RTCPeerConnection(servers);

  // controls if media input is on or off
  const [isStreaming, setIsStreaming] = useState(false);

  // controls the current stream DOM

  // ref that you use to set state
  const webcamVideo = useRef();
  const pc = new RTCPeerConnection(servers);
  // get the user's media stream
  const startStream = async () => {
    webcamVideo.current.srcObject = await navigator.mediaDevices.getUserMedia({
      video: { width: 480, height: 240 },
      audio: true,
    });
    console.log("Webcam video after assignment ", webcamVideo);
    setIsStreaming(true);
  };

  // stops the user's media stream
  const stopStream = () => {
    webcamVideo.current.srcObject = null;
    setIsStreaming(false);
  };

  return (
    <div>
      <div>WebcamReact</div> <h2>1. Start your Webcam</h2>
      <div className="videos">
        <span>
          <h3>Local Stream</h3>
          <video
            id="webcamVideo"
            ref={webcamVideo}
            autoPlay
            playsInline
          ></video>
        </span>
        <span>
          <h3>Remote Stream</h3>
          <video
            // ref={webcamVideo}
            id="remoteVideo"
            autoPlay
            playsInline
          ></video>
        </span>
      </div>
      {isStreaming ? (
        <button onClick={stopStream}>Stop Webcam</button>
      ) : (
        <button
          onClick={() => {
            startStream();
          }}
        >
          Start Webcam
        </button>
      )}
      <h2>2. Create a new Call</h2>
      <button
        onClick={() => {
          console.log("call button");
        }}
        id="callButton"
        // disabled
      >
        Create Call (offer)
      </button>
      <h2>3. Join a Call</h2>
      <p>Answer the call from a different browser window or device</p>
      <input id="callInput" />
      <button
        onClick={() => {
          console.log("answer button");
        }}
        id="answerButton"
        disabled
      >
        Answer
      </button>
      <h2>4. Hangup</h2>
      <button id="hangupButton" disabled>
        Hangup
      </button>
    </div>
    // <div className="container">
    //   <video ref={webcamVideo} autoPlay playsInline></video>
    //   {isStreaming ? (
    //  <button onClick={stopStream}>Stop Webcam</button>
    //   ) : (
    //     <button
    //       onClick={() => {
    //         console.log("Webcam video before assignment", webcamVideo);
    //         startStream();
    //       }}
    //     >
    //       Start Webcam
    //     </button>
    //   )}
    // </div>
  );
}

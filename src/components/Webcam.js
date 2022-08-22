// import React, { useEffect, useState } from "react";
// import firebase from "firebase/compat/app";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyDQAallPLiRzCMIqdw-8vzhGrvVkayQh34",
//   authDomain: "web-rtc-test-7bc63.firebaseapp.com",
//   databaseURL: "https://web-rtc-test-7bc63-default-rtdb.firebaseio.com",
//   projectId: "web-rtc-test-7bc63",
//   storageBucket: "web-rtc-test-7bc63.appspot.com",
//   messagingSenderId: "376692337610",
//   appId: "1:376692337610:web:fde634f9a2e55bd918fd33",
// };

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }
// const firestore = getFirestore();

// const servers = {
//   iceServers: [
//     {
//       urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
//     },
//   ],
//   iceCandidatePoolSize: 10,
// };
// //generate the ice candidates
// const [localStream, setLocalStream] = useState(null);
// const [remoteStream, setRemoteStream] = useState(null);

// const pc = new RTCPeerConnection(servers);

// // HTML elements
// //1
// const webcamVideo = document.getElementById("webcamVideo");
// const remoteVideo = document.getElementById("remoteVideo");
// const callButton = document.getElementById("callButton");
// const answerButton = document.getElementById("answerButton");
// //2
// const callInput = document.getElementById("callInput");
// const hangupButton = document.getElementById("hangupButton");

// // 1. Setup media sources
// //jsx returning the webcam element (the div that has webcam + put the onclick) - place in useEffect
// //gives access to webcam
// const webcamButton = async () => {
//   localStream = await navigator.mediaDevices.getUserMedia({
//     video: true,
//     audio: true,
//   });
//   remoteStream = new MediaStream();

//   // Push tracks from local stream to peer connection - manages stream
//   //localStream will be state
localStream.getTracks().forEach((track) => {
  pc.addTrack(track, localStream);
});

// Pull tracks from remote stream, add to video stream
pc.ontrack = (event) => {
  event.streams[0].getTracks().forEach((track) => {
    remoteStream.addTrack(track);
  });
};

//   webcamVideo.srcObject = localStream;
//   remoteVideo.srcObject = remoteStream;

//   callButton.disabled = false;
//   answerButton.disabled = false;
//   webcamButton.disabled = true;
// };

// // 2. Create an offer

// const _callButton = async () => {
//   // Reference Firestore collections for signaling
//   const callDoc = firestore.collection("calls").doc();
//   const offerCandidates = callDoc.collection("offerCandidates");
//   const answerCandidates = callDoc.collection("answerCandidates");

//   callInput.value = callDoc.id;

//   // Get candidates for caller, save to db
//   pc.onicecandidate = (event) => {
//     event.candidate && offerCandidates.add(event.candidate.toJSON());
//   };

//   // Create offer
//   const offerDescription = await pc.createOffer();
//   await pc.setLocalDescription(offerDescription);

//   const offer = {
//     sdp: offerDescription.sdp,
//     type: offerDescription.type,
//   };

//   await callDoc.set({ offer });

//   // Listen for remote answer
//   callDoc.onSnapshot((snapshot) => {
//     const data = snapshot.data();
//     if (!pc.currentRemoteDescription && data?.answer) {
//       const answerDescription = new RTCSessionDescription(data.answer);
//       pc.setRemoteDescription(answerDescription);
//     }
//   });

//   // When answered, add candidate to peer connection
//   answerCandidates.onSnapshot((snapshot) => {
//     snapshot.docChanges().forEach((change) => {
//       if (change.type === "added") {
//         const candidate = new RTCIceCandidate(change.doc.data());
//         pc.addIceCandidate(candidate);
//       }
//     });
//   });

//   hangupButton.disabled = false;
// };

// // 3. Answer the call with the unique ID
// const _answerButton = async () => {
//   const callId = callInput.value;
//   const callDoc = firestore.collection("calls").doc(callId);
//   const answerCandidates = callDoc.collection("answerCandidates");
//   const offerCandidates = callDoc.collection("offerCandidates");

//   pc.onicecandidate = (event) => {
//     event.candidate && answerCandidates.add(event.candidate.toJSON());
//   };

//   const callData = (await callDoc.get()).data();

//   const offerDescription = callData.offer;
//   await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

//   const answerDescription = await pc.createAnswer();
//   await pc.setLocalDescription(answerDescription);

//   const answer = {
//     type: answerDescription.type,
//     sdp: answerDescription.sdp,
//   };

//   await callDoc.update({ answer });

//   offerCandidates.onSnapshot((snapshot) => {
//     snapshot.docChanges().forEach((change) => {
//       console.log(change);
//       if (change.type === "added") {
//         let data = change.doc.data();
//         pc.addIceCandidate(new RTCIceCandidate(data));
//       }
//     });
//   });
// };

// export default function Webcam() {
//   return (
//     <div>
//       {" "}
//       <h2>1. Start your Webcam</h2>
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
//       <button onClick={webcamButton}>Start webcam</button>
//       <h2>2. Create a new Call</h2>
//       <button onClick={_callButton} id="callButton" disabled>
//         Create Call (offer)
//       </button>
//       <h2>3. Join a Call</h2>
//       <p>Answer the call from a different browser window or device</p>
//       <input id="callInput" />
//       <button onClick={_answerButton} id="answerButton" disabled>
//         Answer
//       </button>
//       <h2>4. Hangup</h2>
//       <button id="hangupButton" disabled>
//         Hangup
//       </button>
//     </div>
//   );
// }

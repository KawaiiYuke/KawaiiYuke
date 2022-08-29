import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyAy4mqr3tWrbRPgSiewCz02iKl7sADfPGc",
  authDomain: "kawaiiyuke-10e81.firebaseapp.com",
  databaseURL: "https://kawaiiyuke-10e81-default-rtdb.firebaseio.com",
  projectId: "kawaiiyuke-10e81",
  storageBucket: "kawaiiyuke-10e81.appspot.com",
  messagingSenderId: "891237213652",
  appId: "1:891237213652:web:0ada7ae2461bd808322241",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase;

var firepadRef = firebase.database().ref();
console.log("firepadRef: ", firepadRef);

export const userName = prompt("What's your name?");
const urlparams = new URLSearchParams(window.location.search);
const roomId = urlparams.get("id");

if (roomId) {
  firepadRef = firepadRef.child(roomId);
} else {
  firepadRef = firepadRef.push();
  window.history.replaceState(null, "Meet", "?id=" + firepadRef.key);
}

export default firepadRef;

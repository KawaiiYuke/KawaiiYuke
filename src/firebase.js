import firebase from "firebase/compat/app";

import "firebase/compat/auth";

const app = firebase.initializeApp({
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  // appId: process.env.REACT_APP_FIREBASE_APPID,

  apiKey: "AIzaSyAy4mqr3tWrbRPgSiewCz02iKl7sADfPGc",
  authDomain: "kawaiiyuke-10e81.firebaseapp.com",
  projectId: "kawaiiyuke-10e81",
  storageBucket: "kawaiiyuke-10e81.appspot.com",
  messagingSenderId: "891237213652",
  appId: "1:891237213652:web:f16e21e25f8984f6322241",
});

export const auth = app.auth();
export default app;

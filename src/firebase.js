// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_firebase_apiKey,
  authDomain: "kimberfy.firebaseapp.com",
  databaseURL: process.env.REACT_APP_firebase_databaseURL,
  projectId: "kimberfy",
  storageBucket: "kimberfy.appspot.com",
  messagingSenderId: process.env.REACT_APP_firebase_messagingSenderId,
  appId: process.env.REACT_APP_firebase_appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
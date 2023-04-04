// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, update } from "firebase/database";

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_firebase_apiKey,
//   authDomain: "kimberfy.firebaseapp.com",
//   databaseURL: process.env.REACT_APP_firebase_databaseURL,
//   projectId: "kimberfy",
//   storageBucket: "kimberfy.appspot.com",
//   messagingSenderId: process.env.REACT_APP_firebase_messagingSenderId,
//   appId: process.env.REACT_APP_firebase_appId,
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getDatabase();

export const firebaseSignIn = async (email) => {
  return signInWithEmailAndPassword(auth, email, "testing123")
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("sign in success!", user);
      return user;
    })
    .catch((error) => {
      console.log("error signing in firebase", error);
    });
};

export const sendSong = async (firebaseUser, songId) => {
  update(ref(db, `songs/${firebaseUser}`), {
    [songId]: Date.now()
  });
};

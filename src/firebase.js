// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase, ref, update, set } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHv47czR_qse--5g44dlwOkdwQT3ePUZc",
  authDomain: "kimberfy.firebaseapp.com",
  databaseURL: "https://kimberfy-default-rtdb.firebaseio.com",
  projectId: "kimberfy",
  storageBucket: "kimberfy.appspot.com",
  messagingSenderId: "640009809941",
  appId: "1:640009809941:web:bd27821cd9784edb999e1c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getDatabase(app);

export const firebaseSignIn = async (email, id) => {
  return await signInWithEmailAndPassword(auth, email, id)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("sign in success!", user);
      return user;
    })
    .catch((error) => {
      console.log("error signing in to firebase", error);
      if (error.code === "auth/user-not-found") {
        return createUserWithEmailAndPassword(auth, email, id)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log("new user created!", user);
            set(ref(db, `users/${user.uid}/profile`), {
              uid: user.uid,
              spotifyId: id,
            });
            return user;
          })
          .catch((err) => console.log("error creating new user", err));
      }
    });
};

export const sendSong = async (firebaseUser, song) => {
  update(ref(db, `users/${firebaseUser}/sharing/${song.id}`), {
    id: song.id,
    name: song.name,
    timeSent: Date.now()
  });
};

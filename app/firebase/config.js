// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAz4qd1hpIZMZ1TWUb8PaDVlMpneKoGzhU",
  authDomain: "hackoverflow-44154.firebaseapp.com",
  projectId: "hackoverflow-44154",
  storageBucket: "hackoverflow-44154.firebasestorage.app",
  messagingSenderId: "613795222571",
  appId:  "1:613795222571:web:9be15a5888e9aabdbec66e",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const vath = getAuth
const db = getFirestore(app);
export {app, auth, db, storage}
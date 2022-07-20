// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7vQvW58Ujx510_NRqzw6Wo8tR1qZHx4Q",
  authDomain: "netflix-clone-95af7.firebaseapp.com",
  projectId: "netflix-clone-95af7",
  storageBucket: "netflix-clone-95af7.appspot.com",
  messagingSenderId: "158039981284",
  appId: "1:158039981284:web:87cf0e90145d59670e00f1",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { db, auth };

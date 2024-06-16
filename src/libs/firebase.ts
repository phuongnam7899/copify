// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDBQBwZskWtu-tDsQYtYyvo8syAalQvado",
  authDomain: "personal-info-f383c.firebaseapp.com",
  projectId: "personal-info-f383c",
  storageBucket: "personal-info-f383c.appspot.com",
  messagingSenderId: "351737519636",
  appId: "1:351737519636:web:4cd02f7a8dcc1c3a131101",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore
export const db = getFirestore(app);

// Initialize Auth Provider
export const auth = getAuth(app);
export const authProvider = new GoogleAuthProvider();

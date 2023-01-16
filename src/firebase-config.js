// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCM55C7ycP1Ko8E0bKBjkHjAENGBn3K4NU",
  authDomain: "chatroom-7e39d.firebaseapp.com",
  projectId: "chatroom-7e39d",
  storageBucket: "chatroom-7e39d.appspot.com",
  messagingSenderId: "101922738591",
  appId: "1:101922738591:web:2d7485edb6a7fc24a06daa",
  measurementId: "G-XJ1FDGZ0XT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app)
export const db = getFirestore(app)
export const provider = new GoogleAuthProvider()
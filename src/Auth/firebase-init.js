// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBufNmHHqbnMQiqexvEqsgmO3rJOD2jM6Q",
  authDomain: "kalamajhi-high-school.firebaseapp.com",
  projectId: "kalamajhi-high-school",
  storageBucket: "kalamajhi-high-school.firebasestorage.app",
  messagingSenderId: "255710259304",
  appId: "1:255710259304:web:1af7a819c5cf9e7223b3dd",
  measurementId: "G-H6BFX0T1EN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);

export default auth;
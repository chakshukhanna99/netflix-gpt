// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-HYEHOikSK864f6QiMI5NuIMurAKphSo",
  authDomain: "netflixgpt-79b76.firebaseapp.com",
  projectId: "netflixgpt-79b76",
  storageBucket: "netflixgpt-79b76.appspot.com",
  messagingSenderId: "888838925508",
  appId: "1:888838925508:web:51a5e8e59b43d59c586d91",
  measurementId: "G-QYYCH6WZZJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
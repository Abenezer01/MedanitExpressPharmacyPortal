// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiEoTSqIuoG7JKOqwvJJZdzbYFtm15heE",
  authDomain: "meditelegram-84fnm.firebaseapp.com",
  projectId: "meditelegram-84fnm",
  storageBucket: "meditelegram-84fnm.appspot.com",
  messagingSenderId: "533075998920",
  appId: "1:533075998920:web:957a2f57f8075daccdcdfd"
};


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export { app };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5JgCfg2CE7E9x0LgvpITulFokcUN4ovI",
  authDomain: "blogauth-e43b9.firebaseapp.com",
  projectId: "blogauth-e43b9",
  storageBucket: "blogauth-e43b9.appspot.com",
  messagingSenderId: "10029283001",
  appId: "1:10029283001:web:7420bfd576ec4f83334d68",
  measurementId: "G-TVCTS1D7ZB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
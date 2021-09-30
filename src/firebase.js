import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBc0CsPdn_U0kYQ_sz34TrUqHFyFd_c-aM",
  authDomain: "product99s.firebaseapp.com",
  projectId: "product99s",
  storageBucket: "product99s.appspot.com",
  messagingSenderId: "414562332896",
  appId: "1:414562332896:web:3e423d64409162c937a085",
  measurementId: "G-K4G2ZMMNK8",
};

// Initialize Firebase
const firebaseDB = firebase.initializeApp(firebaseConfig).firestore();

export default firebaseDB;

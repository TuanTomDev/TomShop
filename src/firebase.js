/* eslint-disable */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAWat3-E8kmuFwhW2bjXoCEfwszA1-dxCw",
//   authDomain: "e-shop-a0940.firebaseapp.com",
//   projectId: "e-shop-a0940",
//   storageBucket: "e-shop-a0940.appspot.com",
//   messagingSenderId: "328024396446",
//   appId: "1:328024396446:web:a8c9798741e66c470f618f",
//   measurementId: "G-NZEVTJJQVY",
// };

const firebaseConfig = {
  apiKey: "AIzaSyBcgrDzZ8E-xR9a0oDDAfVORJB-S8XJAo0",
  authDomain: "project-cv-tomdev.firebaseapp.com",
  databaseURL: "https://project-cv-tomdev-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "project-cv-tomdev",
  storageBucket: "project-cv-tomdev.appspot.com",
  messagingSenderId: "990895661206",
  appId: "1:990895661206:web:a9cc69e5f841c2211de2b7",
  measurementId: "G-YBZZQF045C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore();
const auth = getAuth(app);
const storage = getStorage(app);


export default { app, analytics, db, auth, storage};

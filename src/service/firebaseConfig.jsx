// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjDwOjGVddkD9j_Wjakjf41Pie0CZ71VA",
  authDomain: "trip-cea96.firebaseapp.com",
  projectId: "trip-cea96",
  storageBucket: "trip-cea96.firebasestorage.app",
  messagingSenderId: "906395319187",
  appId: "1:906395319187:web:abbb565a18bd7d8898c666",
  measurementId: "G-1GM5D1TF1E"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
// const analytics = getAnalytics(app);
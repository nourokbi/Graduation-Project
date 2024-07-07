// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAW0rmbkCChp9Q305VcRtoQvgWlY4e8VG0",
  authDomain: "graduation-beef5.firebaseapp.com",
  databaseURL: "https://graduation-beef5-default-rtdb.firebaseio.com",
  projectId: "graduation-beef5",
  storageBucket: "graduation-beef5.appspot.com",
  messagingSenderId: "446252346321",
  appId: "1:446252346321:web:ce8d1203fc81cee1d20ef0",
  measurementId: "G-3V65JWN3GJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { app, auth, database };

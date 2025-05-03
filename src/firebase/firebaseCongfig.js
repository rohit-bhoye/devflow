// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFY9KflnVanjNzpHbYyKyYspl5MZNi6Rw",
  authDomain: "devflow-288.firebaseapp.com",
  projectId: "devflow-288",
  storageBucket: "devflow-288.firebasestorage.app",
  messagingSenderId: "373816000001",
  appId: "1:373816000001:web:f805ec5771742bafc84a00",
  measurementId: "G-RYGCQ95WT8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
const analytics = getAnalytics(app);
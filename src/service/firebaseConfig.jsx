// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvpUd4SdCm_J2uPjAXLs0qt90fg07kp6U",
  authDomain: "ai-travel-itineary-planner.firebaseapp.com",
  projectId: "ai-travel-itineary-planner",
  storageBucket: "ai-travel-itineary-planner.firebasestorage.app",
  messagingSenderId: "903147607961",
  appId: "1:903147607961:web:2efdb4c1b11a170428e508",
  measurementId: "G-CSS4GLF43Q"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)

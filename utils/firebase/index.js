// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAIODOiyVgQBALk1Gm2Cj51ZkbWF_Vw1cQ",
  authDomain: "justice-lens.firebaseapp.com",
  projectId: "justice-lens",
  storageBucket: "justice-lens.firebasestorage.app",
  messagingSenderId: "195188193147",
  appId: "1:195188193147:web:c887e745a7afbd8f1a2fde",
  measurementId: "G-J52ZN9E5W4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

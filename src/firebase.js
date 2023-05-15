// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEHFVPUdQQ4Uo-IH067XiyVCxAkwl1Vrk",
  authDomain: "vue-vite-firebase-2023.firebaseapp.com",
  projectId: "vue-vite-firebase-2023",
  storageBucket: "vue-vite-firebase-2023.appspot.com",
  messagingSenderId: "792855457547",
  appId: "1:792855457547:web:8b5516a741c4746b367c0e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth }
export const db = getFirestore(app);
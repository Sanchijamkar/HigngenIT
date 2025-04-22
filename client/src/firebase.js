// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "flipcard-clone.firebaseapp.com",
  projectId: "flipcard-clone",
  storageBucket: "flipcard-clone.firebasestorage.app",
  messagingSenderId: "703048871997",
  appId: "1:703048871997:web:7a762a850657acc2b0fa54"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
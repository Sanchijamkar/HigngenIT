// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "e-commerce-application-d6b93.firebaseapp.com",
  projectId: "e-commerce-application-d6b93",
  storageBucket: "e-commerce-application-d6b93.firebasestorage.app",
  messagingSenderId: "577295680471",
  appId: "1:577295680471:web:fb610fd50aaa4e30840192"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
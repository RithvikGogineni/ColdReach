// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDLXUgmFshKRVJCHq-gZ_CF92WbMb0j5lA",
    authDomain: "cold-email-generation.firebaseapp.com",
    projectId: "cold-email-generation",
    storageBucket: "cold-email-generation.firebasestorage.app",
    messagingSenderId: "1043499637658",
    appId: "1:1043499637658:web:d8302cd673fa317bb7f823",
    measurementId: "G-Q5DNSVP224"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
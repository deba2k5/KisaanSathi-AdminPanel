// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Use same Firebase project as main frontend
const firebaseConfig = {
  apiKey: "AIzaSyA20eF-3eOwxewwoyI_EqUGPyI3tM6bZeA",
  authDomain: "kisaansaathi-68309.firebaseapp.com",
  projectId: "kisaansaathi-68309",
  storageBucket: "kisaansaathi-68309.firebasestorage.app",
  messagingSenderId: "299188248424",
  appId: "1:299188248424:web:0f841f87dd6b54d28040dd",
  measurementId: "G-ZGQYPXMKX8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
export default app;
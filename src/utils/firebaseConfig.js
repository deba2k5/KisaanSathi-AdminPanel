// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCP_k54vgtaLLrYUHkbtf2LMYqzstRoHao",
  authDomain: "airlink-6b5ca.firebaseapp.com",
  projectId: "airlink-6b5ca",
  storageBucket: "airlink-6b5ca.firebasestorage.app",
  messagingSenderId: "186039291778",
  appId: "1:186039291778:web:a9a57ec03fa3c4147b899b",
  measurementId: "G-T79V5SKJR7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
export default app;
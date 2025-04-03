import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBwxF92rK4eLu1BXS_uYNbSrynakQKJz6M",
  authDomain: "quiz-930ca.firebaseapp.com",
  projectId: "quiz-930ca",
  storageBucket: "quiz-930ca.firebasestorage.app",
  messagingSenderId: "64218741120",
  appId: "1:64218741120:web:c30f4468ff7e89f97fe965",
  measurementId: "G-8612JCTLXD"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

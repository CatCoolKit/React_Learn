import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchat-c0643.firebaseapp.com",
  projectId: "reactchat-c0643",
  storageBucket: "reactchat-c0643.appspot.com",
  messagingSenderId: "1063018686409",
  appId: "1:1063018686409:web:4aadb44e33e4bd668eea18",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();

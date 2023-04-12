import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBbdxM5boD3ReTvcvaoON_Th8tpI_w6ybA",
  authDomain: "monkey-blogging-121be.firebaseapp.com",
  projectId: "monkey-blogging-121be",
  storageBucket: "monkey-blogging-121be.appspot.com",
  messagingSenderId: "1016626690363",
  appId: "1:1016626690363:web:992a747f14ed232dd6df1e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

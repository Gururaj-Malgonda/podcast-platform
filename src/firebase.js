// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1R7X46UUE-_rMgPwqiEGrjyCTjNcXA5A",
  authDomain: "podcast-app-907d7.firebaseapp.com",
  projectId: "podcast-app-907d7",
  storageBucket: "podcast-app-907d7.appspot.com",
  messagingSenderId: "441460333842",
  appId: "1:441460333842:web:58f494e531ed51506727cb",
  measurementId: "G-6PP6DEXM4P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { auth, db, storage };

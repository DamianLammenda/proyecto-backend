import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: process.env.FIREBASEAPIKEY,
    authDomain: process.env.FIREBASEAUTHDOMAIN,
    projectId: process.env.FIREBASEPROJECTID,
    storageBucket: process.env.FIREBASESTORAGEBUCKET,
    messagingSenderId: process.env.FIREBASEMESSAGINGSENDERID,
    appId: process.env.FIREBASEAPPID
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
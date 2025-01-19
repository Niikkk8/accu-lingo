// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAZoZBJuvHmtP1Hu6Ovv1I4zrOQv3DVSd8",
    authDomain: "acculingo-686ad.firebaseapp.com",
    projectId: "acculingo-686ad",
    storageBucket: "acculingo-686ad.firebasestorage.app",
    messagingSenderId: "292562495546",
    appId: "1:292562495546:web:1ecf47dbea2159adbb2d03"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
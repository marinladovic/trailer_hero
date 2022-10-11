// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBneBm0Jh-7VoRM7fcvGSYisrML_j16GvI',
  authDomain: 'trailer-hero.firebaseapp.com',
  projectId: 'trailer-hero',
  storageBucket: 'trailer-hero.appspot.com',
  messagingSenderId: '454090208301',
  appId: '1:454090208301:web:ffdf214f72f80a75c1b4a4',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { db, auth };

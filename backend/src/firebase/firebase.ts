import dotenv from "dotenv";
dotenv.config();

import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator  } from "firebase/firestore";
import { getAuth, connectAuthEmulator  } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.API_FIREBASE,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
};

// Initialize Firebase
export const appFirebase = initializeApp(firebaseConfig);
export const auth = getAuth(appFirebase)
export const db = getFirestore(appFirebase)


// Firebase Admin (solo para test/servidor)
import admin from "firebase-admin";
import { getAuth as getAdminAuth } from "firebase-admin/auth";

// 👉 Esto es CRUCIAL para que admin se conecte al emulador
if (process.env.NODE_ENV === "test") {
  process.env.FIREBASE_AUTH_EMULATOR_HOST = "localhost:9099";
}

if (!admin.apps.length) {
  admin.initializeApp({
    projectId: process.env.PROJECT_ID,
  });
}

export const authAdmin = getAdminAuth(admin.app());
if (process.env.NODE_ENV === 'test') {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, "localhost", 8080);
}
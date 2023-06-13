import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const app = initializeApp();

console.log("Firebase Admin SDK initialized", app.name);

const firestore = getFirestore(app);

console.log("Firestore initialized");

export { app, firestore };

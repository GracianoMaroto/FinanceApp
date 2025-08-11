// src/firebase.js
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "finance-app-fc575.firebaseapp.com",
  projectId: "finance-app-fc575",
  storageBucket: "finance-app-fc575.appspot.com",
  messagingSenderId: "406883359426",
  appId: "1:406883359426:web:b92382cc25e8bf2f4a795b"
};
const firebaseApp = initializeApp(firebaseConfig)

// Exporte os serviços
const auth = getAuth(firebaseApp)
const db = getFirestore(firebaseApp)

export { firebaseApp, auth, db }

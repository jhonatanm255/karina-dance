import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Añadir esta importación

const firebaseConfig = {
  apiKey: "AIzaSyB3ZqIMqqdi79lPPj9XvZ9FlDYtYSubNb8",
  authDomain: "karina-dance.firebaseapp.com",
  projectId: "karina-dance",
  storageBucket: "karina-dance.firebasestorage.app",
  messagingSenderId: "1083525740825",
  appId: "1:1083525740825:web:f6c9f9ba6be7851ee02d88",
  measurementId: "G-SGJV6RKZFJ",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app); // Ahora db está correctamente inicializado

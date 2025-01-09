import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // Importa GoogleAuthProvider
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// console.log(import.meta.env.VITE_FIREBASE_API_KEY); // Aquí verificamos que la clave de API se carga correctamente

const firebaseConfig = {
  apiKey: "AIzaSyB3ZqIMqqdi79lPPj9XvZ9FlDYtYSubNb8",
  authDomain: "karina-dance.firebaseapp.com",
  projectId: "karina-dance",
  storageBucket: "karina-dance.firebasestorage.app",
  messagingSenderId: "1083525740825",
  appId: "1:1083525740825:web:f6c9f9ba6be7851ee02d88",
  measurementId: "G-SGJV6RKZFJ",
};

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
//   measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
// };

// Inicialización de la app
const app = initializeApp(firebaseConfig);

// Inicialización de servicios
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Exporta GoogleAuthProvider para que lo puedas usar en otro archivo
export const googleProvider = new GoogleAuthProvider();




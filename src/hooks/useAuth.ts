import { useState, useEffect } from "react";
import { User, signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../lib/firebase";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Efecto para sincronizar el estado del usuario con Firebase
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    // Limpiar el efecto cuando el componente se desmonta
    return () => unsubscribe();
  }, []);

  const signIn = async () => {
    try {
      setError(null);
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
    } catch (err: any) {
      if (err.code === "auth/popup-blocked") {
        setError(
          "Por favor, permite las ventanas emergentes para iniciar sesión con Google"
        );
      } else {
        setError("Error al iniciar sesión. Por favor, intenta nuevamente.");
      }
      console.error("Error signing in:", err);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      setError("Error al cerrar sesión");
      console.error("Error signing out:", err);
    }
  };

  return { user, error, signIn, signOut: signOutUser };
}





// import { useState, useEffect } from "react";
// import { User } from "firebase/auth";
// import { auth } from "../lib/firebase";

// export function useAuth() {
//   const [user, setUser] = useState<User | null>(auth.currentUser);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       setUser(user);
//     });

//     return () => unsubscribe();
//   }, []);

//   return { user, error };
// }

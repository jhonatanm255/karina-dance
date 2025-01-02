import { useState } from 'react';
import { User, signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';

export function useAuth() {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [error, setError] = useState<string | null>(null);

  const signIn = async () => {
    try {
      setError(null);
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
    } catch (err: any) {
      if (err.code === 'auth/popup-blocked') {
        setError('Por favor, permite las ventanas emergentes para iniciar sesión con Google');
      } else {
        setError('Error al iniciar sesión. Por favor, intenta nuevamente.');
      }
      console.error('Error signing in:', err);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      setError('Error al cerrar sesión');
      console.error('Error signing out:', err);
    }
  };

  return { user, error, signIn, signOut: signOutUser };
}
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut
} from "firebase/auth";
import { auth, googleProvider } from "./firebase";

// Registrar usuario con email y contraseña
export const registerWithEmail = (email: string, pass: string) => {
    return createUserWithEmailAndPassword(auth, email, pass);
};

// Iniciar sesión con email y contraseña
export const loginWithEmail = (email: string, pass: string) => {
    return signInWithEmailAndPassword(auth, email, pass);
};

// Iniciar sesión con Google
export const loginWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
};

// Cerrar sesión
export const logoutUser = () => {
    return signOut(auth);
};
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  User as FirebaseUser,
  Auth,
} from 'firebase/auth';

// Firebase configuration sourced from environment variables with fallback
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'budgetmind-1ccfb.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'budgetmind-1ccfb',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'budgetmind-1ccfb.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let googleProvider: GoogleAuthProvider | null = null;

try {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
  auth = getAuth(app);
  // Guarantee browser persistence across page reloads
  setPersistence(auth, browserLocalPersistence).catch((err) => {
    console.warn('[Firebase] Persistence setting notice:', err);
  });

  googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: 'select_account' });
} catch (err) {
  console.warn('[Firebase] Client initialization notice:', err);
}

export { auth, googleProvider };

/**
 * Maps Firebase Auth error codes to user-friendly enterprise error messages
 */
export function mapFirebaseAuthError(error: any): string {
  if (!error) return 'An unexpected error occurred during authentication.';
  const code = error.code || '';
  const message = error.message || '';

  switch (code) {
    case 'auth/popup-closed-by-user':
      return 'Google sign-in was cancelled before completion.';
    case 'auth/popup-blocked':
      return 'Google sign-in popup was blocked by your browser. Please allow popups for this site and try again.';
    case 'auth/cancelled-popup-request':
      return 'A sign-in request is already in progress. Please use the open popup window.';
    case 'auth/network-request-failed':
      return 'Unable to reach authentication services. Please check your internet connection and try again.';
    case 'auth/unauthorized-domain':
      return 'This domain is not authorized in Firebase Console. Please add your domain under Firebase Authentication > Settings > Authorized domains.';
    case 'auth/account-exists-with-different-credential':
      return 'An account already exists with this email using a different sign-in method. Please sign in with that method.';
    case 'auth/invalid-credential':
      return 'Invalid credentials provided. Please try signing in again.';
    case 'auth/user-disabled':
      return 'This user account has been disabled. Please contact your organization administrator.';
    case 'auth/operation-not-allowed':
      return 'Google sign-in is not enabled in the Firebase Console. Please enable Google provider under Authentication > Sign-in method.';
    case 'auth/configuration-not-found':
      return 'Firebase Authentication is not activated yet in project "budgetmind-1ccfb". Please open Firebase Console > Authentication and click "Get started", then enable Google under Sign-in method.';
    case 'auth/timeout':
      return 'The authentication request timed out. Please try again.';
    default:
      if (message.includes('CONFIGURATION_NOT_FOUND') || message.includes('configuration-not-found')) {
        return 'Firebase Authentication is not activated yet in project "budgetmind-1ccfb". Please open Firebase Console > Authentication and click "Get started", then enable Google under Sign-in method.';
      }
      if (message.includes('API key not valid')) {
        return 'Firebase API key configuration is pending. Please configure VITE_FIREBASE_API_KEY in your environment or .env file.';
      }
      return 'Authentication service is temporarily unavailable. Please try again or sign in with workspace email.';
  }
}

/**
 * Retrieves the current Firebase user's ID token.
 * Refreshes token if expired.
 */
export async function getCurrentIdToken(forceRefresh = false): Promise<string | null> {
  if (!auth || !auth.currentUser) {
    return null;
  }
  try {
    return await auth.currentUser.getIdToken(forceRefresh);
  } catch (err) {
    console.warn('[Firebase] Failed to retrieve fresh ID token:', err);
    return null;
  }
}

/**
 * Initiates Google OAuth Sign-In via Firebase Popup
 * Returns the Firebase ID token and User Profile
 */
export async function signInWithGoogle(): Promise<{ idToken: string; user: any }> {
  if (!auth || !googleProvider) {
    throw new Error('Firebase Authentication is not initialized on this client.');
  }

  try {
    const result = await signInWithPopup(auth, googleProvider);
    const idToken = await result.user.getIdToken();
    return {
      idToken,
      user: {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
      },
    };
  } catch (err: any) {
    // If the popup was blocked on mobile, optionally attempt redirect or throw mapped message
    const friendlyMsg = mapFirebaseAuthError(err);
    const customError = new Error(friendlyMsg);
    (customError as any).code = err.code;
    throw customError;
  }
}

/**
 * Subscribes to Firebase Authentication State Changes
 */
export function onAuthChange(callback: (user: FirebaseUser | null) => void) {
  if (!auth) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
}

/**
 * Signs out the current Firebase user
 */
export async function signOutFirebase(): Promise<void> {
  if (auth) {
    await signOut(auth);
  }
}

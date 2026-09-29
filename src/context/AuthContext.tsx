import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  signInWithGoogle,
  signOutFirebase,
  onAuthChange,
  getCurrentIdToken,
  mapFirebaseAuthError
} from '../services/firebase';
import { apiClient } from '../services/apiClient';

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: string;
  organization: string;
  avatar_url?: string;
  firebase_uid?: string;
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  continueWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (userData: { full_name: string; email: string; password: string; organization?: string; role?: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('budgetmind_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('budgetmind_token') || null;
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('budgetmind_theme') as 'dark' | 'light') || 'light';
  });

  // Synchronize theme token on root element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('budgetmind_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Synchronize fallback token with apiClient
  useEffect(() => {
    apiClient.setFallbackToken(token);
  }, [token]);

  // Primary Auth Lifecycle via Firebase onAuthStateChanged
  useEffect(() => {
    let isMounted = true;

    const unsubscribe = onAuthChange(async (firebaseUser) => {
      if (!isMounted) return;

      if (firebaseUser) {
        try {
          const idToken = await firebaseUser.getIdToken();
          // Authenticate with backend using the verified Firebase token
          const res = await fetch('/api/auth/google', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${idToken}`,
            },
            body: JSON.stringify({ idToken }),
          });

          if (res.ok) {
            const data = await res.json();
            if (data.success && data.data) {
              const appUser = data.data.user;
              setUser(appUser);
              setToken(data.data.token || idToken);
              localStorage.setItem('budgetmind_user', JSON.stringify(appUser));
              localStorage.setItem('budgetmind_token', data.data.token || idToken);
              apiClient.setFallbackToken(data.data.token || idToken);
            }
          }
        } catch (err) {
          console.warn('[AuthContext] Backend sync for Firebase user notice:', err);
        }
      } else {
        // If not authenticated via Firebase, check if an existing session is in localStorage
        const storedToken = localStorage.getItem('budgetmind_token');
        if (storedToken) {
          try {
            const res = await fetch('/api/auth/me', {
              headers: { 'Authorization': `Bearer ${storedToken}` }
            });
            if (res.ok) {
              const data = await res.json();
              if (data.success && data.data) {
                setUser(data.data);
              } else {
                setUser(null);
                setToken(null);
                localStorage.removeItem('budgetmind_user');
                localStorage.removeItem('budgetmind_token');
              }
            } else {
              setUser(null);
              setToken(null);
              localStorage.removeItem('budgetmind_user');
              localStorage.removeItem('budgetmind_token');
            }
          } catch {
            // Keep existing state if offline
          }
        } else {
          setUser(null);
          setToken(null);
        }
      }

      if (isMounted) {
        setIsLoading(false);
      }
    });

    // Listen for auth expiration events dispatched by apiClient
    const handleAuthExpired = () => {
      logout();
    };
    window.addEventListener('budgetmind:auth-expired', handleAuthExpired);

    return () => {
      isMounted = false;
      unsubscribe();
      window.removeEventListener('budgetmind:auth-expired', handleAuthExpired);
    };
  }, []);

  const continueWithGoogle = async (): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      const { idToken } = await signInWithGoogle();
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`,
        },
        body: JSON.stringify({ idToken }),
      });

      const data = await res.json().catch(() => null);
      if (!data) {
        return { success: false, error: `Authentication server is unreachable (HTTP ${res.status}). Please try again shortly.` };
      }
      if (data.success && data.data) {
        setUser(data.data.user);
        const resolvedToken = data.data.token || idToken;
        setToken(resolvedToken);
        localStorage.setItem('budgetmind_user', JSON.stringify(data.data.user));
        localStorage.setItem('budgetmind_token', resolvedToken);
        apiClient.setFallbackToken(resolvedToken);
        return { success: true };
      }
      return { success: false, error: data.error || 'Backend verification failed.' };
    } catch (err: any) {
      // signInWithGoogle already maps Firebase errors to friendly messages
      const friendlyMessage = err?.message || mapFirebaseAuthError(err);
      return { success: false, error: friendlyMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setUser(data.data.user);
        setToken(data.data.token);
        localStorage.setItem('budgetmind_user', JSON.stringify(data.data.user));
        localStorage.setItem('budgetmind_token', data.data.token);
        apiClient.setFallbackToken(data.data.token);
        return { success: true };
      }
      return { success: false, error: data.error || 'Invalid credentials' };
    } catch (err: any) {
      return { success: false, error: err.message || 'Unable to connect to authentication server' };
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: { full_name: string; email: string; password: string; organization?: string; role?: string }): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setUser(data.data.user);
        setToken(data.data.token);
        localStorage.setItem('budgetmind_user', JSON.stringify(data.data.user));
        localStorage.setItem('budgetmind_token', data.data.token);
        apiClient.setFallbackToken(data.data.token);
        return { success: true };
      }
      return { success: false, error: data.error || 'Failed to create account' };
    } catch (err: any) {
      return { success: false, error: err.message || 'Unable to connect to authentication server' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await signOutFirebase();
      await fetch('/api/auth/logout', { method: 'POST' }).catch(() => {});
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem('budgetmind_user');
      localStorage.removeItem('budgetmind_token');
      apiClient.setFallbackToken(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: Boolean(user),
        isLoading,
        theme,
        toggleTheme,
        continueWithGoogle,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

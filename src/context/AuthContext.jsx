import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../utils/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { signInWithPopup } from 'firebase/auth';
import { provider } from '../utils/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('insuranceAgent');
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      // Force admin role
      parsed.role = 'admin';
      setAuthState({
        user: parsed,
        isLoading: false,
        isAuthenticated: true,
      });
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const checkCookies = async () => {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // Always set as admin
          const agentData = {
            id: user.uid,
            role: 'admin',
            name: user.displayName || 'AgroSure Admin',
          };

          setAuthState({
            user: agentData,
            isAuthenticated: true,
            isLoading: false,
          });

          localStorage.setItem('insuranceAgent', JSON.stringify(agentData));
          resolve(1);
        } else {
          setAuthState(prev => ({ ...prev, isLoading: false }));
          resolve(0);
        }
      });
    });
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // ALL users are admins in admin panel
      const loggedInUser = {
        id: userCredential.user.uid,
        role: 'admin',
        name: userCredential.user.displayName || 'AgroSure Admin',
      };

      setAuthState({
        user: loggedInUser,
        isAuthenticated: true,
        isLoading: false
      });

      localStorage.setItem('insuranceAgent', JSON.stringify(loggedInUser));
      console.log('Admin login successful');

    } catch (error) {
      console.error('Login error:', error.message);
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    localStorage.removeItem('insuranceAgent');
    auth.signOut();
    setAuthState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
  };

  const handleGoogleLogin = async () => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    try {
      const result = await signInWithPopup(auth, provider);

      // Always admin
      const adminUser = {
        id: result.user.uid,
        role: 'admin',
        name: result.user.displayName || 'AgroSure Admin',
      };

      setAuthState({
        user: adminUser,
        isAuthenticated: true,
        isLoading: false,
      });

      localStorage.setItem('insuranceAgent', JSON.stringify(adminUser));
    } catch (error) {
      console.error("Login error:", error);
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const handleLogout = () => {
    auth.signOut();
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
    localStorage.removeItem('insuranceAgent');
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, handleGoogleLogin, handleLogout, checkCookies }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
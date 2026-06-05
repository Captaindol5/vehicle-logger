import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../firebase/config';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const AuthContext = createContext();
const PROFILE_KEY_PREFIX = 'motify_profile_';

const saveProfileData = async (uid, profile) => {
  try {
    console.log("Sending profile to backend...", profile);
    const response = await fetch(`http://localhost:5000/api/users/${uid}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile)
    });
    if (!response.ok) {
      console.error("Backend returned error status:", response.status, await response.text());
    } else {
      console.log("Profile successfully saved to backend!");
    }
  } catch (error) {
    console.error('Failed to save profile to db (network error)', error);
  }
};

const loadProfileData = async (uid) => {
  try {
    const res = await fetch(`http://localhost:5000/api/users/${uid}`);
    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.error('Failed to load profile from db', error);
  }
  return {};
};

const buildUserData = (firebaseUser, profile = {}) => {
  if (!firebaseUser) return null;
  const firstName = profile.firstName || '';
  const lastName = profile.lastName || '';

  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName || `${firstName} ${lastName}`.trim(),
    firstName,
    lastName,
    phone: profile.phone || '',
    address: profile.address || '',
  };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const profile = await loadProfileData(currentUser.uid) || {};
        setUser(buildUserData(currentUser, profile));
      } else {
        setUser(null);
      }
      setLoading(false);
    }, (error) => {
      console.error('Auth error', error);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    if (result.user) {
      const profile = await loadProfileData(result.user.uid) || {};
      setUser(buildUserData(result.user, profile));
    }
    return result;
  };

  const signup = async (email, password, profile = {}) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    if (result.user) {
      await saveProfileData(result.user.uid, profile);
      try {
        await updateProfile(result.user, { displayName: `${profile.firstName || ''} ${profile.lastName || ''}`.trim() });
      } catch (error) {
        console.warn('Could not update auth displayName', error);
      }
      setUser(buildUserData(result.user, profile));
    }
    return result;
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

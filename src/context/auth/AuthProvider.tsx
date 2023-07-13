import React, { useState, useEffect } from "react";
import {
  User,
  browserLocalPersistence,
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendEmailVerification as firebaseSendEmailVerification,
} from "firebase/auth";

import { IAuthContext } from "../../interfaces/context/firebase";
import { AuthContext } from ".";
import { USER_PATH } from "../../navigation/pagePaths";

export const AuthProvider = (props: { children: any }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const auth = getAuth();

  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    } catch (e) {
      throw new Error("Error signing in: " + e);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    } catch (e) {
      throw new Error("Error signing up: " + e);
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (e) {
      throw new Error("Error signing out: " + e);
    }
  };

  const sendEmailVerification = async (user: User) => {
    try {
      await firebaseSendEmailVerification(user, {
        url: `http://localhost:5280` + USER_PATH,
      });
    } catch (e) {
      throw new Error("Error sending email verification: " + e);
    }
  };

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence);
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const contextValue: IAuthContext = {
    user,
    isLoading,
    signIn,
    signUp,
    signOut,
    sendEmailVerification,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

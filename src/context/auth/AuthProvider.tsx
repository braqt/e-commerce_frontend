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
  sendPasswordResetEmail,
} from "firebase/auth";

import sanitizedConfig from "../../constants/config";
import { IAuthContext } from "../../interfaces/context/firebase";
import { AuthContext } from ".";
import { SIGN_IN_PATH, USER_PATH } from "../../navigation/pagePaths";

export const AuthProvider = (props: { children: any }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const auth = getAuth();

  const signIn = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  };

  const signUp = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  const sendEmailVerification = async (user: User) => {
    await firebaseSendEmailVerification(user, {
      url: sanitizedConfig.FRONT_END_DOMAIN + USER_PATH,
    });
  };

  const sendEmailToResetPassord = async (email: string) => {
    await sendPasswordResetEmail(auth, email, {
      url: sanitizedConfig.FRONT_END_DOMAIN + SIGN_IN_PATH,
    });
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
    sendEmailToResetPassord,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

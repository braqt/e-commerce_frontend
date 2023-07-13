import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { useAuthentication } from "../context/auth";
import SpinnerLoader from "../components/loaders/spinnerLoader";
import VerifyEmailPanel from "../components/panels/verifyEmail";
import {
  HOME_PATH,
  SIGN_IN_PATH,
  SIGN_UP_PATH,
  USER_PATH,
} from "../navigation/pagePaths";

export enum AccessType {
  SIGN_IN = "SIGN_IN",
  SIGN_UP = "SIGN_UP",
}

interface Props {
  accessTypeInitialValue: AccessType;
}

const AccessPage = ({ accessTypeInitialValue }: Props) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessType, setAccessType] = useState(accessTypeInitialValue);
  const [isSigningInOrSigningUp, setIsSigningInOrSigningUp] = useState(false);

  const { user, isLoading, signIn, signUp, sendEmailVerification } =
    useAuthentication();

  const onClickSignIn = async () => {
    try {
      setIsSigningInOrSigningUp(true);
      const user = await signIn(email, password);
      if (!user.emailVerified) {
        sendEmailVerification(user);
        setIsSigningInOrSigningUp(false);
      } else {
        navigate(HOME_PATH);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onClickSignUp = async () => {
    try {
      setIsSigningInOrSigningUp(true);
      const user = await signUp(email, password);
      if (!user.emailVerified) {
        sendEmailVerification(user);
      }
      setIsSigningInOrSigningUp(false);
    } catch (e) {
      console.error(e);
    }
  };

  const changeAccessType = (accessType: AccessType) => {
    setAccessType(accessType);
    if (accessType == AccessType.SIGN_IN) {
      navigate(SIGN_IN_PATH, { replace: true });
    }
    if (accessType == AccessType.SIGN_UP) {
      navigate(SIGN_UP_PATH, { replace: true });
    }
  };

  return (
    <div>
      {(isSigningInOrSigningUp || isLoading) && <SpinnerLoader />}
      {!isSigningInOrSigningUp && !isLoading && (
        <>
          {user && user.emailVerified && <Navigate to={USER_PATH} replace />}
          {user && !user.emailVerified && (
            <VerifyEmailPanel
              email={user.email ?? ""}
              onClickButton={() => {
                sendEmailVerification(user);
              }}
            />
          )}
          {!user && (
            <>
              {accessType == AccessType.SIGN_IN && <div>Sign In</div>}
              {accessType == AccessType.SIGN_UP && <div>Sign Up</div>}
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {accessType == AccessType.SIGN_IN && (
                <button onClick={onClickSignIn}>sign in</button>
              )}
              {accessType == AccessType.SIGN_UP && (
                <button onClick={onClickSignUp}>sign up</button>
              )}
              {accessType == AccessType.SIGN_IN && (
                <div
                  onClick={() => {
                    changeAccessType(AccessType.SIGN_UP);
                  }}
                >
                  go to sign up
                </div>
              )}
              {accessType == AccessType.SIGN_UP && (
                <div
                  onClick={() => {
                    changeAccessType(AccessType.SIGN_IN);
                  }}
                >
                  go to sign in
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default AccessPage;

import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import globalStyles from "../../index.module.css";
import styles from "./index.module.css";

import { useAuthentication } from "../../context/auth";
import {
  SIGN_IN_PATH,
  SIGN_UP_PATH,
  USER_PATH,
  VERIFY_EMAIL_PATH,
} from "../../navigation/pagePaths";
import SignIn from "../../components/panels/Access/SignIn";
import SignUp from "../../components/panels/Access/SignUp";

export enum AccessType {
  SIGN_IN = "SIGN_IN",
  SIGN_UP = "SIGN_UP",
}

interface Props {
  accessTypeInitialValue: AccessType;
}

const AccessPage = ({ accessTypeInitialValue }: Props) => {
  const navigate = useNavigate();

  const [accessType, setAccessType] = useState(accessTypeInitialValue);
  const { user, isLoading } = useAuthentication();

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
    <div className={globalStyles.pageFrame}>
      {!isLoading && (
        <>
          {user && user.emailVerified && <Navigate to={USER_PATH} replace />}
          {user && !user.emailVerified && (
            <Navigate to={VERIFY_EMAIL_PATH} replace />
          )}
          {!user && (
            <>
              <div className={styles.companyName}>Company</div>
              <div className={styles.accessPanel}>
                {accessType == AccessType.SIGN_IN && (
                  <SignIn
                    onClickGoToSignUpPageButton={() => {
                      changeAccessType(AccessType.SIGN_UP);
                    }}
                  />
                )}
                {accessType == AccessType.SIGN_UP && (
                  <SignUp
                    onClickGoToSignInPageButton={() => {
                      changeAccessType(AccessType.SIGN_IN);
                    }}
                  />
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default AccessPage;

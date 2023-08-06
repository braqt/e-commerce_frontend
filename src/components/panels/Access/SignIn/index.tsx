import React, { useState } from "react";

import accessStyles from "../index.module.css";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";
import { AuthError } from "firebase/auth";

import { useAuthentication } from "../../../../context/auth";
import { getMessageFromAuthError } from "../../../../utils/firebase";
import { RESTORE_PASSWORD_PATH } from "../../../../navigation/pagePaths";
import StyledInput from "../../../Input/StyledInput";

interface Props {
  onClickGoToSignUpPageButton: () => void;
}

const SignIn = ({ onClickGoToSignUpPageButton }: Props) => {
  const navigate = useNavigate();
  const { signIn } = useAuthentication();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onClickSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (email && password) {
      try {
        await signIn(email, password);
      } catch (e) {
        setError(getMessageFromAuthError(e as AuthError));
      }
    }
  };

  const onClickForgotPassword = () => {
    navigate(RESTORE_PASSWORD_PATH);
  };

  return (
    <div>
      <div className={accessStyles.accessPanelTitle}>Sign In</div>
      <form onSubmit={onClickSignIn}>
        {error && (
          <div
            className={accessStyles.errorLabel}
            style={{ marginBottom: "20px" }}
          >
            {error}
          </div>
        )}
        <div className={accessStyles.inputs} style={{ marginTop: "30px" }}>
          <div className={accessStyles.labelAndInput}>
            <div>Email</div>
            <StyledInput
              required
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
          </div>
          <div className={accessStyles.labelAndInput}>
            <div>Password</div>
            <StyledInput
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              type="password"
            />
          </div>
        </div>
        <div className={styles.forgotPassword}>
          <label style={{ cursor: "pointer" }} onClick={onClickForgotPassword}>
            Forgot Password?
          </label>
        </div>
        <div style={{ marginTop: "30px", textAlign: "center" }}>
          <button type="submit">sign in</button>
        </div>
      </form>
      <div
        style={{
          margin: "40px 0px",
          textAlign: "center",
          fontStyle: "0.9375rem",
        }}
      >
        <label style={{ marginRight: "5px" }}>
          Do you already have an account?
        </label>
        <label
          className={accessStyles.clickableLabel}
          onClick={onClickGoToSignUpPageButton}
        >
          sign up
        </label>
      </div>
    </div>
  );
};

export default SignIn;

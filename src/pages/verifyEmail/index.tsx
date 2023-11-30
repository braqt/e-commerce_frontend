import React, { useEffect, useState } from "react";

import globalStyles from "../../index.module.css";
import accesStyles from "../Access/index.module.css";
import { MdOutlineEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AuthError } from "firebase/auth";

import { useAuthentication } from "../../context/auth";
import { getMessageFromAuthError } from "../../utils/firebase";
import { SIGN_IN_PATH } from "../../navigation/pagePaths";

const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const { user, isLoading, sendEmailVerification } = useAuthentication();
  const [emailSentSuccessfully, setEmailSentSuccessfully] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  const sendPasswordResetEmail = async () => {
    if (user) {
      setError("");
      try {
        await sendEmailVerification(user);
        setEmailSentSuccessfully(true);
      } catch (e) {
        setError(getMessageFromAuthError(e as AuthError));
      }
    }
  };

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        if (!user.emailVerified && user.email) {
          setEmail(user.email);
        } else {
          navigate(SIGN_IN_PATH);
        }
      } else {
        navigate(SIGN_IN_PATH);
      }
    }
  }, [isLoading]);

  return (
    <div className={globalStyles.pageFrame}>
      <div className={accesStyles.companyName}>Company</div>
      <div className={globalStyles.authTitle} style={{ marginTop: "40px" }}>
        Verify Email
      </div>

      {!emailSentSuccessfully && (
        <>
          <div className={globalStyles.authSubTitle}>
            {error && (
              <div
                className={`${globalStyles.resultLabel} ${globalStyles.errorLabel}`}
                style={{ marginBottom: "16px" }}
              >
                {error}
              </div>
            )}
            <div>An email will be sent to verify your email</div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "18px",
            }}
          >
            <div>
              <label>Email: </label>
              <label style={{ fontWeight: 600 }}>{email}</label>
            </div>
            <button
              type="submit"
              style={{ marginTop: "30px" }}
              onClick={sendPasswordResetEmail}
            >
              Send Email Again
            </button>
          </div>
        </>
      )}
      {emailSentSuccessfully && (
        <div
          style={{
            marginTop: "18px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <MdOutlineEmail size={52} style={{ fill: "var(--successColor)" }} />
          </div>
          <div
            className={`${globalStyles.resultLabel} ${globalStyles.successLabel}`}
            style={{ textAlign: "center" }}
          >
            An email was sent to verify your email
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmailPage;

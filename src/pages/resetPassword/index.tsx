import React, { useState } from "react";

import globalStyles from "../../index.module.css";
import accesStyles from "../Access/index.module.css";
import styles from "./index.module.css";
import { AuthError } from "firebase/auth";
import { MdOutlineEmail } from "react-icons/md";

import { useAuthentication } from "../../context/auth";
import { getMessageFromAuthError } from "../../utils/firebase";
import StyledInput from "../../components/Input/StyledInput";

const ResetPasswordPage = () => {
  const { sendEmailToResetPassord } = useAuthentication();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [emailSentSuccessfully, setEmailSentSuccessfully] = useState(false);

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const sendPasswordResetEmail = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setError("");
    try {
      await sendEmailToResetPassord(email);
      setEmailSentSuccessfully(true);
    } catch (e) {
      setError(getMessageFromAuthError(e as AuthError));
    }
  };

  return (
    <div className={globalStyles.pageFrame}>
      <div className={accesStyles.companyName}>Company</div>
      <div className={globalStyles.authTitle} style={{ marginTop: "40px" }}>
        Restore Password
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
            <div>
              Please enter your email so we can send you a link to reset your
              password
            </div>
          </div>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "18px",
            }}
            onSubmit={sendPasswordResetEmail}
          >
            <div className={styles.labelAndInput}>
              <div>Email</div>
              <StyledInput
                required
                type="email"
                name="email"
                onChange={onChangeEmail}
                value={email}
              />
            </div>
            <button type="submit" style={{ marginTop: "30px" }}>
              Restore Password
            </button>
          </form>
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
            An email was sent to restore your password
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPasswordPage;

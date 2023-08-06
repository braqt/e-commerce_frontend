import React, { useState } from "react";

import accessStyles from "../index.module.css";
import styles from "./index.module.css";

import {
  PRIVACY_POLICIES_PATH,
  TERMS_AND_CONDITIONS_PATH,
} from "../../../../navigation/pagePaths";
import { AuthError } from "firebase/auth";
import { Checkbox } from "@mui/material";
import { useAuthentication } from "../../../../context/auth";
import { getMessageFromAuthError } from "../../../../utils/firebase";
import StyledInput from "../../../Input/StyledInput";
import NaturalNumberInput from "../../../Input/NaturalNumberInput";

interface Props {
  onClickGoToSignInPageButton: () => void;
}

const SignUp = ({ onClickGoToSignInPageButton }: Props) => {
  const { signUp } = useAuthentication();
  const [inputValues, setInputValues] = useState({
    name: "",
    lastName: "",
    phone: "",
    documentNumber: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });
  const [termsAndPrivacyPoliciesAccepted, setTermsAndPrivacyPoliciesAccepted] =
    useState(false);
  const [error, setError] = useState("");

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const onClickCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermsAndPrivacyPoliciesAccepted(e.target.checked);
  };

  const allPersonalDataValid = () => {
    return (
      inputValues.name &&
      inputValues.lastName &&
      inputValues.phone &&
      inputValues.documentNumber
    );
  };

  const onClickSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (inputValues.email != inputValues.confirmEmail) {
      setError("Email is not the same as Confirm Email");
    } else if (inputValues.password != inputValues.confirmPassword) {
      setError("Password is not the same as Confirm Password");
    } else if (!termsAndPrivacyPoliciesAccepted) {
      setError("You need to accept the Terms And Privacy Policies");
    } else {
      if (allPersonalDataValid()) {
        try {
          await signUp(inputValues.email, inputValues.password);
        } catch (e) {
          setError(getMessageFromAuthError(e as AuthError));
        }
      } else {
        setError("Complete all the Personal Data");
      }
    }
  };

  return (
    <div>
      <div className={accessStyles.accessPanelTitle}>SignUp</div>
      <div style={{ marginTop: "30px" }}>
        <form onSubmit={onClickSignUp}>
          {error && (
            <div
              className={accessStyles.errorLabel}
              style={{ marginBottom: "20px" }}
            >
              {error}
            </div>
          )}
          <div
            style={{
              display: "flex",
              gap: "20px",
            }}
          >
            <div>
              <div className={styles.title}>Personal Data</div>
              <div className={accessStyles.inputs}>
                <div className={accessStyles.labelAndInput}>
                  <div>Name</div>
                  <StyledInput
                    required
                    name="name"
                    onChange={onChangeInput}
                    value={inputValues.name}
                  />
                </div>
                <div className={accessStyles.labelAndInput}>
                  <div>Last Name</div>
                  <StyledInput
                    required
                    name="lastName"
                    onChange={onChangeInput}
                    value={inputValues.lastName}
                  />
                </div>
                <div className={accessStyles.labelAndInput}>
                  <div>Phone</div>
                  <NaturalNumberInput
                    required
                    type="tel"
                    name="phone"
                    onChange={onChangeInput}
                    value={inputValues.phone}
                  />
                </div>
                <div className={accessStyles.labelAndInput}>
                  <div>Document Number</div>
                  <NaturalNumberInput
                    required
                    name="documentNumber"
                    onChange={onChangeInput}
                    value={inputValues.documentNumber}
                  />
                </div>
              </div>
            </div>
            <div>
              <div className={styles.title}>Account</div>
              <div className={accessStyles.inputs}>
                <div className={accessStyles.labelAndInput}>
                  <div>Email</div>
                  <StyledInput
                    required
                    type="email"
                    name="email"
                    onChange={onChangeInput}
                    value={inputValues.email}
                  />
                </div>
                <div className={accessStyles.labelAndInput}>
                  <div>Confirm Email</div>
                  <StyledInput
                    required
                    type="email"
                    name="confirmEmail"
                    onChange={onChangeInput}
                    value={inputValues.confirmEmail}
                  />
                </div>
                <div className={accessStyles.labelAndInput}>
                  <div>Password</div>
                  <StyledInput
                    required
                    type="password"
                    name="password"
                    onChange={onChangeInput}
                    value={inputValues.password}
                  />
                </div>
                <div className={accessStyles.labelAndInput}>
                  <div>Confirm Password</div>
                  <StyledInput
                    required
                    type="password"
                    name="confirmPassword"
                    onChange={onChangeInput}
                    value={inputValues.confirmPassword}
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              margin: "26px auto 0px auto",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              maxWidth: "340px",
            }}
          >
            <Checkbox
              onChange={onClickCheckbox}
              value={termsAndPrivacyPoliciesAccepted}
            />
            <span>
              <label>I have read and accept the </label>
              <a
                className={accessStyles.styledAnchor}
                href={TERMS_AND_CONDITIONS_PATH}
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms of service
              </a>{" "}
              and{" "}
              <a
                className={accessStyles.styledAnchor}
                href={PRIVACY_POLICIES_PATH}
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policies
              </a>
            </span>
          </div>
          <div style={{ marginTop: "25px", textAlign: "center" }}>
            <button type="submit">create account</button>
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
            onClick={onClickGoToSignInPageButton}
          >
            sign in
          </label>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

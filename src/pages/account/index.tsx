import React, { useState, useEffect } from "react";

import globalStyles from "../../index.module.css";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";

import { useAuthentication } from "../../context/auth";
import { getAccount } from "../../services/userService";
import { Account } from "../../services/interfaces";
import { RESTORE_PASSWORD_PATH } from "../../navigation/pagePaths";
import SpinnerLoader from "../../components/loaders/spinnerLoader";

const AccountPage = () => {
  const navigate = useNavigate();
  const [account, setAccount] = useState<Account>();
  const [loadingAccount, setLoadingAccount] = useState(true);
  const { user } = useAuthentication();

  const fetchAndSetAccount = async () => {
    if (user) {
      const firebaseAuthToken = await user.getIdToken();
      const account = await getAccount(firebaseAuthToken);
      setAccount(account);
      setLoadingAccount(false);
    }
  };

  const onClickOnChangePassword = () => {
    navigate(RESTORE_PASSWORD_PATH);
  };

  useEffect(() => {
    fetchAndSetAccount();
  }, []);

  return (
    <div className={globalStyles.pageFrame}>
      {loadingAccount && <SpinnerLoader />}
      {!loadingAccount && account && (
        <>
          <div>My Account</div>
          <div>
            <div
              style={{
                fontSize: "1.25rem",
                fontWeight: 600,
                padding: "10px 0px 10px 20px",
              }}
            >
              My personal data
            </div>
            <div style={{ borderBottom: "1px solid black" }}></div>
            <div
              style={{
                paddingLeft: "32px",
                marginTop: "20px",
                display: "flex",
                flexWrap: "wrap",
                gap: "18px 80px",
              }}
            >
              <span>
                <label className={styles.descriptionName}>Name:</label>
                <label>{account.name}</label>
              </span>
              <span>
                <label className={styles.descriptionName}>Last Name:</label>
                <label>{account.lastName}</label>
              </span>
              <span>
                <label className={styles.descriptionName}>Phone:</label>
                <label>{account.phone}</label>
              </span>
              <span>
                <label className={styles.descriptionName}>
                  Document Number:
                </label>
                <label>{account.dni}</label>
              </span>
            </div>
          </div>

          <div style={{ marginTop: "45px" }}>
            <div
              style={{
                fontSize: "1.25rem",
                fontWeight: 600,
                padding: "10px 0px 10px 20px",
              }}
            >
              My personal data
            </div>
            <div style={{ borderBottom: "1px solid black" }}></div>
            <div
              style={{
                paddingLeft: "32px",
              }}
            >
              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "18px 80px",
                }}
              >
                <span>
                  <label className={styles.descriptionName}>Email:</label>
                  <label>{account.email}</label>
                </span>
                <span>
                  <label className={styles.descriptionName}>
                    Email Verificado:
                  </label>
                  <label>{account.emailVerified ? "Yes" : "No"}</label>
                </span>
              </div>
              <div
                style={{
                  marginTop: "22px",
                }}
              >
                <button onClick={onClickOnChangePassword}>
                  cambiar contraseña
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AccountPage;

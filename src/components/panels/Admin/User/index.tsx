import React, { useEffect, useState } from "react";

import globalStyles from "../../../../index.module.css";
import adminPanelstyles from "../index.module.css";
import styles from "./index.module.css";

import { useAuthentication } from "../../../../context/auth";
import {
  AccountWithStatistics,
  UserOrder,
} from "../../../../services/interfaces";
import {
  getAdminUser,
  getAdminUserOrders,
} from "../../../../services/adminService";
import SpinnerLoader from "../../../loaders/spinnerLoader";
import { useParams } from "react-router-dom";
import UserOrdersTable from "../../../UserOrdersTable";
import {
  centsToCurrencyNormalValue,
  timestampToRelativeData,
} from "../../../../utils/conversions";

const UserPanel = () => {
  const { idUser } = useParams();
  const { user: authUser, firebaseAuthToken } = useAuthentication();
  const [user, setUser] = useState<AccountWithStatistics>();
  const [userOrders, setUserOrders] = useState<UserOrder[]>([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingUserOrders, setLoadingUserOrders] = useState(true);

  const fetchAndSetUserAndUserOrders = async () => {
    if (authUser && idUser) {
      const acccount = await getAdminUser(idUser, firebaseAuthToken);
      setUser(acccount);
      setLoadingUser(false);
      const { orders } = await getAdminUserOrders(
        1,
        10,
        idUser,
        firebaseAuthToken
      );
      setUserOrders(orders);
      setLoadingUserOrders(false);
    }
  };

  useEffect(() => {
    fetchAndSetUserAndUserOrders();
  }, []);

  return (
    <>
      {!loadingUser && user && (
        <div className={globalStyles.pageFrame2}>
          <div className={adminPanelstyles.title}>User</div>
          <div className={styles.clientInformation}>
            <div
              style={{
                padding: "18px 20px 20px",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 1px 4px",
                borderRadius: "4px",
              }}
            >
              <div
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 500,
                  textAlign: "start",
                }}
              >
                {user?.name} {user?.lastName}
              </div>
              <div
                style={{
                  marginTop: "6px",
                  textAlign: "start",
                  color: "#4c4c4c",
                }}
              >
                User joined {timestampToRelativeData(user?.createdAt)}
              </div>
              <div style={{ marginTop: "60px" }}>
                <hr />
                <div
                  style={{
                    marginTop: "18px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div className={styles.userStatistics}>
                    <div>Total value of purchases</div>
                    <div>
                      Bs{" "}
                      {centsToCurrencyNormalValue(
                        user?.statistics.totalSpentInCents
                      )}
                    </div>
                  </div>
                  <div className={styles.userStatistics}>
                    <div>Number of completed orders</div>
                    <div>{user?.statistics.numberOfCompletedOrders}</div>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                padding: "18px 20px 20px",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 1px 4px",
                borderRadius: "4px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div style={{ fontSize: "2rem", fontWeight: 500 }}>Contact</div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
              >
                <span className={styles.userData}>
                  <label>Email Verified:</label>
                  <label>{user.emailVerified ? "no" : "yes"}</label>
                </span>
                <span className={styles.userData}>
                  <label>Email:</label>
                  <label>{user.email}</label>
                </span>
                <span className={styles.userData}>
                  <label>Phone:</label>
                  <label>{user.phone}</label>
                </span>
                <span className={styles.userData}>
                  <label>Document Number</label>
                  <label>{user.dni}</label>
                </span>
              </div>
            </div>
          </div>
          <div
            style={{ marginTop: "18px", height: "300px", position: "relative" }}
          >
            {loadingUserOrders && <SpinnerLoader />}
            {!loadingUserOrders && <UserOrdersTable orders={userOrders} />}
          </div>
        </div>
      )}
      {loadingUser && (
        <div className={globalStyles.pageFrame2}>
          <SpinnerLoader />
        </div>
      )}
    </>
  );
};

export default UserPanel;

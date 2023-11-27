import React, { useEffect, useState } from "react";

import globalStyles from "../../index.module.css";
import styles from "./index.module.css";

import {
  getActiveOrders,
  getCompletedOrders,
  getNotCompletedOrders,
} from "../../services";
import { useAuthentication } from "../../context/auth";
import { IOrder } from "../../interfaces/context";
import OrderAccordion from "../../components/OrderAccordion";
import SpinnerLoader from "../../components/loaders/spinnerLoader";

const MyOrdersPage = () => {
  const { user } = useAuthentication();
  const [activeOrders, setActiveOrders] = useState<IOrder[]>([]);
  const [completedOrders, setCompletedOrders] = useState<IOrder[]>([]);
  const [notCompletedOrders, setNotCompletedOrders] = useState<IOrder[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  const fetchAndSetOrders = async () => {
    if (user) {
      const firebaseAuthToken = await user.getIdToken();
      const getActiveOrdersResponse = await getActiveOrders(
        1,
        10,
        firebaseAuthToken
      );
      setActiveOrders(getActiveOrdersResponse.activeOrders);
      const getCompletedOrdersResponse = await getCompletedOrders(
        1,
        10,
        firebaseAuthToken
      );
      setCompletedOrders(getCompletedOrdersResponse.completedOrders);
      const getNotCompletedOrdersResponse = await getNotCompletedOrders(
        1,
        10,
        firebaseAuthToken
      );
      setNotCompletedOrders(getNotCompletedOrdersResponse.notCompletedOrders);
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    fetchAndSetOrders();
  }, []);

  return (
    <div className={globalStyles.pageFrame}>
      <div>My Orders</div>
      {loadingOrders && <SpinnerLoader />}
      {!loadingOrders && (
        <div style={{ marginTop: "60px" }}>
          <div style={{ margin: "40px 0px 20px 0px" }}>Active Orders</div>
          <div className={styles.orders}>
            {activeOrders.length > 0 &&
              activeOrders.map((activeOrder) => (
                <OrderAccordion
                  key={activeOrder.orderNumber}
                  order={activeOrder}
                />
              ))}
            {activeOrders.length == 0 && (
              <div className={styles.noOrdersFound}>No Orders Found Here</div>
            )}
          </div>

          <div style={{ margin: "40px 0px 20px 0px" }}>Completed Orders</div>
          <div className={styles.orders}>
            {completedOrders.length > 0 &&
              completedOrders.map((completedOrder) => (
                <OrderAccordion
                  key={completedOrder.orderNumber}
                  order={completedOrder}
                />
              ))}
            {completedOrders.length == 0 && (
              <div className={styles.noOrdersFound}>No Orders Found Here</div>
            )}
          </div>

          <div style={{ margin: "40px 0px 20px 0px" }}>
            Not Completed Orders
          </div>
          <div className={styles.orders}>
            {notCompletedOrders.length > 0 &&
              notCompletedOrders.map((notCompletedOrder) => (
                <OrderAccordion
                  key={notCompletedOrder.orderNumber}
                  order={notCompletedOrder}
                />
              ))}
            {notCompletedOrders.length == 0 && (
              <div className={styles.noOrdersFound}>No Orders Found Here</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrdersPage;

import React, { useEffect, useState } from "react";

import globalStyles from "../../../../index.module.css";
import adminPanelStyles from "../index.module.css";
import styles from "./index.module.css";

import { useAuthentication } from "../../../../context/auth";
import { Order } from "../../../../services/interfaces";
import { getAdminOrders } from "../../../../services/adminService";
import StyledInput from "../../../Input/StyledInput";
import SpinnerLoader from "../../../loaders/spinnerLoader";
import OrdersTable from "../../../OrdersTable";

const OrdersPanel = () => {
  const { user, firebaseAuthToken } = useAuthentication();
  const [orders, setOrders] = useState<Order[]>([]);
  const [clientName, setClientName] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [loadingOrders, setLoadingOrders] = useState(true);

  const fetchAndSetOrders = async () => {
    if (user) {
      setLoadingOrders(true);
      const response = await getAdminOrders(1, 40, firebaseAuthToken, {
        clientName,
        orderNumber,
      });
      setOrders(response.orders);
      setLoadingOrders(false);
    }
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClientName(e.target.value);
  };

  const onChangeOrderNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrderNumber(e.target.value);
  };

  useEffect(() => {
    fetchAndSetOrders();
  }, []);

  return (
    <div className={globalStyles.pageFrame2}>
      <div className={adminPanelStyles.title}>Orders</div>
      <div className={styles.filters}>
        <StyledInput
          style={{ width: "140px" }}
          value={orderNumber}
          onChange={onChangeOrderNumber}
          placeholder="Order Number"
        />
        <StyledInput
          style={{ width: "240px" }}
          value={clientName}
          onChange={onChangeName}
          placeholder="Client Name"
        />
        <button onClick={fetchAndSetOrders}>search</button>
      </div>
      <div style={{ marginTop: "18px", height: "300px", position: "relative" }}>
        {loadingOrders && <SpinnerLoader />}
        {!loadingOrders && <OrdersTable orders={orders} />}
      </div>
    </div>
  );
};

export default OrdersPanel;

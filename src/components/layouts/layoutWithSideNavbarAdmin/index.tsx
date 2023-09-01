import React from "react";

import styles from "./index.module.css";

import { MdDescription, MdInventory, MdPerson } from "react-icons/md";
import { Outlet, useNavigate } from "react-router-dom";

import {
  ADMIN_ORDERS,
  ADMIN_PRODUCTS,
  ADMIN_USERS,
} from "../../../navigation/pagePaths";

const LayoutWithSideNavBarAdmin = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.frame}>
      <div className={styles.sideNavBar}>
        <div
          className={styles.sideNavBarOption}
          onClick={() => {
            navigate(ADMIN_PRODUCTS);
          }}
        >
          <MdInventory />
          <div>Products</div>
        </div>
        <div
          className={styles.sideNavBarOption}
          onClick={() => {
            navigate(ADMIN_USERS);
          }}
        >
          <MdPerson />
          <div>Users</div>
        </div>
        <div
          className={styles.sideNavBarOption}
          onClick={() => {
            navigate(ADMIN_ORDERS);
          }}
        >
          <MdDescription />
          <div>Orders</div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default LayoutWithSideNavBarAdmin;

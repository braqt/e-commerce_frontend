import React from "react";

import styles from "./index.module.css";

import { MdDescription, MdInventory, MdPerson } from "react-icons/md";
import { Outlet } from "react-router-dom";

const LayoutWithSideNavBarAdmin = () => {
  return (
    <div className={styles.frame}>
      <div className={styles.sideNavBar}>
        <div className={styles.sideNavBarOption}>
          <MdInventory />
          <div>Products</div>
        </div>
        <div className={styles.sideNavBarOption}>
          <MdPerson />
          <div>User</div>
        </div>
        <div className={styles.sideNavBarOption}>
          <MdDescription />
          <div>Orders</div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default LayoutWithSideNavBarAdmin;

import React, { useEffect, useState } from "react";

import globalStyles from "../../../../index.module.css";
import adminPanelStyles from "../index.module.css";
import styles from "./index.module.css";

import { useAuthentication } from "../../../../context/auth";
import { AccountWithStatistics } from "../../../../services/interfaces";
import { getAdminUsers } from "../../../../services/adminService";
import StyledInput from "../../../Input/StyledInput";
import SpinnerLoader from "../../../loaders/spinnerLoader";
import UsersTable from "../../../UsersTable";

const UsersPanel = () => {
  const { user, firebaseAuthToken } = useAuthentication();
  const [users, setUsers] = useState<AccountWithStatistics[]>([]);
  const [clientName, setClientName] = useState("");
  const [loadingUsers, setLoadingUsers] = useState(true);

  const fetchAndSetUsers = async () => {
    if (user) {
      setLoadingUsers(true);
      const response = await getAdminUsers(1, 40, firebaseAuthToken, {
        clientName,
      });
      setUsers(response.users);
      setLoadingUsers(false);
    }
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClientName(e.target.value);
  };

  useEffect(() => {
    fetchAndSetUsers();
  }, []);

  return (
    <div className={globalStyles.pageFrame2}>
      <div className={adminPanelStyles.title}>Users</div>
      <div className={styles.filters}>
        <StyledInput
          style={{ width: "240px" }}
          value={clientName}
          onChange={onChangeName}
          placeholder="Client Name"
        />
        <button onClick={fetchAndSetUsers}>search</button>
      </div>
      <div style={{ marginTop: "18px", height: "300px", position: "relative" }}>
        {loadingUsers && <SpinnerLoader />}
        {!loadingUsers && <UsersTable users={users} />}
      </div>
    </div>
  );
};

export default UsersPanel;

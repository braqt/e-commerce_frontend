import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { PAGE_NOT_FOUND_PATH } from "../../../navigation/pagePaths";

import { Account } from "../../../services/interfaces";
import { useAuthentication } from "../../../context/auth";

import { getAccount } from "../../../services/userService";

import OrderPanel from "../../../components/panels/Admin/Order";
import SpinnerLoader from "../../../components/loaders/spinnerLoader";

const AdminOrderPage = () => {
  const { firebaseAuthToken, isLoading, user } = useAuthentication();
  const [account, setAccount] = useState<Account>();

  const fetchAccount = async () => {
    const account = await getAccount(firebaseAuthToken);
    setAccount(account);
  };

  useEffect(() => {
    if (!isLoading && user) {
      fetchAccount();
    }
  }, [isLoading]);

  if (!isLoading && account) {
    if (account.isAdmin) {
      return <OrderPanel />;
    } else {
      return <Navigate to={PAGE_NOT_FOUND_PATH} />;
    }
  } else {
    return <SpinnerLoader />;
  }
};

export default AdminOrderPage;

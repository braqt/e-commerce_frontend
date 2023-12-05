import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthentication } from "../../context/auth";

import {
  ADMIN_PRODUCTS,
  MY_CART_PATH,
  MY_ORDERS_PATH,
  PRODUCTS_PATH,
  SIGN_IN_PATH,
  SIGN_UP_PATH,
} from "../../navigation/pagePaths";

import { Account } from "../../services/interfaces";
import { getAccount } from "../../services/userService";

import "./index.css";

const NavBar = () => {
  const navigate = useNavigate();
  const { user, firebaseAuthToken, signOut } = useAuthentication();
  const [account, setAccount] = useState<Account | null>(null);

  const fetchAccount = async () => {
    if (user) {
      const account = await getAccount(firebaseAuthToken);
      setAccount(account);
    }
  };

  const onClickSignIn = () => {
    navigate(SIGN_IN_PATH);
  };

  const onClickSignUp = () => {
    navigate(SIGN_UP_PATH);
  };

  const onClickSignOut = () => {
    signOut();
    navigate(SIGN_IN_PATH);
  };

  const onClickLogo = () => {
    navigate(PRODUCTS_PATH);
  };

  const onClickCart = () => {
    navigate(MY_CART_PATH);
  };

  const onClickAdmin = () => {
    navigate(ADMIN_PRODUCTS);
  };

  const onClickMyOrders = () => {
    navigate(MY_ORDERS_PATH);
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  return (
    <nav>
      <div style={{ cursor: "pointer" }} onClick={onClickLogo}>
        Products
      </div>
      <div>
        {user && (
          <>
            {account?.isAdmin && (
              <button style={{ marginRight: "10px" }} onClick={onClickAdmin}>
                admin
              </button>
            )}
            <button style={{ marginRight: "10px" }} onClick={onClickCart}>
              my cart
            </button>
            <button style={{ marginRight: "10px" }} onClick={onClickMyOrders}>
              my orders
            </button>
            <button onClick={onClickSignOut}>signOut</button>
          </>
        )}
        {!user && (
          <>
            <button style={{ marginRight: "8px" }} onClick={onClickSignIn}>
              signIn
            </button>
            <button onClick={onClickSignUp}>signUp</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

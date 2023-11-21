import React from "react";
import { useNavigate } from "react-router-dom";
import { RiShoppingCartLine } from "react-icons/ri";

import { useAuthentication } from "../../context/auth";

import {
  MY_CART_PATH,
  PRODUCTS_PATH,
  SIGN_IN_PATH,
  SIGN_UP_PATH,
} from "../../navigation/pagePaths";

import "./index.css";

const NavBar = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuthentication();

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

  const onClickCart = () => {
    navigate(MY_CART_PATH);
  };

  const onClickLogo = () => {
    navigate(PRODUCTS_PATH);
  };

  return (
    <nav>
      <div style={{ cursor: "pointer" }} onClick={onClickLogo}>
        Products
      </div>
      <div>
        {user && (
          <>
            <button style={{ marginRight: "10px" }} onClick={onClickCart}>
              <RiShoppingCartLine />
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

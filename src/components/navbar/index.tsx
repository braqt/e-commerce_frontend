import React from "react";
import { useAuthentication } from "../../context/auth";
import { useNavigate } from "react-router-dom";

import { SIGN_IN_PATH, SIGN_UP_PATH } from "../../navigation/pagePaths";

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
  };

  return (
    <nav>
      <div>CompanyName</div>
      <div>
        {user && <button onClick={onClickSignOut}>signOut</button>}
        {!user && (
          <>
            <button onClick={onClickSignIn}>signIn</button>
            <button onClick={onClickSignUp}>signUp</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

import React from "react";

import { Outlet } from "react-router-dom";
import { useAuthentication } from "../../../context/auth";

import SpinnerLoader from "../../loaders/spinnerLoader";
import NavbarWithoutAuthButtons from "../../navbarWithoutAuthButtons";

const LayoutWithNavBarWithoutAuthButtons = () => {
  const { isLoading } = useAuthentication();

  return (
    <>
      {!isLoading && (
        <>
          <NavbarWithoutAuthButtons />
          <div>
            <Outlet />
          </div>
        </>
      )}
      {isLoading && <SpinnerLoader />}
    </>
  );
};

export default LayoutWithNavBarWithoutAuthButtons;

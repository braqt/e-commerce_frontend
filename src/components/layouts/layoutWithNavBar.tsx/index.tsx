import React from "react";
import NavBar from "../../navbar";
import { Outlet } from "react-router-dom";
import { useAuthentication } from "../../../context/auth";
import SpinnerLoader from "../../loaders/spinnerLoader";

const LayoutWithNavbar = () => {
  const { isLoading } = useAuthentication();

  return (
    <>
      {!isLoading && (
        <>
          <NavBar />
          <div>
            <Outlet />
          </div>
        </>
      )}
      {isLoading && <SpinnerLoader />}
    </>
  );
};

export default LayoutWithNavbar;

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import {
  PRODUCTS_PATH,
  PRODUCT_PATH,
  SIGN_IN_PATH,
  SIGN_UP_PATH,
  USER_PATH,
} from "./pagePaths";
import { useAuthentication } from "../context/auth";
import HomePage from "../pages/home";
import PageNotFound from "../pages/pageNotFound";
import UserPage from "../pages/user";
import AccessPage, { AccessType } from "../pages/access";
import LayoutWithNavbar from "../components/layouts/layoutWithNavBar.tsx";
import ProductsPage from "../pages/products";
import ProductPage from "../pages/product";

interface GuardedRouteProps {
  children: React.ReactNode;
}

const GuardedRoute = ({ children }: GuardedRouteProps) => {
  const { user, isLoading } = useAuthentication();

  if (!isLoading) {
    if (user && user.emailVerified) {
      return children;
    } else {
      return <Navigate to={SIGN_IN_PATH} replace />;
    }
  }
};

const RouterConfig = () => {
  return (
    <Routes>
      <Route element={<LayoutWithNavbar />}>
        <Route path="/" element={<HomePage />} />
        <Route
          path={USER_PATH}
          element={
            <GuardedRoute>
              <UserPage />
            </GuardedRoute>
          }
        />
      </Route>
      <Route
        path={SIGN_IN_PATH}
        element={<AccessPage accessTypeInitialValue={AccessType.SIGN_IN} />}
      />
      <Route
        path={SIGN_UP_PATH}
        element={<AccessPage accessTypeInitialValue={AccessType.SIGN_UP} />}
      />
      <Route path={PRODUCTS_PATH} element={<ProductsPage />} />
      <Route path={`${PRODUCT_PATH}/:id`} element={<ProductPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default RouterConfig;

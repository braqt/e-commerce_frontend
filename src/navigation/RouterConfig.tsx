import React from "react";

import { Routes, Route, Navigate } from "react-router-dom";

import {
  CHECKOUT_PATH,
  MY_CART_PATH,
  MY_ORDERS_PATH,
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
import ProductsPage from "../pages/products";
import ProductPage from "../pages/product";
import MyCart from "../pages/myCart";
import CheckoutPage from "../pages/checkout";
import LayoutWithNavbar from "../components/layouts/layoutWithNavBar";
import LayoutWithNavBarWithoutAuthButtons from "../components/layouts/layoutWithNavBarWithoutAuthButtons";
import MyOrdersPage from "../pages/myOrders";

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
        <Route path={PRODUCTS_PATH} element={<ProductsPage />} />
        <Route path={`${PRODUCT_PATH}/:id`} element={<ProductPage />} />
        <Route path={`${MY_CART_PATH}`} element={<MyCart />} />
        <Route path={MY_ORDERS_PATH} element={<MyOrdersPage />} />
      </Route>
      <Route element={<LayoutWithNavBarWithoutAuthButtons />}>
        <Route
          path={`${CHECKOUT_PATH}`}
          element={
            <GuardedRoute>
              <CheckoutPage />
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
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default RouterConfig;

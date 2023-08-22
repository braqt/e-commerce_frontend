import React from "react";

import { Routes, Route, Navigate } from "react-router-dom";

import {
  CHECKOUT_PATH,
  MY_CART_PATH,
  MY_ORDERS_PATH,
  PRIVACY_POLICIES_PATH,
  PRODUCTS_PATH,
  PRODUCT_PATH,
  RESTORE_PASSWORD_PATH,
  SIGN_IN_PATH,
  SIGN_UP_PATH,
  TERMS_AND_CONDITIONS_PATH,
  ACCOUNT_PATH,
  VERIFY_EMAIL_PATH,
  ADMIN_PRODUCTS,
  PAGE_NOT_FOUND_PATH,
  ADMIN_ORDERS,
  ADMIN_USERS,
} from "./pagePaths";
import { useAuthentication } from "../context/auth";
import HomePage from "../pages/home";
import PageNotFound from "../pages/pageNotFound";
import AccountPage from "../pages/account";
import AccessPage, { AccessType } from "../pages/Access";
import ProductsPage from "../pages/products";
import ProductPage from "../pages/product";
import MyCart from "../pages/myCart";
import CheckoutPage from "../pages/checkout";
import LayoutWithNavbar from "../components/layouts/layoutWithNavBar";
import LayoutWithNavBarWithoutAuthButtons from "../components/layouts/layoutWithNavBarWithoutAuthButtons";
import LayoutWithSideNavBarAdmin from "../components/layouts/layoutWithSideNavbarAdmin";
import MyOrdersPage from "../pages/myOrders";
import TermsAndConditionsPage from "../pages/termsAndConditions";
import PrivacyPoliciesPage from "../pages/privacyPolicies";
import ResetPasswordPage from "../pages/resetPassword";
import VerifyEmailPage from "../pages/verifyEmail";
import AdminProductsPage from "../pages/admin/products";
import AdminOrdersPage from "../pages/admin/orders";
import AdminUsersPage from "../pages/admin/users";

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

const GuardedAdminRoute = ({ children }: GuardedRouteProps) => {
  const { user, account, isLoading } = useAuthentication();

  if (!isLoading) {
    if (user && user.emailVerified && account && account.isAdmin) {
      return children;
    } else {
      return <Navigate to={PAGE_NOT_FOUND_PATH} replace />;
    }
  }
};

const RouterConfig = () => {
  return (
    <Routes>
      <Route element={<LayoutWithNavbar />}>
        <Route path="/" element={<HomePage />} />
        <Route
          path={ACCOUNT_PATH}
          element={
            <GuardedRoute>
              <AccountPage />
            </GuardedRoute>
          }
        />
        <Route path={PRODUCTS_PATH} element={<ProductsPage />} />
        <Route path={`${PRODUCT_PATH}/:id`} element={<ProductPage />} />
        <Route path={`${MY_CART_PATH}`} element={<MyCart />} />
        <Route path={MY_ORDERS_PATH} element={<MyOrdersPage />} />
        <Route
          path={TERMS_AND_CONDITIONS_PATH}
          element={<TermsAndConditionsPage />}
        />
        <Route path={PRIVACY_POLICIES_PATH} element={<PrivacyPoliciesPage />} />
        <Route element={<LayoutWithSideNavBarAdmin />}>
          <Route
            path={ADMIN_PRODUCTS}
            element={
              <GuardedAdminRoute>
                <AdminProductsPage />
              </GuardedAdminRoute>
            }
          />
          <Route
            path={ADMIN_ORDERS}
            element={
              <GuardedAdminRoute>
                <AdminOrdersPage />
              </GuardedAdminRoute>
            }
          />
          <Route
            path={ADMIN_USERS}
            element={
              <GuardedAdminRoute>
                <AdminUsersPage />
              </GuardedAdminRoute>
            }
          />
        </Route>
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
      <Route path={RESTORE_PASSWORD_PATH} element={<ResetPasswordPage />} />
      <Route path={VERIFY_EMAIL_PATH} element={<VerifyEmailPage />} />
      <Route path={PAGE_NOT_FOUND_PATH} element={<PageNotFound />} />
      <Route path="*" element={<Navigate to={PAGE_NOT_FOUND_PATH} replace />} />
    </Routes>
  );
};

export default RouterConfig;

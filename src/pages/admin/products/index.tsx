import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import { PAGE_NOT_FOUND_PATH } from "../../../navigation/pagePaths";

import { Account } from "../../../services/interfaces";
import { useAuthentication } from "../../../context/auth";

import { getAccount } from "../../../services/userService";

import AddProductPanel from "../../../components/panels/Admin/CreateProduct";
import ProductsPanel from "../../../components/panels/Admin/Products";
import SpinnerLoader from "../../../components/loaders/spinnerLoader";

enum ProductPagePanel {
  PRODUCTS = "PRODUCTS",
  CREATE_PRODUCT = "CREATE_PRODUCT",
}

const AdminProductsPage = () => {
  const [panel, setPanel] = useState<ProductPagePanel>(
    ProductPagePanel.PRODUCTS
  );
  const { firebaseAuthToken, isLoading, user } = useAuthentication();
  const [account, setAccount] = useState<Account>();

  const fetchAccount = async () => {
    const account = await getAccount(firebaseAuthToken);
    setAccount(account);
  };

  const onCreateProduct = () => {
    setPanel(ProductPagePanel.PRODUCTS);
  };

  const onClickCreateProduct = () => {
    setPanel(ProductPagePanel.CREATE_PRODUCT);
  };

  const onClickBackButton = () => {
    setPanel(ProductPagePanel.PRODUCTS);
  };

  useEffect(() => {
    if (!isLoading && user) {
      fetchAccount();
    }
  }, [isLoading]);

  if (!isLoading && account) {
    if (account.isAdmin) {
      return (
        <>
          {panel == ProductPagePanel.CREATE_PRODUCT && (
            <AddProductPanel
              onCreateProduct={onCreateProduct}
              onClickBack={onClickBackButton}
            />
          )}
          {panel == ProductPagePanel.PRODUCTS && (
            <ProductsPanel onClickCreateProduct={onClickCreateProduct} />
          )}
        </>
      );
    } else {
      return <Navigate to={PAGE_NOT_FOUND_PATH} />;
    }
  } else {
    return <SpinnerLoader />;
  }
};

export default AdminProductsPage;

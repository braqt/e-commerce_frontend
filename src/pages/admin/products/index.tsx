import React, { useState, useEffect } from "react";

import globalStyles from "../../../index.module.css";
import styles from "./index.module.css";

import { Product } from "../../../services/interfaces";
import { getAdminProducts } from "../../../services/adminService";
import { useAuthentication } from "../../../context/auth";
import StyledInput from "../../../components/Input/StyledInput";
import ProductsTable from "../../../components/ProductsTable";
import SpinnerLoader from "../../../components/loaders/spinnerLoader";
import AddProductPanel from "../../../components/panels/Admin/CreateProduct";

enum ProductPagePanel {
  PRODUCTS = "PRODUCTS",
  CREATE_PRODUCT = "CREATE_PRODUCT",
}

const AdminProductsPage = () => {
  const { user } = useAuthentication();
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [panel, setPanel] = useState<ProductPagePanel>(
    ProductPagePanel.CREATE_PRODUCT
  );

  const fetchAndSetProducts = async () => {
    if (user) {
      setLoadingProducts(true);
      const firebaseAuthToken = await user.getIdToken();
      const response = await getAdminProducts(1, 40, firebaseAuthToken, {
        name,
      });
      setProducts(response.products);
      setLoadingProducts(false);
    }
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
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
    fetchAndSetProducts();
  }, []);

  return (
    <>
      {panel == ProductPagePanel.CREATE_PRODUCT && (
        <AddProductPanel
          onCreateProduct={onCreateProduct}
          onClickBack={onClickBackButton}
        />
      )}
      {panel == ProductPagePanel.PRODUCTS && (
        <div className={globalStyles.pageFrame2}>
          <div className={styles.title}>Products</div>
          <div className={styles.operationFrame}>
            <div className={styles.filters}>
              <StyledInput value={name} onChange={onChangeName} />
              <button onClick={fetchAndSetProducts}>search</button>
            </div>
            <button onClick={onClickCreateProduct}>+ add product</button>
          </div>
          <div
            style={{ marginTop: "18px", height: "300px", position: "relative" }}
          >
            {loadingProducts && <SpinnerLoader />}
            {!loadingProducts && <ProductsTable products={products} />}
          </div>
        </div>
      )}
    </>
  );
};

export default AdminProductsPage;

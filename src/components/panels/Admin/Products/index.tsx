import React, { useEffect, useState } from "react";

import globalStyles from "../../../../index.module.css";
import adminPanelStyles from "../index.module.css";
import styles from "./index.module.css";

import { useAuthentication } from "../../../../context/auth";
import { Product } from "../../../../services/interfaces";
import { getAdminProducts } from "../../../../services/adminService";
import StyledInput from "../../../Input/StyledInput";
import SpinnerLoader from "../../../loaders/spinnerLoader";
import ProductsTable from "../../../ProductsTable";

interface Props {
  onClickCreateProduct: () => void;
}

const ProductsPanel = ({ onClickCreateProduct }: Props) => {
  const { user } = useAuthentication();
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [loadingProducts, setLoadingProducts] = useState(true);

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

  useEffect(() => {
    fetchAndSetProducts();
  }, []);

  return (
    <div className={globalStyles.pageFrame2}>
      <div className={adminPanelStyles.title}>Products</div>
      <div className={styles.operationFrame}>
        <div className={styles.filters}>
          <StyledInput value={name} onChange={onChangeName} />
          <button onClick={fetchAndSetProducts}>search</button>
        </div>
        <button onClick={onClickCreateProduct}>+ add product</button>
      </div>
      <div style={{ marginTop: "18px", height: "300px", position: "relative" }}>
        {loadingProducts && <SpinnerLoader />}
        {!loadingProducts && <ProductsTable products={products} />}
      </div>
    </div>
  );
};

export default ProductsPanel;

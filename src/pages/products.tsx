import React, { useEffect, useState } from "react";
import styles from "../index.module.css";

import { getProducts } from "../services";
import { Product } from "../services/interfaces";
import ProductsExplorer from "../components/ProductsExplorer";
import SpinnerLoader from "../components/loaders/spinnerLoader";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const fetchProducts = async () => {
    try {
      const paginatedProducts = await getProducts(1, 20);

      setProducts(paginatedProducts.products);
      setLoadingProducts(false);
    } catch (e) {
      console.error(e);
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className={styles.pageFrame}>
      {loadingProducts && <SpinnerLoader />}
      {!loadingProducts && (
        <>
          <div>Polleras</div>
          <ProductsExplorer products={products} />
        </>
      )}
    </div>
  );
};

export default ProductsPage;

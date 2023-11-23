import React from "react";

import styles from "./index.module.css";
import { Product } from "../../services/interfaces";
import { centsToCurrencyNormalValue } from "../../utils/conversions";
import ProductCard from "../ProductCard";

interface Props {
  products: Product[];
}

const ProductsExplorer = ({ products }: Props) => {
  return (
    <div className={styles.productsGrid}>
      {products.map((product) => (
        <ProductCard
          key={product._id}
          id={product._id}
          discount={product.discountPercentage}
          image={product.imagesUrl[0]}
          name={product.name}
          price={centsToCurrencyNormalValue(product.priceInCents)}
          finalPrice={centsToCurrencyNormalValue(product.finalPriceInCents)}
        />
      ))}
    </div>
  );
};

export default ProductsExplorer;

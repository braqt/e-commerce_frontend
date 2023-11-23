import React from "react";

import styles from "./index.module.css";

import DiscountTag from "../ProductTags/DiscountTag";
import { PRODUCT_PATH } from "../../navigation/pagePaths";

interface Props {
  id: string;
  discount: number;
  image: string;
  name: string;
  price: number;
}

const ProductCard = ({ id, discount, image, name, price }: Props) => {
  return (
    <div className={styles.productCardFrame}>
      {discount > 0 && (
        <DiscountTag
          discount={discount}
          style={{
            position: "absolute",
            top: "0px",
            left: "0px",
            borderTopLeftRadius: 8,
          }}
        />
      )}
      <img src={image} className={styles.productImage} />
      <div style={{ marginTop: "10px" }}>
        {discount > 0 && <div className={styles.discountPrice}>Bs {price}</div>}
        <div className={styles.productPrice}>Bs {price}</div>
        <a className={styles.productName} href={`${PRODUCT_PATH}/${id}`}>
          {name}
        </a>
      </div>
    </div>
  );
};

export default ProductCard;

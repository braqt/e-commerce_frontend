import React from "react";

import styles from "./index.module.css";

import { centsToCurrencyNormalValue } from "../../utils/conversions";

interface Props {
  image: string;
  name: string;
  quantity: number;
  priceInCents: number;
}

const ProductInCartForConfirmation = ({
  image,
  name,
  quantity,
  priceInCents,
}: Props) => {
  return (
    <div className={styles.productInCartFrame}>
      <div>
        <img className={styles.productInCartImage} src={image} />
        <div className={styles.productInCartDescriptionAndOperationFrame}>
          <div className={styles.productInCartName}>{name}</div>
        </div>
      </div>
      <div>
        <div className={styles.productInCartConfirmationQuantityAvailable}>
          <div>Bs {centsToCurrencyNormalValue(priceInCents)}</div>
          <div>x</div>
          <div>{quantity}</div>
        </div>
        <div className={styles.productInCartTotalPrice}>
          Bs {centsToCurrencyNormalValue(priceInCents * quantity)}
        </div>
      </div>
    </div>
  );
};

export default ProductInCartForConfirmation;

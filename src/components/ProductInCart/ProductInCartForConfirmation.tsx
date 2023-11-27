import React from "react";

import styles from "./index.module.css";

import { CURRENCY_SYMBOL } from "../../constants";

import { centsToCurrencyNormalValue } from "../../utils/conversions";

interface Props {
  image: string;
  name: string;
  quantity: number;
  priceInCents: number;
  size?: "normal" | "small";
}

const ProductInCartForConfirmation = ({
  image,
  name,
  quantity,
  priceInCents,
  size = "normal",
}: Props) => {
  return (
    <div
      className={
        size == "normal"
          ? styles.productInCartFrame
          : styles.productInCartFrameSmall
      }
    >
      <div>
        <img
          className={
            size == "normal"
              ? styles.productInCartImage
              : styles.productInCartSmallImage
          }
          src={image}
        />
        <div className={styles.productInCartDescriptionAndOperationFrame}>
          <div className={styles.productInCartName}>{name}</div>
        </div>
      </div>
      <div>
        <div className={styles.productInCartConfirmationQuantityAvailable}>
          <div>
            {CURRENCY_SYMBOL} {centsToCurrencyNormalValue(priceInCents)}
          </div>
          <div>x</div>
          <div>{quantity}</div>
        </div>
        <div className={styles.productInCartTotalPrice}>
          {CURRENCY_SYMBOL}{" "}
          {centsToCurrencyNormalValue(priceInCents * quantity)}
        </div>
      </div>
    </div>
  );
};

export default ProductInCartForConfirmation;

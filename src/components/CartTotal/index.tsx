import React from "react";

import styles from "./index.module.css";

import { CURRENCY_SYMBOL } from "../../constants";

interface Props {
  totalPrice: number;
}

const CartTotal = ({ totalPrice }: Props) => {
  return (
    <div className={styles.total}>
      <label className={styles.totalLabel}>total</label>
      <label className={styles.totalPriceLabel}>
        {CURRENCY_SYMBOL} {totalPrice}
      </label>
    </div>
  );
};

export default CartTotal;

import React from "react";

import styles from "./index.module.css";

interface Props {
  totalPrice: number;
}

const CartTotal = ({ totalPrice }: Props) => {
  return (
    <div className={styles.total}>
      <label className={styles.totalLabel}>total</label>
      <label className={styles.totalPriceLabel}>Bs {totalPrice}</label>
    </div>
  );
};

export default CartTotal;

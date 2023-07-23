import React, { CSSProperties } from "react";
import { MdOutlineDiscount } from "react-icons/md";

import styles from "./index.module.css";

interface Props {
  discount: number;
  style?: CSSProperties;
}

const DiscountTag = ({ discount, style }: Props) => {
  return (
    <div className={styles.discountTagFrame} style={style}>
      <MdOutlineDiscount size={16} />
      <label className={styles.discountLabel}>{discount}% OFF!!</label>
    </div>
  );
};

export default DiscountTag;

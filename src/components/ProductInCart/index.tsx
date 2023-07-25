import React from "react";

import styles from "./index.module.css";
import { BiPlus, BiMinus } from "react-icons/bi";
import { centsToCurrencyNormalValue } from "../../utils/conversions";

interface Props {
  image: string;
  name: string;
  quantity: number;
  quantityAvailable: number;
  priceInCents: number;
  onClickPlusButton: () => void;
  onClickMinusButton: () => void;
  onClickDeleteButton: () => void;
}

const ProductInCart = ({
  image,
  name,
  quantity,
  quantityAvailable,
  priceInCents,
  onClickPlusButton,
  onClickMinusButton,
  onClickDeleteButton,
}: Props) => {
  return (
    <div className={styles.productInCartFrame}>
      <div>
        <img className={styles.productInCartImage} src={image} />
        <div className={styles.productInCartDescriptionAndOperationFrame}>
          <div className={styles.productInCartName}>{name}</div>
          <div
            className={styles.productInCartOperationName}
            onClick={onClickDeleteButton}
          >
            Eliminar
          </div>
        </div>
      </div>
      <div>
        <div className={styles.productInCartSelectorAndQuantityAvailable}>
          <div className={styles.productInCartSelectorFrame}>
            <BiMinus onClick={onClickMinusButton} />
            <div className={styles.productInCartQuantitySelector}>
              {quantity}
            </div>
            <BiPlus onClick={onClickPlusButton} />
          </div>
          <div className={styles.productInCartQuantityAvailable}>
            {quantityAvailable} available
          </div>
        </div>
        <div className={styles.productInCartTotalPrice}>
          Bs {centsToCurrencyNormalValue(priceInCents * quantity)}
        </div>
      </div>
    </div>
  );
};

export default ProductInCart;

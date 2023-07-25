import React from "react";

import globalStyles from "../../index.module.css";
import styles from "./index.module.css";

import { useCart } from "../../context/cart";
import ProductInCart from "../../components/ProductInCart";
import { IProductInCart } from "../../interfaces/context";
import { centsToCurrencyNormalValue } from "../../utils/conversions";

const MyCart = () => {
  const {
    productsInCart,
    modifyProductQuantityFromCart,
    removeProductFromCart,
  } = useCart();

  const onClickPlusButton = (productInCart: IProductInCart) => {
    if (productInCart.quantity + 1 <= productInCart.product.quantity) {
      modifyProductQuantityFromCart({
        ...productInCart,
        quantity: productInCart.quantity + 1,
      });
    }
  };

  const onClickMinusButton = (productInCart: IProductInCart) => {
    if (productInCart.quantity - 1 > 0) {
      modifyProductQuantityFromCart({
        ...productInCart,
        quantity: productInCart.quantity - 1,
      });
    }
  };

  const onClickDeleteButton = (productInCart: IProductInCart) => {
    removeProductFromCart(productInCart);
  };

  const getTotalFromProductsInCart = () => {
    let total = 0;
    for (let p of productsInCart) {
      total =
        total +
        centsToCurrencyNormalValue(p.product.finalPriceInCents * p.quantity);
    }
    return total;
  };

  return (
    <div className={globalStyles.pageFrame}>
      <div>MyCart</div>

      <div>
        {productsInCart.map((productInCart) => (
          <ProductInCart
            key={productInCart.product._id}
            image={productInCart.product.imagesUrl[0]}
            name={productInCart.product.name}
            quantity={productInCart.quantity}
            quantityAvailable={productInCart.product.quantity}
            priceInCents={productInCart.product.finalPriceInCents}
            onClickPlusButton={() => {
              onClickPlusButton(productInCart);
            }}
            onClickMinusButton={() => {
              onClickMinusButton(productInCart);
            }}
            onClickDeleteButton={() => {
              onClickDeleteButton(productInCart);
            }}
          />
        ))}
      </div>
      {productsInCart.length > 0 && (
        <div className={styles.total}>
          <label className={styles.totalLabel}>total</label>
          <label className={styles.totalPriceLabel}>
            Bs {getTotalFromProductsInCart()}
          </label>
        </div>
      )}
    </div>
  );
};

export default MyCart;

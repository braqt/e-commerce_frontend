import React from "react";

import { useNavigate } from "react-router-dom";
import globalStyles from "../../index.module.css";

import { useCart } from "../../context/cart";
import { CHECKOUT_PATH } from "../../navigation/pagePaths";
import { getTotalFromProductsInCart } from "../../utils/cart";
import { IProductInCart } from "../../interfaces/context";
import ProductInCart from "../../components/ProductInCart";
import CartTotal from "../../components/CartTotal";

const MyCart = () => {
  const {
    productsInCart,
    modifyProductQuantityFromCart,
    removeProductFromCart,
  } = useCart();
  const navigate = useNavigate();

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

  const onClickOrderProducts = () => {
    navigate(CHECKOUT_PATH);
  };

  return (
    <div className={globalStyles.pageFrame}>
      <div>MyCart</div>
      <div style={{ marginTop: "60px" }}>
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
        <div>
          <CartTotal totalPrice={getTotalFromProductsInCart(productsInCart)} />
          <div style={{ marginTop: "45px", textAlign: "center" }}>
            <button onClick={onClickOrderProducts}>order products</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCart;

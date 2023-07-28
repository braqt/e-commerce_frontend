import React from "react";

import { useCart } from "../../../context/cart";
import { getTotalFromProductsInCart } from "../../../utils/cart";
import ProductInCartForConfirmation from "../../ProductInCart/ProductInCartForConfirmation";
import CartTotal from "../../CartTotal";

interface Props {
  onClickBackButton: () => void;
  onClickConfirmationButton: () => void;
}

const ConfirmProductsInCart = ({
  onClickBackButton,
  onClickConfirmationButton,
}: Props) => {
  const { productsInCart } = useCart();

  return (
    <div>
      {productsInCart.map((productInCart) => (
        <ProductInCartForConfirmation
          key={productInCart.product._id}
          image={productInCart.product.imagesUrl[0]}
          name={productInCart.product.name}
          priceInCents={productInCart.product.priceInCents}
          quantity={productInCart.quantity}
        />
      ))}
      <CartTotal totalPrice={getTotalFromProductsInCart(productsInCart)} />
      <div
        style={{
          display: "flex",
          gap: "10px",
          margin: "45px 0px",
          justifyContent: "center",
        }}
      >
        <button onClick={onClickBackButton}>back</button>
        <button onClick={onClickConfirmationButton}>confirm</button>
      </div>
    </div>
  );
};

export default ConfirmProductsInCart;

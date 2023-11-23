import React from "react";

import ProductInCartForConfirmation from "../../ProductInCart/ProductInCartForConfirmation";
import { IProductInCart } from "../../../interfaces/context";

interface Props {
  onClickGoToMyOrdersButton: () => void;
  productsInCart: IProductInCart[];
}

const OrderConfirmedSuccessfully = ({
  onClickGoToMyOrdersButton,
  productsInCart,
}: Props) => {
  return (
    <>
      <div style={{ textAlign: "center", marginBottom: "65px" }}>
        <div>You have ordered the following products successfully</div>
        <div>Time available to complete the purchase in the store</div>
      </div>
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
      </div>
      <div style={{ margin: "45px 0px", textAlign: "center" }}>
        <button onClick={onClickGoToMyOrdersButton}>go to my orders</button>
      </div>
    </>
  );
};

export default OrderConfirmedSuccessfully;

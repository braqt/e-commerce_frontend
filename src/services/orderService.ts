import { ORDER_PRODUCTS } from "./CONSTANTS";
import config from "../constants/config";
import { IProductInCart } from "../interfaces/context";

export const orderProducts = async (
  productsInCart: IProductInCart[],
  authToken: string
) => {
  let productsToOrder = [];
  for (let p of productsInCart) {
    productsToOrder.push({ id: p.product._id, quantity: p.quantity });
  }

  await fetch(config.SERVER_DOMAIN + ORDER_PRODUCTS, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      products: productsToOrder,
      paymentMethod: "CASH",
    }),
  });
};

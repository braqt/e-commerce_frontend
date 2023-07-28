import { IProductInCart } from "../interfaces/context";
import { centsToCurrencyNormalValue } from "./conversions";

export const getTotalFromProductsInCart = (
  productsInCart: IProductInCart[]
) => {
  let totalInCents = 0;
  for (let p of productsInCart) {
    totalInCents = totalInCents + p.product.finalPriceInCents * p.quantity;
  }
  return centsToCurrencyNormalValue(totalInCents);
};

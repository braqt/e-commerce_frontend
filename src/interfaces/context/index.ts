import { Product } from "../../services/interfaces";

export interface ICartContext {
  productsInCart: IProductInCart[];
  addProductToCart: (product: Product, quantity: number) => void;
  modifyProductQuantityFromCart: (productInCart: IProductInCart) => void;
  removeProductFromCart: (productInCart: IProductInCart) => void;
}

export interface ProductInCartInLocalStorage {
  id: string;
  quantity: number;
}

export interface IProductInCart {
  product: Product;
  quantity: number;
}

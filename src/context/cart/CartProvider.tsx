import React from "react";

import {
  ICartContext,
  IProductInCart,
  ProductInCartInLocalStorage,
} from "../../interfaces/context";
import { Product } from "../../services/interfaces";
import { CartContext } from ".";

const CART_KEY = "cart";

export const CartProvider = (props: { children: any }) => {
  const getProductsFromLocalStorage = (): ProductInCartInLocalStorage[] => {
    const cartItem = localStorage.getItem(CART_KEY);
    if (cartItem) {
      return JSON.parse(cartItem);
    } else {
      return [];
    }
  };

  const getProductFromLocalStorage = (productInCart: IProductInCart) => {
    const productsFromLS = getProductsFromLocalStorage();
    for (let productFromLS of productsFromLS) {
      if (productFromLS.id == productInCart.product._id) {
        return productFromLS;
      }
    }
    throw new Error("Product not found in local storgae");
  };

  const setProductsInLocalStorage = (
    productsInCartFromLocalStorage: ProductInCartInLocalStorage[]
  ) => {
    localStorage.setItem(
      CART_KEY,
      JSON.stringify(productsInCartFromLocalStorage)
    );
  };

  const addProductToCart = (product: Product, quantity: number) => {
    const productsInCartFromLocalStorage: ProductInCartInLocalStorage[] =
      getProductsFromLocalStorage();
    const productInCartForLocalStorage: ProductInCartInLocalStorage = {
      id: product._id,
      quantity,
    };
    productsInCartFromLocalStorage.push(productInCartForLocalStorage);
    setProductsInLocalStorage(productsInCartFromLocalStorage);
  };

  const modifyProductQuantityFromCart = (
    productInCart: ProductInCartInLocalStorage
  ) => {
    const productsInCartFromLocalStorage: ProductInCartInLocalStorage[] =
      getProductsFromLocalStorage();
    for (let p of productsInCartFromLocalStorage) {
      if (p.id == productInCart.id) {
        p.quantity = productInCart.quantity;
        break;
      }
    }
    setProductsInLocalStorage(productsInCartFromLocalStorage);
  };

  const removeProductFromCart = (idProductInCart: string) => {
    const productsInCartFromLocalStorage: ProductInCartInLocalStorage[] =
      getProductsFromLocalStorage();
    const newProductsInCartFromLocalStorage =
      productsInCartFromLocalStorage.filter((p) => p.id != idProductInCart);
    setProductsInLocalStorage(newProductsInCartFromLocalStorage);
  };

  const contextValue: ICartContext = {
    getProductFromLocalStorage,
    getProductsFromLocalStorage,
    addProductToCart,
    modifyProductQuantityFromCart,
    removeProductFromCart,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
};

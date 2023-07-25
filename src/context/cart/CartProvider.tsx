import React, { useState, useEffect } from "react";

import {
  ICartContext,
  IProductInCart,
  ProductInCartInLocalStorage,
} from "../../interfaces/context";
import { Product } from "../../services/interfaces";
import { CartContext } from ".";
import { getProduct } from "../../services";

const CART_KEY = "cart";

export const CartProvider = (props: { children: any }) => {
  const [productsInCart, setProductsInCart] = useState<IProductInCart[]>([]);

  const getProductsFromLocalStorage = (): ProductInCartInLocalStorage[] => {
    const cartItem = localStorage.getItem(CART_KEY);
    if (cartItem) {
      return JSON.parse(cartItem);
    } else {
      return [];
    }
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

    setProductsInCart((prevState) => [...prevState, { product, quantity }]);
  };

  const modifyProductQuantityFromCart = (productInCart: IProductInCart) => {
    const productsInCartFromLocalStorage: ProductInCartInLocalStorage[] =
      getProductsFromLocalStorage();
    const newProductsInCart = [...productsInCart];
    for (let p of productsInCartFromLocalStorage) {
      if (p.id == productInCart.product._id) {
        p.quantity = productInCart.quantity;
        break;
      }
    }
    for (let p of newProductsInCart) {
      if (p.product._id == productInCart.product._id) {
        p.quantity = productInCart.quantity;
      }
    }
    setProductsInCart(newProductsInCart);
    setProductsInLocalStorage(productsInCartFromLocalStorage);
  };

  const removeProductFromCart = (productInCart: IProductInCart) => {
    const productsInCartFromLocalStorage: ProductInCartInLocalStorage[] =
      getProductsFromLocalStorage();
    let newProductsInCart = [...productsInCart];
    const newProductsInCartFromLocalStorage =
      productsInCartFromLocalStorage.filter(
        (p) => p.id != productInCart.product._id
      );
    newProductsInCart = newProductsInCart.filter(
      (p) => p.product._id != productInCart.product._id
    );
    setProductsInCart([...newProductsInCart]);
    setProductsInLocalStorage(newProductsInCartFromLocalStorage);
  };

  const fetchProductsInCart = async () => {
    const productsInLocalStorage = getProductsFromLocalStorage();
    if (productsInLocalStorage.length > 0) {
      let productsInCart: IProductInCart[] = [];
      for (let productInLS of productsInLocalStorage) {
        let product = await getProduct(productInLS.id);
        productsInCart.push({ product, quantity: productInLS.quantity });
      }
      setProductsInCart(productsInCart);
    }
  };

  useEffect(() => {
    fetchProductsInCart();
  }, []);

  const contextValue: ICartContext = {
    productsInCart,
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

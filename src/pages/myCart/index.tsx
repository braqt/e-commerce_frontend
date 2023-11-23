import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import globalStyles from "../../index.module.css";

import { getProduct } from "../../services";
import { useCart } from "../../context/cart";
import { CHECKOUT_PATH } from "../../navigation/pagePaths";
import { getTotalFromProductsInCart } from "../../utils/cart";
import { IProductInCart } from "../../interfaces/context";
import ProductInCart from "../../components/ProductInCart";
import CartTotal from "../../components/CartTotal";
import SpinnerLoader from "../../components/loaders/spinnerLoader";

const MyCart = () => {
  const {
    getProductFromLocalStorage,
    getProductsFromLocalStorage,
    modifyProductQuantityFromCart,
    removeProductFromCart,
  } = useCart();
  const [productsInCart, setProductsInCart] = useState<IProductInCart[]>([]);
  const [loadingProductsInCart, setLoadingProductsInCart] =
    useState<boolean>(true);
  const navigate = useNavigate();

  const onClickPlusButton = (productInCart: IProductInCart) => {
    const productFromLS = getProductFromLocalStorage(productInCart);
    if (productFromLS.quantity + 1 <= productInCart.product.quantity) {
      modifyProductQuantityFromCart({
        ...productFromLS,
        quantity: productFromLS.quantity + 1,
      });
      let newProductsInCart = [...productsInCart];
      for (let p of newProductsInCart) {
        if (p.product._id == productFromLS.id) {
          p.quantity = productFromLS.quantity + 1;
        }
      }
      setProductsInCart(newProductsInCart);
    }
  };

  const onClickMinusButton = (productInCart: IProductInCart) => {
    const productFromLS = getProductFromLocalStorage(productInCart);
    if (productFromLS.quantity - 1 > 0) {
      modifyProductQuantityFromCart({
        ...productFromLS,
        quantity: productFromLS.quantity - 1,
      });
      let newProductsInCart = [...productsInCart];
      for (let p of newProductsInCart) {
        if (p.product._id == productFromLS.id) {
          p.quantity = productFromLS.quantity - 1;
        }
      }
      setProductsInCart(newProductsInCart);
    }
  };

  const onClickDeleteButton = (productInCart: IProductInCart) => {
    removeProductFromCart(productInCart.product._id);
    let newProductsInCart = [...productsInCart];
    newProductsInCart = newProductsInCart.filter(
      (p) => p.product._id != productInCart.product._id
    );
    setProductsInCart(newProductsInCart);
  };

  const onClickOrderProducts = () => {
    navigate(CHECKOUT_PATH);
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
      setLoadingProductsInCart(false);
    }
  };

  useEffect(() => {
    fetchProductsInCart();
  }, []);

  return (
    <div className={globalStyles.pageFrame}>
      <div>MyCart</div>
      {loadingProductsInCart && <SpinnerLoader />}
      {!loadingProductsInCart && (
        <>
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
            {productsInCart.length == 0 && <div>No products in your cart</div>}
          </div>
          {productsInCart.length > 0 && (
            <div>
              <CartTotal
                totalPrice={getTotalFromProductsInCart(productsInCart)}
              />
              <div style={{ marginTop: "45px", textAlign: "center" }}>
                <button onClick={onClickOrderProducts}>order products</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyCart;

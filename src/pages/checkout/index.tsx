import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import globalStyles from "../../index.module.css";

import { MY_ORDERS_PATH } from "../../navigation/pagePaths";
import { useCart } from "../../context/cart";
import { useAuthentication } from "../../context/auth";
import { IProductInCart } from "../../interfaces/context";

import { getProduct, orderProducts } from "../../services";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import HowToPayTheProduct from "../../components/panels/Checkout/HowToPayTheProduct";
import ConfirmProductsInCart from "../../components/panels/Checkout/ConfirmProductsInCart";
import OrderConfirmedSuccessfully from "../../components/panels/Checkout/OrderConfirmedSuccessfully";
import SpinnerLoader from "../../components/loaders/spinnerLoader";

const steps = ["How to pay for products?", "Confirm Order"];

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { getProductsFromLocalStorage, removeAllProductsFromCart } = useCart();
  const [activeStep, setActiveStep] = useState(0);
  const [productsOrderedWithSuccess, setProductsOrderedWithSuccess] =
    useState(false);
  const { user } = useAuthentication();
  const [productsInCart, setProductsInCart] = useState<IProductInCart[]>([]);
  const [loadingProductsInCheckout, setLoadingProductsInCheckout] =
    useState<boolean>(true);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onClickConfirmationButton = async () => {
    if (user) {
      const authToken = await user.getIdToken();
      orderProducts(productsInCart, authToken);
      removeAllProductsFromCart();
      setProductsOrderedWithSuccess(true);
    }
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <HowToPayTheProduct onClickContinueButton={handleNext} />;
      case 1:
        return (
          <ConfirmProductsInCart
            productsInCart={productsInCart}
            onClickBackButton={handleBack}
            onClickConfirmationButton={onClickConfirmationButton}
          />
        );
      default:
        return <label>Unknown step</label>;
    }
  };

  const onClickGoToMyOrdersButton = () => {
    navigate(MY_ORDERS_PATH);
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
    setLoadingProductsInCheckout(false);
  };

  useEffect(() => {
    fetchProductsInCart();
  }, []);

  return (
    <div className={globalStyles.pageFrame}>
      <div>My Checkout</div>
      {loadingProductsInCheckout && <SpinnerLoader />}
      {!loadingProductsInCheckout && (
        <>
          {productsOrderedWithSuccess && (
            <div style={{ marginTop: "60px" }}>
              <OrderConfirmedSuccessfully
                productsInCart={productsInCart}
                onClickGoToMyOrdersButton={onClickGoToMyOrdersButton}
              />
            </div>
          )}
          {!productsOrderedWithSuccess && (
            <>
              {productsInCart.length > 0 && (
                <>
                  <Stepper
                    activeStep={activeStep}
                    style={{ maxWidth: "1000px", margin: "50px auto 0px auto" }}
                  >
                    {steps.map((label) => {
                      const stepProps: { completed?: boolean } = {};
                      const labelProps: {
                        optional?: React.ReactNode;
                      } = {};

                      return (
                        <Step key={label} {...stepProps}>
                          <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                      );
                    })}
                  </Stepper>
                  <div style={{ marginTop: "55px" }}>
                    {getStepContent(activeStep)}
                  </div>
                </>
              )}
              <div style={{ marginTop: "60px" }}>
                {productsInCart.length == 0 && (
                  <div>No products in your checkout</div>
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CheckoutPage;

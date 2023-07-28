import React, { useState } from "react";

import globalStyles from "../../index.module.css";
import { useNavigate } from "react-router-dom";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import { useCart } from "../../context/cart";
import { useAuthentication } from "../../context/auth";
import { orderProducts } from "../../services/orderService";
import { HOME_PATH } from "../../navigation/pagePaths";
import HowToPayTheProduct from "../../components/panels/Checkout/HowToPayTheProduct";
import ConfirmProductsInCart from "../../components/panels/Checkout/ConfirmProductsInCart";
import OrderConfirmedSuccessfully from "../../components/panels/Checkout/OrderConfirmedSuccessfully";

const steps = ["How to pay for products?", "Confirm Order"];

const CheckoutPage = () => {
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);
  const [productsOrderedWithSuccess, setProductsOrderedWithSuccess] =
    useState(false);
  const { user } = useAuthentication();
  const { productsInCart } = useCart();

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
            onClickBackButton={handleBack}
            onClickConfirmationButton={onClickConfirmationButton}
          />
        );
      default:
        return <label>Unknown step</label>;
    }
  };

  const onClickGoToMyOrdersButton = () => {
    navigate(HOME_PATH);
  };

  return (
    <div className={globalStyles.pageFrame}>
      <div>My Checkout</div>
      {productsOrderedWithSuccess && (
        <div style={{ marginTop: "60px" }}>
          <OrderConfirmedSuccessfully
            onClickGoToMyOrdersButton={onClickGoToMyOrdersButton}
          />
        </div>
      )}
      {!productsOrderedWithSuccess && (
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
          <div style={{ marginTop: "55px" }}>{getStepContent(activeStep)}</div>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;

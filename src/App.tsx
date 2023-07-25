import React from "react";
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./context/auth/AuthProvider";
import { useAuthentication } from "./context/auth";
import { CartProvider } from "./context/cart/CartProvider";
import RouterConfig from "./navigation/RouterConfig";
import SpinnerLoader from "./components/loaders/spinnerLoader";

const App = () => {
  const { isLoading } = useAuthentication();

  return (
    <AuthProvider>
      <CartProvider>
        {isLoading && <SpinnerLoader />}
        {!isLoading && (
          <BrowserRouter>
            <RouterConfig />
          </BrowserRouter>
        )}
      </CartProvider>
    </AuthProvider>
  );
};

export default App;

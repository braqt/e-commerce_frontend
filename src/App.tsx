import React from "react";
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./context/auth/AuthProvider";
import { useAuthentication } from "./context/auth";
import RouterConfig from "./navigation/RouterConfig";
import SpinnerLoader from "./components/loaders/spinnerLoader";

const App = () => {
  const { isLoading } = useAuthentication();

  return (
    <AuthProvider>
      {isLoading && <SpinnerLoader />}
      {!isLoading && (
        <BrowserRouter>
          <RouterConfig />
        </BrowserRouter>
      )}
    </AuthProvider>
  );
};

export default App;

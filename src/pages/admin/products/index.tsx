import React, { useState } from "react";

import AddProductPanel from "../../../components/panels/Admin/CreateProduct";
import ProductsPanel from "../../../components/panels/Admin/Products";

enum ProductPagePanel {
  PRODUCTS = "PRODUCTS",
  CREATE_PRODUCT = "CREATE_PRODUCT",
}

const AdminProductsPage = () => {
  const [panel, setPanel] = useState<ProductPagePanel>(
    ProductPagePanel.PRODUCTS
  );

  const onCreateProduct = () => {
    setPanel(ProductPagePanel.PRODUCTS);
  };

  const onClickCreateProduct = () => {
    setPanel(ProductPagePanel.CREATE_PRODUCT);
  };

  const onClickBackButton = () => {
    setPanel(ProductPagePanel.PRODUCTS);
  };

  return (
    <>
      {panel == ProductPagePanel.CREATE_PRODUCT && (
        <AddProductPanel
          onCreateProduct={onCreateProduct}
          onClickBack={onClickBackButton}
        />
      )}
      {panel == ProductPagePanel.PRODUCTS && (
        <ProductsPanel onClickCreateProduct={onClickCreateProduct} />
      )}
    </>
  );
};

export default AdminProductsPage;

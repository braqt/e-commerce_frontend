import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import globalStyles from "../../index.module.css";
import styles from "./index.module.css";

import { getProduct } from "../../services";
import { Product } from "../../services/interfaces";
import { centsToCurrencyNormalValue } from "../../utils/conversions";

import SpinnerLoader from "../../components/loaders/spinnerLoader";
import DiscountTag from "../../components/ProductTags/DiscountTag";
import { useCart } from "../../context/cart";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>();
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);

  const { addProductToCart } = useCart();

  const fetchProduct = async () => {
    if (id) {
      try {
        const product = await getProduct(id);
        setProduct(product);
      } catch (e) {
        console.error(e);
      }
    }
    setIsLoadingProduct(false);
  };

  useEffect(() => {
    if (id) {
      fetchProduct();
    } else {
      setIsLoadingProduct(false);
    }
  }, []);

  return (
    <div className={globalStyles.pageFrame}>
      {isLoadingProduct && <SpinnerLoader />}
      {!isLoadingProduct && !product && <div>No product Found</div>}
      {!isLoadingProduct && product && (
        <>
          <div className={styles.productImageNDetailsFrame}>
            <img className={styles.productImage} src={product.imagesUrl[0]} />
            <div>
              <div>{product.name}</div>
              <div>Item Code: {product._id}</div>
              <div>
                Bs {centsToCurrencyNormalValue(product.finalPriceInCents)}
              </div>
              <hr />
              {product.discountPercentage != 0 && (
                <>
                  <DiscountTag discount={product.discountPercentage} />
                  <hr />
                </>
              )}
              <div>Available quantity: {product.quantity}</div>
              <button
                onClick={() => {
                  addProductToCart(product, 1);
                }}
              >
                add to the cart
              </button>
            </div>
          </div>
          <div>
            <div>description</div>
            <div>{product.description}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductPage;

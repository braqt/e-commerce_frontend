import { GET_PRODUCT, GET_PRODUCTS } from "./CONSTANTS";
import config from "../constants/config";
import { GetProductsResponse, Product } from "./interfaces";

export const getProducts = async (
  pageNumber: number,
  pageSize: number
): Promise<GetProductsResponse> => {
  const response = await fetch(config.SERVER_DOMAIN + GET_PRODUCTS, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pageNumber,
      pageSize,
    }),
  });

  return await response.json();
};

export const getProduct = async (idProduct: string): Promise<Product> => {
  const response = await fetch(config.SERVER_DOMAIN + GET_PRODUCT, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idProduct,
    }),
  });

  return await response.json();
};

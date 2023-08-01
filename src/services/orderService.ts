import {
  GET_ACTIVE_ORDERS,
  GET_COMPLETED_ORDERS,
  GET_NOT_COMPLETED_ORDERS,
  ORDER_PRODUCTS,
} from "./CONSTANTS";
import config from "../constants/config";
import { IProductInCart } from "../interfaces/context";
import {
  GetActiveOrdersResponse,
  GetCompletedOrdersResponse,
  GetNotCompletedOrdersResponse,
} from "./interfaces";

export const orderProducts = async (
  productsInCart: IProductInCart[],
  authToken: string
) => {
  let productsToOrder = [];
  for (let p of productsInCart) {
    productsToOrder.push({ id: p.product._id, quantity: p.quantity });
  }

  await fetch(config.SERVER_DOMAIN + ORDER_PRODUCTS, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      products: productsToOrder,
      paymentMethod: "CASH",
    }),
  });
};

export const getActiveOrders = async (
  pageNumber: number,
  pageSize: number,
  firebaseAuthToken: string
): Promise<GetActiveOrdersResponse> => {
  const response = await fetch(config.SERVER_DOMAIN + GET_ACTIVE_ORDERS, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${firebaseAuthToken}`,
    },
    body: JSON.stringify({
      pageNumber,
      pageSize,
    }),
  });

  return await response.json();
};

export const getCompletedOrders = async (
  pageNumber: number,
  pageSize: number,
  firebaseAuthToken: string
): Promise<GetCompletedOrdersResponse> => {
  const response = await fetch(config.SERVER_DOMAIN + GET_COMPLETED_ORDERS, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${firebaseAuthToken}`,
    },
    body: JSON.stringify({
      pageNumber,
      pageSize,
    }),
  });

  return await response.json();
};

export const getNotCompletedOrders = async (
  pageNumber: number,
  pageSize: number,
  firebaseAuthToken: string
): Promise<GetNotCompletedOrdersResponse> => {
  const response = await fetch(
    config.SERVER_DOMAIN + GET_NOT_COMPLETED_ORDERS,
    {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${firebaseAuthToken}`,
      },
      body: JSON.stringify({
        pageNumber,
        pageSize,
      }),
    }
  );

  return await response.json();
};

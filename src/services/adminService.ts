import {
  ADMIN_CREATE_PRODUCT,
  ADMIN_GET_PRODUCTS,
  ADMIN_GET_ORDERS,
  ADMIN_GET_USERS,
  ADMIN_GET_USER,
  ADMIN_GET_USER_ORDERS,
  ADMIN_GET_ORDER,
  ADMIN_SET_ORDER_STATUS,
  ADMIN_SET_PAYMENT_STATUS,
} from "./CONSTANTS";
import config from "../constants/config";
import {
  AccountWithStatistics,
  GetOrdersResponse,
  GetProductsResponse,
  GetUserOrdersResponse,
  GetUsersResponse,
  Order,
} from "./interfaces";
import { OrderStatus, PaymentStatus } from "../interfaces/context";

export const getAdminProducts = async (
  pageNumber: number,
  pageSize: number,
  authToken: string,
  filter: { name: string }
): Promise<GetProductsResponse> => {
  const response = await fetch(config.SERVER_DOMAIN + ADMIN_GET_PRODUCTS, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      pageNumber,
      pageSize,
      productName: filter.name,
    }),
  });

  return await response.json();
};

export const getAdminOrders = async (
  pageNumber: number,
  pageSize: number,
  authToken: string,
  filter: { clientName: string; orderNumber: string }
): Promise<GetOrdersResponse> => {
  const response = await fetch(config.SERVER_DOMAIN + ADMIN_GET_ORDERS, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      pageNumber,
      pageSize,
      clientName: filter.clientName,
      orderNumber: filter.orderNumber,
    }),
  });

  return await response.json();
};

export const getAdminOrder = async (
  orderNumber: string,
  authToken: string
): Promise<Order> => {
  const response = await fetch(
    config.SERVER_DOMAIN + ADMIN_GET_ORDER + "?orderNumber=" + orderNumber,
    {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

  return await response.json();
};

export const adminSetOrderStatus = async (
  orderNumber: string,
  orderStatus: OrderStatus,
  authToken: string
) => {
  await fetch(config.SERVER_DOMAIN + ADMIN_SET_ORDER_STATUS, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      orderNumber,
      orderStateValue: orderStatus,
    }),
  });
};

export const adminSetPaymentStatus = async (
  orderNumber: string,
  paymentStatus: PaymentStatus,
  authToken: string
) => {
  await fetch(config.SERVER_DOMAIN + ADMIN_SET_PAYMENT_STATUS, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      orderNumber,
      paymentStateValue: paymentStatus,
    }),
  });
};

export const getAdminUsers = async (
  pageNumber: number,
  pageSize: number,
  authToken: string,
  filter: { clientName: string }
): Promise<GetUsersResponse> => {
  const response = await fetch(config.SERVER_DOMAIN + ADMIN_GET_USERS, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      pageNumber,
      pageSize,
      userName: filter.clientName,
    }),
  });

  return await response.json();
};

export const getAdminUser = async (
  idUser: string,
  authToken: string
): Promise<AccountWithStatistics> => {
  const response = await fetch(config.SERVER_DOMAIN + ADMIN_GET_USER, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      id: idUser,
    }),
  });

  return await response.json();
};

export const getAdminUserOrders = async (
  pageNumber: number,
  pageSize: number,
  idUser: string,
  authToken: string
): Promise<GetUserOrdersResponse> => {
  const response = await fetch(config.SERVER_DOMAIN + ADMIN_GET_USER_ORDERS, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      pageNumber,
      pageSize,
      id: idUser,
    }),
  });

  return await response.json();
};

export const createProduct = async (
  authToken: string,
  name: string,
  description: string,
  price: string,
  discountPercentage: string,
  quantity: string,
  images: FileList
) => {
  const formData = new FormData();

  formData.append("name", name);
  formData.append("description", description);
  formData.append("price", price);
  formData.append("discountPercentage", discountPercentage);
  formData.append("quantity", quantity);
  for (let image of images) {
    formData.append("images", image);
  }

  await fetch(config.SERVER_DOMAIN + ADMIN_CREATE_PRODUCT, {
    method: "post",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    body: formData,
  });
};

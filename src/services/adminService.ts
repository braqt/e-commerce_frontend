import {
  ADMIN_CREATE_PRODUCT,
  ADMIN_GET_PRODUCTS,
  ADMIN_GET_ORDERS,
  ADMIN_GET_USERS,
} from "./CONSTANTS";
import config from "../constants/config";
import {
  GetOrdersResponse,
  GetProductsResponse,
  GetUsersResponse,
} from "./interfaces";

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

export const createProduct = async (
  authToken: string,
  name: string,
  description: string,
  category: string,
  price: string,
  discountPercentage: string,
  quantity: string,
  images: FileList
) => {
  const formData = new FormData();

  formData.append("name", name);
  formData.append("description", description);
  formData.append("category", category);
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

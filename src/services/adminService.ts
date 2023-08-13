import { ADMIN_GET_PRODUCTS } from "./CONSTANTS";
import config from "../constants/config";
import { GetProductsResponse } from "./interfaces";

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

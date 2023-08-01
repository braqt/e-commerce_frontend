import { IOrder } from "../interfaces/context";

export interface Product {
  _id: string;
  name: string;
  description: string;
  imagesUrl: string[];
  category: string;
  priceInCents: number;
  discountPercentage: number;
  quantity: number;
  finalPriceInCents: number;
  createdAt: string;
}

export interface OrderedProduct {
  product: Product;
  quantity: number;
}

export interface GetProductsResponse {
  products: Product[];
  pageNumberLimit: number;
}

export interface GetActiveOrdersResponse {
  activeOrders: IOrder[];
  pageNumberLimit: number;
}

export interface GetCompletedOrdersResponse {
  completedOrders: IOrder[];
  pageNumberLimit: number;
}

export interface GetNotCompletedOrdersResponse {
  notCompletedOrders: IOrder[];
  pageNumberLimit: number;
}

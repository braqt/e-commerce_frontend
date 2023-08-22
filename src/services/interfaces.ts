import {
  IOrder,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from "../interfaces/context";

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

export interface Order {
  _id: string;
  orderNumber: number;
  totalInCents: number;
  user: Account;
  state: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentState: PaymentStatus;
  createdAt: string;
}

export interface OrderedProduct {
  product: Product;
  quantity: number;
}

export interface Account {
  name: string;
  lastName: string;
  phone: string;
  dni: number;
  email: string;
  firebaseAuthID: string;
  emailVerified: boolean;
}

export interface AccountWithStatistics extends Account {
  _id: string;
  statistics: {
    totalSpentInCents: number;
    numberOfCompletedOrders: number;
  };
}

export interface GetProductsResponse {
  products: Product[];
  pageNumberLimit: number;
}

export interface GetOrdersResponse {
  orders: Order[];
  pageNumberLimit: number;
}

export interface GetUsersResponse {
  users: AccountWithStatistics[];
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

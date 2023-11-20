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
  user: AccountWithStatistics;
  products: {
    item: Product;
    quantity: number;
  }[];
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
  _id: string;
  name: string;
  lastName: string;
  phone: string;
  dni: number;
  email: string;
  firebaseAuthID: string;
  isAdmin: string;
  emailVerified: boolean;
  createdAt: string;
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

export interface UserOrder {
  orderNumber: number;
  totalInCents: number;
  paymentMethod: PaymentMethod;
  paymentState: PaymentStatus;
  state: OrderStatus;
  createdAt: string;
}

export interface GetUserOrdersResponse {
  orders: UserOrder[];
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

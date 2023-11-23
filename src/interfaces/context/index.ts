import { Product } from "../../services/interfaces";

export interface ICartContext {
  getProductFromLocalStorage: (
    productInCart: IProductInCart
  ) => ProductInCartInLocalStorage;
  getProductsFromLocalStorage: () => ProductInCartInLocalStorage[];
  addProductToCart: (product: Product, quantity: number) => void;
  modifyProductQuantityFromCart: (
    productInCartLS: ProductInCartInLocalStorage
  ) => void;
  removeProductFromCart: (idProductInCart: string) => void;
}

export interface ProductInCartInLocalStorage {
  id: string;
  quantity: number;
}

export interface IProductInCart {
  product: Product;
  quantity: number;
}

export enum OrderStatus {
  PREPARED = "PREPARED",
  NOT_PREPARED = "NOT_PREPARED",
  COMPLETED = "COMPLETED",
  NOT_COMPLETED = "NOT_COMPLETED",
}

export enum PaymentMethod {
  CASH = "CASH",
}

export enum PaymentStatus {
  PAID = "PAID",
  WAITING_FOR_PAYMENT = "WAITING_FOR_PAYMENT",
}

export interface IOrder {
  orderNumber: number;
  totalInCents: number;
  products: {
    item: string;
    quantity: number;
  }[];
  state: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentState: PaymentStatus;
  createdAt: string;
}

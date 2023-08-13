import { format } from "date-fns";
import {
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from "../interfaces/context";

export const centsToCurrencyNormalValue = (cents: number) => {
  return cents / 1000;
};

export const paymentMethodToString = (paymentMethod: PaymentMethod) => {
  switch (paymentMethod) {
    case PaymentMethod.CASH:
      return "Cash";
  }
};

export const paymentStatusToString = (paymentStatus: PaymentStatus) => {
  switch (paymentStatus) {
    case PaymentStatus.PAID:
      return "Paid";
    case PaymentStatus.WAITING_FOR_PAYMENT:
      return "Waiting For Payment";
  }
};

export const orderStatusToString = (orderStatus: OrderStatus) => {
  switch (orderStatus) {
    case OrderStatus.COMPLETED:
      return "Completed";
    case OrderStatus.NOT_COMPLETED:
      return "Not Completed";
    case OrderStatus.PREPARED:
      return "Prepared";
    case OrderStatus.NOT_PREPARED:
      return "Not Prepared";
  }
};

export const timestampToDateWithFormat = (timestamp: string | number) => {
  return format(new Date(timestamp), "PPP");
};

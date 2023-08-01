import React, { useState } from "react";

import styles from "./index.module.css";
import { MdExpandMore } from "react-icons/md";
import { format } from "date-fns";

import {
  centsToCurrencyNormalValue,
  orderStatusToString,
  paymentMethodToString,
  paymentStatusToString,
} from "../../utils/conversions";
import { OrderedProduct } from "../../services/interfaces";
import { getProduct } from "../../services";
import { IOrder } from "../../interfaces/context";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ProductInCartForConfirmation from "../ProductInCart/ProductInCartForConfirmation";
import SpinnerLoader from "../loaders/spinnerLoader";

interface Props {
  order: IOrder;
}

const OrderAccordion = ({ order }: Props) => {
  const [orderProducts, setOrderProducts] = useState<OrderedProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrderProducts = async () => {
    if (orderProducts.length == 0) {
      const orderedProducts: OrderedProduct[] = [];
      for (let orderProduct of order.products) {
        const product = await getProduct(orderProduct.item);
        orderedProducts.push({ product, quantity: orderProduct.quantity });
      }
      setOrderProducts(orderedProducts);
      setIsLoading(false);
    }
  };

  return (
    <Accordion className={styles.orderAccordion}>
      <AccordionSummary expandIcon={<MdExpandMore />}>
        Order #{order.orderNumber}
      </AccordionSummary>
      <AccordionDetails>
        <div className={styles.orderDetail}>
          <div>Date: {format(new Date(order.createdAt), "PPP")}</div>
          <div>
            Payment Method: {paymentMethodToString(order.paymentMethod)}
          </div>
          <div>Payment Status: {paymentStatusToString(order.paymentState)}</div>
          <div>Order status: {orderStatusToString(order.state)}</div>
          <div>Time available to pay the purchase on the store: 36h 00m</div>
        </div>
        <Accordion style={{ marginTop: "16px" }} onChange={fetchOrderProducts}>
          <AccordionSummary expandIcon={<MdExpandMore />}>
            <div>{order.products.length} different articles</div>
            <div style={{ marginLeft: "20px" }}>
              Total: Bs {centsToCurrencyNormalValue(order.totalInCents)}
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className={styles.orderProduct}>
              {isLoading && <SpinnerLoader />}
              {!isLoading && orderProducts.length > 0 && (
                <>
                  {orderProducts.map((orderProduct, index) => (
                    <ProductInCartForConfirmation
                      key={index}
                      image={orderProduct.product.imagesUrl[0]}
                      name={orderProduct.product.name}
                      priceInCents={orderProduct.product.finalPriceInCents}
                      quantity={orderProduct.quantity}
                      size="small"
                    />
                  ))}
                </>
              )}
            </div>
          </AccordionDetails>
        </Accordion>
      </AccordionDetails>
    </Accordion>
  );
};

export default OrderAccordion;

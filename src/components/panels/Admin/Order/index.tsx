import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import globalStyles from "../../../../index.module.css";
import adminPanelstyles from "../index.module.css";
import styles from "./index.module.css";

import { useAuthentication } from "../../../../context/auth";
import { OrderStatus, PaymentStatus } from "../../../../interfaces/context";
import {
  centsToCurrencyNormalValue,
  orderStatusToString,
  paymentMethodToString,
  paymentStatusToString,
} from "../../../../utils/conversions";
import { Order } from "../../../../services/interfaces";
import {
  adminSetOrderStatus,
  adminSetPaymentStatus,
  getAdminOrder,
} from "../../../../services/adminService";
import SpinnerLoader from "../../../loaders/spinnerLoader";
import ProductInCartForConfirmation from "../../../ProductInCart/ProductInCartForConfirmation";

const OrderPanel = () => {
  const { orderNumber } = useParams();
  const { firebaseAuthToken } = useAuthentication();
  const [order, setOrder] = useState<Order>();
  const [loadingOrder, setLoadingOrder] = useState(true);
  const [allButtonsDisabled, setAllButtonsDisabled] = useState(false);

  const fetchAndSetOrder = async () => {
    if (orderNumber) {
      setLoadingOrder(true);
      const order = await getAdminOrder(orderNumber, firebaseAuthToken);
      setOrder(order);
      setLoadingOrder(false);
    }
  };

  const onClickMarkAsPrepared = async () => {
    if (orderNumber) {
      setAllButtonsDisabled(true);
      await toast.promise(
        adminSetOrderStatus(
          orderNumber,
          OrderStatus.PREPARED,
          firebaseAuthToken
        ),
        {
          loading: "Proccesing...",
          success: <b>Success</b>,
          error: <b>Error</b>,
        }
      );
      location.reload();
    }
  };

  const onClickMarkAsPayed = async () => {
    if (orderNumber) {
      setAllButtonsDisabled(true);
      await toast.promise(
        adminSetPaymentStatus(
          orderNumber,
          PaymentStatus.PAID,
          firebaseAuthToken
        ),
        {
          loading: "Proccesing...",
          success: <b>Success</b>,
          error: <b>Error</b>,
        }
      );
      location.reload();
    }
  };

  const onClickMarkAsDelivered = async () => {
    if (orderNumber) {
      setAllButtonsDisabled(true);
      await toast.promise(
        adminSetOrderStatus(
          orderNumber,
          OrderStatus.COMPLETED,
          firebaseAuthToken
        ),
        {
          loading: "Proccesing...",
          success: <b>Success</b>,
          error: <b>Error</b>,
        }
      );
      location.reload();
    }
  };

  useEffect(() => {
    fetchAndSetOrder();
  }, []);

  return (
    <>
      {!loadingOrder && order && (
        <div className={globalStyles.pageFrame2}>
          <div className={adminPanelstyles.title}>Order #{orderNumber}</div>
          <div
            style={{ alignItems: "start", gap: "1rem" }}
            className={styles.orderInformation}
          >
            <div style={{ width: "100%" }}>
              <div className={styles.cardFrame}>
                <div className={styles.cardTitle}>
                  {orderStatusToString(order.state)}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    maxHeight: "416px",
                    overflow: "auto",
                    padding: "2px",
                  }}
                >
                  {order.products.length > 0 &&
                    order.products.map((product) => (
                      <ProductInCartForConfirmation
                        key={product.item._id}
                        size="small"
                        image={product.item.imagesUrl[0]}
                        name={product.item.name}
                        priceInCents={product.item.priceInCents}
                        quantity={product.quantity}
                      />
                    ))}
                </div>
                <div style={{ textAlign: "end", padding: "20px 0px " }}>
                  {order.state == OrderStatus.NOT_PREPARED && (
                    <button
                      disabled={allButtonsDisabled}
                      onClick={onClickMarkAsPrepared}
                    >
                      mark as prepared
                    </button>
                  )}
                </div>
              </div>
              <div
                className={styles.cardFrame}
                style={{
                  marginTop: "1rem",
                }}
              >
                <div className={styles.cardTitle}>
                  {paymentStatusToString(order.paymentState)}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "3px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <label>Payment Method</label>
                    <label>{paymentMethodToString(order.paymentMethod)}</label>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>
                      <label>Subtotal</label>
                      <label
                        style={{ color: "var(--gray)", marginLeft: "12px" }}
                      >
                        2 articles
                      </label>
                    </span>
                    <div>
                      Bs {centsToCurrencyNormalValue(order.totalInCents)}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      fontWeight: 500,
                      marginTop: "10px",
                    }}
                  >
                    <label>Total</label>
                    <div style={{ fontSize: "1.125rem" }}>
                      Bs {centsToCurrencyNormalValue(order.totalInCents)}
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: "end", padding: "20px 0px" }}>
                  {order.paymentState == PaymentStatus.WAITING_FOR_PAYMENT && (
                    <button
                      disabled={allButtonsDisabled}
                      onClick={onClickMarkAsPayed}
                    >
                      mark as payed
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.clientInformation}>
              <div style={{ padding: "16px 14px 8px 14px" }}>
                <div style={{ fontSize: "1.25rem", fontWeight: "500" }}>
                  Client
                </div>
                <div style={{ marginTop: "12px" }}>
                  <div>
                    <a
                      className={styles.link}
                      href="https://www.youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {order.user.name} {order.user.lastName}
                    </a>
                  </div>
                  <div style={{ marginTop: "3px" }}>
                    <a
                      className={styles.link}
                      href="https://www.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {order.user.statistics.numberOfCompletedOrders} completed
                      orders
                    </a>
                  </div>
                </div>
              </div>
              <hr />
              <div style={{ padding: "8px 14px 16px 14px" }}>
                <div
                  style={{
                    fontSize: "1.0625rem",
                    fontWeight: "500",
                  }}
                >
                  Contact
                </div>
                <div style={{ marginTop: "12px" }}>
                  <div>Phone: {order.user.phone}</div>
                  <div style={{ marginTop: "3px" }}>
                    Email: {order.user.email}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {order.paymentState == PaymentStatus.PAID &&
            order.state == OrderStatus.PREPARED && (
              <div style={{ textAlign: "center", margin: "40px 0px 30px 0px" }}>
                <button
                  onClick={onClickMarkAsDelivered}
                  disabled={allButtonsDisabled}
                >
                  mark as delivered
                </button>
              </div>
            )}
        </div>
      )}
      {loadingOrder && <SpinnerLoader />}
    </>
  );
};

export default OrderPanel;

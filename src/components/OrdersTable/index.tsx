import React, { useEffect, useState } from "react";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from "../../interfaces/context";
import { Order } from "../../services/interfaces";
import {
  centsToCurrencyNormalValue,
  orderStatusToString,
  paymentMethodToString,
  paymentStatusToString,
  timestampToDateWithFormat,
} from "../../utils/conversions";
import { ADMIN_USER } from "../../navigation/pagePaths";

interface ProductDataRow {
  idUser: string;
  orderNumber: number;
  createdAt: string;
  name: string;
  lastName: string;
  totalPriceInCents: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(
  idUser: string,
  orderNumber: number,
  createdAt: string,
  name: string,
  lastName: string,
  totalPriceInCents: number,
  paymentMethod: PaymentMethod,
  paymentStatus: PaymentStatus,
  orderStatus: OrderStatus
) {
  return {
    idUser,
    orderNumber,
    createdAt,
    name,
    lastName,
    totalPriceInCents,
    paymentMethod,
    paymentStatus,
    orderStatus,
  };
}

interface Props {
  orders: Order[];
}

const OrdersTable = ({ orders }: Props) => {
  const [rows, setRows] = useState<ProductDataRow[]>([]);

  useEffect(() => {
    let rows: ProductDataRow[] = [];
    for (let order of orders) {
      rows.push(
        createData(
          order.user._id,
          order.orderNumber,
          order.createdAt,
          order.user.name,
          order.user.lastName,
          order.totalInCents,
          order.paymentMethod,
          order.paymentState,
          order.state
        )
      );
    }
    setRows(rows);
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Order</StyledTableCell>
            <StyledTableCell align="left">Creation Date</StyledTableCell>
            <StyledTableCell align="left">Client</StyledTableCell>
            <StyledTableCell align="left">Total</StyledTableCell>
            <StyledTableCell align="left">Payment Method</StyledTableCell>
            <StyledTableCell align="left">Payment Status</StyledTableCell>
            <StyledTableCell align="left">Order Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.orderNumber}>
              <StyledTableCell align="left" scope="row">
                #{row.orderNumber}
              </StyledTableCell>
              <StyledTableCell align="left">
                {timestampToDateWithFormat(row.createdAt)}
              </StyledTableCell>
              <StyledTableCell align="left">
                <a
                  href={`${ADMIN_USER}/${row.idUser}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >{`${row.name} ${row.lastName}`}</a>
              </StyledTableCell>
              <StyledTableCell align="left">
                {centsToCurrencyNormalValue(row.totalPriceInCents)}
              </StyledTableCell>
              <StyledTableCell align="left">
                {paymentMethodToString(row.paymentMethod)}
              </StyledTableCell>
              <StyledTableCell align="left">
                {paymentStatusToString(row.paymentStatus)}
              </StyledTableCell>
              <StyledTableCell align="left">
                {orderStatusToString(row.orderStatus)}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrdersTable;

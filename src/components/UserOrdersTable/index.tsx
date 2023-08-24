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
  centsToCurrencyNormalValue,
  orderStatusToString,
  paymentMethodToString,
  paymentStatusToString,
  timestampToDateWithFormat,
} from "../../utils/conversions";
import {
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from "../../interfaces/context";
import { UserOrder } from "../../services/interfaces";

interface ProductDataRow {
  orderNumber: number;
  createdAt: string;
  totalInCents: number;
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
  orderNumber: number,
  createdAt: string,
  totalInCents: number,
  paymentMethod: PaymentMethod,
  paymentStatus: PaymentStatus,
  orderStatus: OrderStatus
) {
  return {
    orderNumber,
    createdAt,
    totalInCents,
    paymentMethod,
    paymentStatus,
    orderStatus,
  };
}

interface Props {
  orders: UserOrder[];
}

const UserOrdersTable = ({ orders }: Props) => {
  const [rows, setRows] = useState<ProductDataRow[]>([]);

  useEffect(() => {
    let rows: ProductDataRow[] = [];
    for (let order of orders) {
      rows.push(
        createData(
          order.orderNumber,
          order.createdAt,
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
                Bs {centsToCurrencyNormalValue(row.totalInCents)}
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

export default UserOrdersTable;

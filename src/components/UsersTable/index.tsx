import React, { useEffect, useState } from "react";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { AccountWithStatistics } from "../../services/interfaces";
import { centsToCurrencyNormalValue } from "../../utils/conversions";

interface UserDataRow {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  documentNumber: number;
  numberOfCompletedOrders: number;
  totalSpentInCents: number;
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
  name: string,
  lastName: string,
  email: string,
  phone: string,
  documentNumber: number,
  numberOfCompletedOrders: number,
  totalSpentInCents: number
) {
  return {
    name,
    lastName,
    email,
    phone,
    documentNumber,
    numberOfCompletedOrders,
    totalSpentInCents,
  };
}

interface Props {
  users: AccountWithStatistics[];
}

const UsersTable = ({ users }: Props) => {
  const [rows, setRows] = useState<UserDataRow[]>([]);

  useEffect(() => {
    let rows: UserDataRow[] = [];
    console.log(users);
    for (let user of users) {
      rows.push(
        createData(
          user.name,
          user.lastName,
          user.email,
          user.phone,
          user.dni,
          user.statistics.numberOfCompletedOrders,
          user.statistics.totalSpentInCents
        )
      );
    }
    console.log(users);
    setRows(rows);
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Name</StyledTableCell>
            <StyledTableCell align="left">Email</StyledTableCell>
            <StyledTableCell align="left">Phone</StyledTableCell>
            <StyledTableCell align="left">Document Number</StyledTableCell>
            <StyledTableCell align="left">Completed Orders</StyledTableCell>
            <StyledTableCell align="left">Total Spent</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.email}>
              <StyledTableCell align="left">
                {`${row.name} ${row.lastName}`}
              </StyledTableCell>
              <StyledTableCell align="left">{row.email}</StyledTableCell>
              <StyledTableCell align="left">{row.phone}</StyledTableCell>
              <StyledTableCell align="left">
                {row.documentNumber}
              </StyledTableCell>
              <StyledTableCell align="left">
                {row.numberOfCompletedOrders}
              </StyledTableCell>
              <StyledTableCell align="left">
                {`Bs ${centsToCurrencyNormalValue(row.totalSpentInCents)}`}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;

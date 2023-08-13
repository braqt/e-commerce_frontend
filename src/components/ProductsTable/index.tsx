import React, { useEffect, useState } from "react";

import styles from "./index.module.css";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Product } from "../../services/interfaces";
import {
  centsToCurrencyNormalValue,
  timestampToDateWithFormat,
} from "../../utils/conversions";

interface ProductDataRow {
  imageUrl: string;
  name: string;
  priceInCents: number;
  discountPercentage: number;
  finalPriceInCents: number;
  category: string;
  createdAt: string;
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
  imageUrl: string,
  name: string,
  priceInCents: number,
  discountPercentage: number,
  finalPriceInCents: number,
  category: string,
  createdAt: string
) {
  return {
    imageUrl,
    name,
    priceInCents,
    discountPercentage,
    finalPriceInCents,
    category,
    createdAt,
  };
}

interface Props {
  products: Product[];
}

const ProductsTable = ({ products }: Props) => {
  const [rows, setRows] = useState<ProductDataRow[]>([]);

  useEffect(() => {
    let rows: ProductDataRow[] = [];
    for (let product of products) {
      rows.push(
        createData(
          product.imagesUrl[0],
          product.name,
          product.priceInCents,
          product.discountPercentage,
          product.finalPriceInCents,
          product.category,
          product.createdAt
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
            <StyledTableCell></StyledTableCell>
            <StyledTableCell align="left">Name</StyledTableCell>
            <StyledTableCell align="left">Price</StyledTableCell>
            <StyledTableCell align="left">Discount</StyledTableCell>
            <StyledTableCell align="left">Final Price</StyledTableCell>
            <StyledTableCell align="left">Category</StyledTableCell>
            <StyledTableCell align="left">Posted On</StyledTableCell>
            <StyledTableCell align="left">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell align="left">
                <img className={styles.image} src={row.imageUrl} />
              </StyledTableCell>
              <StyledTableCell align="left" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="left">
                {centsToCurrencyNormalValue(row.priceInCents)}
              </StyledTableCell>
              <StyledTableCell align="left">{`${row.discountPercentage}%`}</StyledTableCell>
              <StyledTableCell align="left">
                {centsToCurrencyNormalValue(row.finalPriceInCents)}
              </StyledTableCell>
              <StyledTableCell align="left">{row.category}</StyledTableCell>
              <StyledTableCell align="left">
                {timestampToDateWithFormat(row.createdAt)}
              </StyledTableCell>
              <StyledTableCell align="left">
                <button>...</button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductsTable;

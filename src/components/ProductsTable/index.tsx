import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./index.module.css";

import { CURRENCY_SYMBOL } from "../../constants";
import {
  centsToCurrencyNormalValue,
  timestampToDateWithFormat,
} from "../../utils/conversions";
import { PRODUCT_PATH } from "../../navigation/pagePaths";

import { Product } from "../../services/interfaces";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

interface ProductDataRow {
  id: string;
  imageUrl: string;
  name: string;
  priceInCents: number;
  discountPercentage: number;
  finalPriceInCents: number;
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
  id: string,
  imageUrl: string,
  name: string,
  priceInCents: number,
  discountPercentage: number,
  finalPriceInCents: number,
  createdAt: string
) {
  return {
    id,
    imageUrl,
    name,
    priceInCents,
    discountPercentage,
    finalPriceInCents,
    createdAt,
  };
}

interface Props {
  products: Product[];
}

const ProductsTable = ({ products }: Props) => {
  const navigate = useNavigate();
  const [rows, setRows] = useState<ProductDataRow[]>([]);

  useEffect(() => {
    let rows: ProductDataRow[] = [];
    for (let product of products) {
      rows.push(
        createData(
          product._id,
          product.imagesUrl[0],
          product.name,
          product.priceInCents,
          product.discountPercentage,
          product.finalPriceInCents,
          product.createdAt
        )
      );
    }
    setRows(rows);
  }, []);

  const onClickProduct = (idProduct: string) => {
    navigate(`${PRODUCT_PATH}/${idProduct}`);
  };

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
              <StyledTableCell
                align="left"
                style={{ cursor: "pointer" }}
                onClick={() => onClickProduct(row.id)}
              >
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="left">
                {CURRENCY_SYMBOL} {centsToCurrencyNormalValue(row.priceInCents)}
              </StyledTableCell>
              <StyledTableCell align="left">{`${row.discountPercentage}%`}</StyledTableCell>
              <StyledTableCell align="left">
                {CURRENCY_SYMBOL}{" "}
                {centsToCurrencyNormalValue(row.finalPriceInCents)}
              </StyledTableCell>
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

import React, { useState } from "react";

import globalStyles from "../../../../index.module.css";
import accessStyles from "../../Access/index.module.css";
import styles from "../index.module.css";
import StyledInput from "../../../Input/StyledInput";
import {
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { createProduct } from "../../../../services/adminService";
import { useAuthentication } from "../../../../context/auth";

const categories = ["Phone", "Bicycle"];

interface Props {
  onClickBack: () => void;
  onCreateProduct: () => void;
}

const CreateProductPanel = ({ onClickBack, onCreateProduct }: Props) => {
  const [inputValues, setInputValues] = useState({
    name: "",
    description: "",
    category: "",
    quantity: "",
    price: "",
    discount: "",
  });
  const { firebaseAuthToken } = useAuthentication();

  const onChangeInput = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    setInputValues((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const images = (
      document.getElementById("productImages") as HTMLInputElement
    ).files;
    if (images && images.length > 0) {
      try {
        await createProduct(
          firebaseAuthToken,
          inputValues.name,
          inputValues.description,
          inputValues.category,
          inputValues.price,
          inputValues.discount ?? 0,
          inputValues.quantity,
          images
        );
        onCreateProduct();
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div className={globalStyles.pageFrame2}>
      <div className={styles.title}>Create Product</div>
      <div style={{ marginTop: "28px" }}>
        <button onClick={onClickBack}>back</button>
      </div>
      <form onSubmit={onSubmit} className={styles.createProductForm}>
        <div className={accessStyles.labelAndInput}>
          <div>Product Name</div>
          <StyledInput
            required
            name="name"
            onChange={onChangeInput}
            value={inputValues.name}
            style={{ width: "100%" }}
          />
        </div>
        <div className={accessStyles.labelAndInput}>
          <div>Description</div>
          <textarea
            required
            name="description"
            onChange={onChangeInput}
            value={inputValues.description}
            style={{ width: "100%", height: "130px" }}
          />
        </div>
        <div className={accessStyles.labelAndInput}>
          <div>Images</div>
          <input
            id="productImages"
            required
            name="images"
            type="file"
            multiple
          />
        </div>
        <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
          <div className={accessStyles.labelAndInput}>
            <div>Category</div>
            <Select
              displayEmpty
              required
              name="category"
              value={inputValues.category}
              onChange={onChangeInput}
              input={<OutlinedInput />}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em></em>;
                }

                return selected;
              }}
              inputProps={{ "aria-label": "Without label" }}
              size="small"
            >
              <MenuItem disabled value="">
                <em></em>
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className={accessStyles.labelAndInput}>
            <div>Quantity</div>
            <StyledInput
              required
              name="quantity"
              onChange={onChangeInput}
              value={inputValues.quantity}
              style={{ width: "95px" }}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <div className={accessStyles.labelAndInput}>
            <div>Price</div>
            <StyledInput
              required
              name="price"
              onChange={onChangeInput}
              value={inputValues.price}
              style={{ width: "150px" }}
            />
          </div>
          <div className={accessStyles.labelAndInput}>
            <div>Discount</div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <StyledInput
                required
                name="discount"
                onChange={onChangeInput}
                value={inputValues.discount}
                style={{ width: "38px", padding: "10px" }}
              />
              <div style={{ fontSize: "1.25rem" }}>%</div>
            </div>
          </div>
          <div className={accessStyles.labelAndInput}>
            <div>Final Price</div>
            <div className={styles.finalPrice}>
              Bs{" "}
              {+inputValues.price -
                +inputValues.price * (+inputValues.discount / 100)}
            </div>
          </div>
        </div>
        <div style={{ margin: "10px 0px 20px 0px" }}>
          <button type="submit">create product</button>
        </div>
      </form>
    </div>
  );
};

export default CreateProductPanel;
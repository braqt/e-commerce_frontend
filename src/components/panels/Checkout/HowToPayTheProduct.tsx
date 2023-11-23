import React from "react";
import { useNavigate } from "react-router-dom";

import { MY_CART_PATH } from "../../../navigation/pagePaths";

import LeafletMapStoreLocation from "../../leafletMapStoreLocation";

interface Props {
  onClickContinueButton: () => void;
}

const HowToPayTheProduct = ({ onClickContinueButton }: Props) => {
  const navigate = useNavigate();

  const onClickCancel = () => {
    navigate(MY_CART_PATH);
  };

  return (
    <div>
      <div>
        <div>How to pay the product?</div>
        <div>
          In our store you can pay and pick up the product with the product
          order number that you can see in your my reservations.
        </div>
      </div>
      <div style={{ marginTop: "30px" }}>
        <div>Payment Method</div>
        <div>Cash</div>
      </div>
      <div style={{ marginTop: "30px" }}>
        <div>Location</div>
        <div>We are at: 165 Pearl St</div>
      </div>
      <div style={{ marginTop: "30px" }}>
        <LeafletMapStoreLocation />
      </div>
      <div style={{ margin: "45px 0px", textAlign: "center" }}>
        <button style={{ marginRight: "10px" }} onClick={onClickCancel}>
          cancel
        </button>
        <button onClick={onClickContinueButton}>continue</button>
      </div>
    </div>
  );
};

export default HowToPayTheProduct;

import React from "react";

import LeafletMapStoreLocation from "../../leafletMapStoreLocation";

interface Props {
  onClickContinueButton: () => void;
}

const HowToPayTheProduct = ({ onClickContinueButton }: Props) => {
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
        <button onClick={onClickContinueButton}>continue</button>
      </div>
    </div>
  );
};

export default HowToPayTheProduct;

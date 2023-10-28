import React from "react";

import masterCard from "../../assets/all-images/master-card.jpg";
import paypal from "../../assets/all-images/paypal.jpg";
import "../../styles/payment-method.css";

const PaymentMethod = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="payment mt-3 d-flex align-items-center justify-content-between">
        <label htmlFor="payment" className="d-flex align-items-center gap-2">
          <input type="radio" name="payment" value="cash" /> Cash
        </label>
      </div>

      <div className="payment mt-3 d-flex align-items-center justify-content-between">
        <label htmlFor="payment" className="d-flex align-items-center gap-2">
          <input type="radio" name="payment" value="upi" /> UPI
        </label>
      </div>

      <div className="payment mt-4">
        <button type="submit">Reserve Now</button>
      </div>
    </form>
  );
};

export default PaymentMethod;

import React from "react";
import { useLocation } from "react-router";
import "../../styles/payment-success.css";

export const PaymentSuccess = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const refrenceId = searchParams.get("reference_id");

  return (
    <div className="payment-success">
      <h3 className="payment-success-heading">
        Your rental car is successfully booked
      </h3>
      <h5>Thank you for choosing our service</h5>
    </div>
  );
};

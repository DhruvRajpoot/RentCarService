import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import "../../styles/payment-success.css";
import { SERVER_URL } from "../../config/config.jsx";
import useaxios from "../../utils/useaxios.jsx";
import axios from "axios";
import { Link } from "react-router-dom";
import { MyContext } from "../../context/context.js";

export const PaymentSuccess = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const paymentId = searchParams.get("payment_id");
  const orderId = searchParams.get("order_id");
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState({});
  const { loggedInUser } = useContext(MyContext);
  const navigate = useNavigate();

  const fetchOrderDetails = async () => {
    if (!loggedInUser) {
      navigate("/login");
      return;
    }

    const api = useaxios();
    setLoading(true);
    try {
      const response = await api.get(`${SERVER_URL}/order/getorder/${orderId}`);
      if (response.status === 200) {
        console.log(response.data);
        setOrderDetails(response.data);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  return (
    <div className="payment-success">
      {loading ? (
        <div className="loader">
          <h2 className="loader-spinner">Loading...</h2>
        </div>
      ) : (
        <>
          {Object.keys(orderDetails).length === 0 ? (
            <div className="payment-succes-wrapper">
              <h2 style={{ color: "red", marginBottom: "1rem" }}>
                Order not found
              </h2>
              <Link to="/">
                <button className="payment-success-btn">Go to Home</button>
              </Link>
            </div>
          ) : (
            <div className="payment-success-wrapper">
              <span className="green-tick-payment-success">
                <i className="ri-check-double-line"></i>
              </span>
              <h3 className="payment-success-heading">
                Your rental car is successfully booked
              </h3>
              <h5>We have mailed you the details of your booking</h5>
              <h6>Thank you for choosing our service</h6>
              <Link to="/">
                <button className="payment-success-btn">Go to Home</button>
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

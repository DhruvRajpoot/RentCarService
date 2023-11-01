import React, { useState } from "react";
import "../../styles/booking-form.css";
import { Form } from "reactstrap";
import axios from "axios";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobilenumber: "",
    address: "",
    date: "",
    time: "",
    message: "",
    paymentmode: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    const { data } = await axios.post(
      `https://rent-car-service.onrender.com/payment/createorder`,
      {
        email: "dhruv.kutarya@gmail.com",
        amount: 2,
      }
    );
    const options = {
      key: `${process.env.REACT_APP_RAZORPAY_KEY_ID}`,
      amount: data.amount,
      currency: data.currency,
      name: "Rent Car Service",
      description: "Payment for car rent",
      image: `https://rent-car-service.onrender.com/logo.png`,
      order_id: data.id,
      callback_url: `https://rent-car-service.onrender.com/payment/verify`,
      prefill: {
        name: data.fullname,
        email: data.email,
        contact: formData.mobilenumber,
      },
      theme: {
        color: "#000d6b",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();

    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      mobilenumber: "",
      address: "",
      date: "",
      time: "",
      message: "",
      paymentmode: "",
    });
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <h5 className="mb-4 fw-bold">Booking Information</h5>

      <div className="booking-form-div">
        <input
          type="text"
          placeholder="First Name"
          name="firstname"
          onChange={handleChange}
          value={formData.firstname}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          name="lastname"
          onChange={handleChange}
          value={formData.lastname}
          required
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          value={formData.email}
          required
        />
        <input
          type="number"
          placeholder="Mobile Number"
          name="mobilenumber"
          onChange={handleChange}
          value={formData.mobilenumber}
          pattern="[0-9]{10}"
          required
        />
        <input
          type="date"
          placeholder="Journey Date"
          name="date"
          onChange={handleChange}
          value={formData.date}
          required
        />
        <input
          type="time"
          placeholder="Journey Time"
          className="time__picker"
          onChange={handleChange}
          value={formData.time}
          name="time"
        />
      </div>
      <textarea
        rows={5}
        type="textarea"
        className="textarea"
        placeholder="Address"
        name="address"
        onChange={handleChange}
        value={formData.address}
        required
      />

      <div className="payment__info mt-3">
        <h5 className="mb-4 fw-bold ">Payment Information</h5>
        <div className="payment mt-3 d-flex align-items-center justify-content-between">
          <label
            htmlFor="cash"
            className="d-flex align-items-center gap-2"
            style={{ cursor: "pointer" }}
          >
            <input
              type="radio"
              name="paymentmode"
              id="cash"
              value="cash"
              onChange={handleChange}
              required
            />
            Cash
          </label>
        </div>

        <div className="payment mt-3 d-flex align-items-center justify-content-between">
          <label
            htmlFor="upi"
            className="d-flex align-items-center gap-2"
            style={{ cursor: "pointer" }}
          >
            <input
              type="radio"
              name="paymentmode"
              id="upi"
              value="upi"
              onChange={handleChange}
              required
            />
            UPI
          </label>
        </div>

        <div className="payment mt-4">
          <button type="submit">Reserve Now</button>
        </div>
      </div>
    </Form>
  );
};

export default BookingForm;

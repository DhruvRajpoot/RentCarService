import React, { useEffect, useState } from "react";
import "../../styles/booking-form.css";
import { Form } from "reactstrap";
import axios from "axios";
import { SERVER_URL } from "../../config/config";

const BookingForm = () => {
  const [disabled, setDisabled] = useState(false);

  // gives 2 hours ahead time in local timezone
  const currentDate = new Date();
  currentDate.setMinutes(
    currentDate.getMinutes() - currentDate.getTimezoneOffset()
  );
  currentDate.setHours(currentDate.getHours() + 2);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobilenumber: "",
    address: "",
    date: "",
    time: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);
    console.log(formData);
    try {
      const { data } = await axios.post(`${SERVER_URL}/payment/createorder`, {
        email: "dhruv.kutarya@gmail.com",
        amount: 2,
      });
      const options = {
        key: `${process.env.REACT_APP_RAZORPAY_KEY_ID}`,
        amount: data.amount,
        currency: data.currency,
        name: "Rent Car Service",
        description: "Payment for car rent",
        image: `${SERVER_URL}/logo.png`,
        order_id: data.id,
        callback_url: `${SERVER_URL}/payment/verify`,
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
    } catch (err) {
      console.log(err);
    }
    setDisabled(false);
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
          type="text"
          placeholder="Mobile Number"
          name="mobilenumber"
          onChange={handleChange}
          value={formData.mobilenumber}
          pattern="[0-9]{10}"
          required
        />
        <input
          type="date"
          className="pickup__date__picker"
          name="date"
          onChange={handleChange}
          value={formData.date}
          min={currentDate.toISOString().split("T")[0]}
          required
        />
        <input
          type="time"
          className="time__picker"
          onChange={handleChange}
          value={formData.time}
          name="time"
          min={currentDate.toISOString().split("T")[1].split(".")[0]}
          required
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

      <div className="payment mt-4">
        <button type="submit" disabled={disabled}>
          Reserve Now
        </button>
      </div>
    </Form>
  );
};

export default BookingForm;

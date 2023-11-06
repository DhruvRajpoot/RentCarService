import React, { useEffect, useState } from "react";
import "../../styles/booking-form.css";
import { Form } from "reactstrap";
import axios from "axios";
import { SERVER_URL } from "../../config/config";
import { useContext } from "react";
import { MyContext } from "../../context/context";
import { useNavigate } from "react-router-dom";
import useaxios from "../../utils/useaxios";

const BookingForm = ({ carDetails, slug }) => {
  const navigate = useNavigate();
  const api = useaxios();

  // Reserve Now button disabled state
  const [disabled, setDisabled] = useState(false);

  // Gives 2 hours ahead time in local timezone
  const currentDate = new Date();
  currentDate.setMinutes(
    currentDate.getMinutes() - currentDate.getTimezoneOffset()
  );
  currentDate.setHours(currentDate.getHours() + 2);

  // Journey details state
  const { journeyData, setJourneyData, loggedInUser } = useContext(MyContext);

  const handleChange = (e) => {
    setJourneyData({ ...journeyData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);

    if (!loggedInUser) {
      navigate("/login", { state: { from: `/cars/${slug}` } });
      return;
    }

    try {
      const { data } = await api.post(`${SERVER_URL}/payment/createorder`, {
        carDetails: {
          _id: carDetails.id,
          carName: carDetails.carName,
          price: carDetails.price,
        },
      });

      // create booking order with razorpay_order_id
      await api.post(`${SERVER_URL}/order/createorder`, {
        razorpay_order_id: data.id,
        carId: String(data.carDetails._id),
        journeyDetails: journeyData,
      });

      const options = {
        key: `${process.env.REACT_APP_RAZORPAY_KEY_ID}`,
        amount: data.carDetails.price,
        currency: data.currency,
        name: "Rent Car Service",
        description: `Payment for ${carDetails.carName} rent`,
        image: `${SERVER_URL}/logo.png`,
        order_id: data.id,
        callback_url: `${SERVER_URL}/payment/verify`,
        prefill: {
          name: data.fullname,
          email: data.email,
          contact: journeyData.mobilenumber,
        },
        theme: {
          color: "#000d6b",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();

      setJourneyData({
        firstname: "",
        lastname: "",
        email: "",
        mobilenumber: "",
        address: "",
        pickup_date: "",
        pickup_time: "",
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
          value={journeyData.firstname}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          name="lastname"
          onChange={handleChange}
          value={journeyData.lastname}
          required
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          value={journeyData.email}
          required
        />
        <input
          type="text"
          placeholder="Mobile Number"
          name="mobilenumber"
          onChange={handleChange}
          value={journeyData.mobilenumber}
          pattern="[0-9]{10}"
          required
        />
        <input
          type="date"
          className="pickup__date__picker"
          name="pickup_date"
          onChange={handleChange}
          value={journeyData.pickup_date}
          min={currentDate.toISOString().split("T")[0]}
          required
        />
        <input
          type="time"
          className="time__picker"
          onChange={handleChange}
          value={journeyData.pickup_time}
          name="pickup_time"
          step={1}
          min={
            journeyData.pickup_date === currentDate.toISOString().split("T")[0]
              ? currentDate.toISOString().split("T")[1].split(".")[0]
              : null
          }
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
        value={journeyData.address}
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

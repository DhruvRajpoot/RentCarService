import React from "react";
import "../../styles/booking-form.css";
import { Form, FormGroup } from "reactstrap";

const BookingForm = () => {
  const submitHandler = (event) => {
    event.preventDefault();
  };
  return (
    <Form onSubmit={submitHandler}>
      <div className="booking-form-div">
        <input type="text" placeholder="First Name" />

        <input type="text" placeholder="Last Name" />

        <input type="email" placeholder="Email" />

        <input type="number" placeholder="Phone Number" />

        <input type="text" placeholder="From Address" />

        <input type="text" placeholder="To Address" />

        <input type="date" placeholder="Journey Date" />

        <input
          type="time"
          placeholder="Journey Time"
          className="time__picker"
        />
      </div>

      <FormGroup>
        <textarea
          rows={5}
          type="textarea"
          className="textarea"
          placeholder="Write"
        ></textarea>
      </FormGroup>
    </Form>
  );
};

export default BookingForm;

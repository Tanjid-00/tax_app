import React, { useState } from "react";
import style from "../../../styles/taxfile.module.css";

const Payment = ({ onSubmit, onChange, cardHolderName, cardNumber }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { cardHolderName, cardNumber };
    onSubmit(formData);
  };
  return (
    <div className={style.paymentForm}>
      <div>
        <h3>Payment</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="cardHolderName">
            Cardholder’s Name
            <input
              type="text"
              id="cardHolderName"
              name="cardHolderName"
              value={cardHolderName}
              onChange={(e) =>
                onChange("payment", "cardHolderName", e.target.value)
              }
            />
          </label>

          <label htmlFor="cardNumber">
            Card Number
            <input
              type="number"
              id="cardNumber"
              name="cardNumber"
              value={cardNumber}
              onChange={(e) =>
                onChange("payment", "cardNumber", e.target.value)
              }
            />
          </label>

          <button className={style.submitBtn} type="submit">
            CONTINUE
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;

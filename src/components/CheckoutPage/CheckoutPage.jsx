"use client";
import {PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";
import React, {useState} from "react";
import {Button} from "../ui/button";

const CheckoutPage = ({prices}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const {error: confirmError} = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/Dashboard/userManagement`,
      },
    });

    if (confirmError) {
      setErrorMessage(confirmError.message);
      setLoading(false);
      return;
    } else {
      console.log("Payment successful!");
      setLoading(false);
    }
  };

  return (
    <div className="text-center mt-3">
      <form onSubmit={handleSubmit}>
        <PaymentElement className="w-[500px] mx-auto mb-4" />
        {errorMessage && <div>{errorMessage}</div>}
        <Button
          disabled={!stripe || loading}
          className="bg-primary-color hover:bg-secondary-color w-[500px]"
        >
          {!loading ? `Pay $${prices}` : "Processing..."}
        </Button>
      </form>
    </div>
  );
};

export default CheckoutPage;

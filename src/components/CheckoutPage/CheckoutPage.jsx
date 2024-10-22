"use client";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import {PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";
import React, {useEffect, useState} from "react";
import {Button} from "../ui/button";

const CheckoutPage = ({prices}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({prices: convertToSubcurrency(prices)}),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [prices]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const {error: submitError} = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const {error} = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://www.localhost:3000/payment-success?prices=${prices}`,
      },
    });

    if (error) {
      // This point is only reached if there's an immediate error when
      // confirming the payment. Show the error to your customer (for example, payment details incomplete)
      setErrorMessage(error.message);
    } else {
      // The payment UI automatically closes with a success animation.
      // Your customer is redirected to your `return_url`.
    }

    setLoading(false);
  };

  //   if (!clientSecret || !stripe || !elements) {
  //     return (
  //       <div className="flex items-center justify-center">
  //         <div
  //           className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
  //           role="status"
  //         >
  //           <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
  //             Loading...
  //           </span>
  //         </div>
  //       </div>
  //     );
  //   }

  return (
    <div className="text-center mt-3">
      <form onSubmit={handleSubmit}>
        {<PaymentElement className="w-[500px] mx-auto mb-4" />}
        {errorMessage && <div>{errorMessage}</div>}

        <Button
          disabled={!stripe || loading}
          className="bg-primary-color hover:bg-secondary-color hover:text-black w-[500px]"
        >
          {!loading ? `Pay $${prices}` : "Processing..."}
        </Button>
      </form>
    </div>
  );
};

export default CheckoutPage;

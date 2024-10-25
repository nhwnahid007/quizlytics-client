"use client";
import React, {useState, useEffect, Suspense} from "react";
import {useSearchParams} from "next/navigation";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import CheckoutPage from "@/components/CheckoutPage/CheckoutPage";
import LoadingSpinner from "@/components/Spinner/LoadingSpinner";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const PaymentCard = () => {
  const searchParams = useSearchParams();
  const prices = searchParams.get("price");
  const plans = searchParams.get("plan");
  const [clientSecret, setClientSecret] = useState(null);

  // Fetch clientSecret from the server when prices are available
  useEffect(() => {
    if (prices) {
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prices: convertToSubcurrency(prices), // Convert to subcurrency (like cents)
          email: "user@example.com", // Replace with actual user email
          userName: "John Doe", // Replace with actual user name
        }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret)); // Set the clientSecret from the backend response
    }
  }, [prices]);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="max-w-full mx-auto p-6 bg-white shadow-md rounded-lg mt-10 md:mt-20 min-h-[calc(100vh-360px)]">
        <h1 className="text-4xl font-bold text-center mb-4">Payment Summary</h1>
        {prices ? (
          <div className="text-center">
            <p className="text-2xl font-bold text-secondary-color">
              <span className="text-primary-color">Plan:</span> {plans}
            </p>
            <p className="text-2xl font-bold text-red-500">
              <span className="text-green-500">Pay:</span> ${prices}
            </p>
          </div>
        ) : (
          <p className="text-center"><LoadingSpinner /></p>
        )}

        {/* Only render the Elements component when clientSecret is available */}
        {clientSecret && (
          <Elements stripe={stripePromise} options={{clientSecret}}>
            <CheckoutPage clientSecret={clientSecret} prices={prices} />
          </Elements>
        )}
      </div>
    </Suspense>
  );
};

export default PaymentCard;

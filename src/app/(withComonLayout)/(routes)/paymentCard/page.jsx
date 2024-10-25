"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import CheckoutPage from "@/components/CheckoutPage/CheckoutPage";
import LoadingSpinner from "@/components/Spinner/LoadingSpinner";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const PaymentCard = () => {
  const [prices, setPrices] = useState(null);
  const [plans, setPlans] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const searchParams = useSearchParams();

  useEffect(() => {
    // Ensure this code only runs on the client
    if (typeof window !== "undefined") {
      const price = searchParams.get("price");
      const plan = searchParams.get("plan");
      setPrices(price);
      setPlans(plan);

      if (price) {
        // Fetch clientSecret from the server
        fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prices: convertToSubcurrency(price),
            email: "user@example.com", // Replace with actual user email
            userName: "John Doe", // Replace with actual user name
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            setClientSecret(data.clientSecret);
            setLoading(false); // Set loading to false after fetching clientSecret
          })
          .catch((error) => {
            console.error("Error fetching client secret:", error);
            setLoading(false);
          });
      } else {
        setLoading(false); // If no prices, stop loading
      }
    }
  }, [searchParams]);

  return (
    <div className="max-w-full mx-auto p-6 bg-white shadow-md rounded-lg mt-10 md:mt-20 min-h-[calc(100vh-360px)]">
      <h1 className="text-4xl font-bold text-center mb-4">Payment Summary</h1>
      {loading ? (
        <LoadingSpinner />
      ) : prices ? (
        <div className="text-center">
          <p className="text-2xl font-bold text-secondary-color">
            <span className="text-primary-color">Plan:</span> {plans}
          </p>
          <p className="text-2xl font-bold text-red-500">
            <span className="text-green-500">Pay:</span> ${prices}
          </p>
          {clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutPage clientSecret={clientSecret} prices={prices} />
            </Elements>
          )}
        </div>
      ) : (
        <p className="text-center">Invalid price. Please check your input.</p>
      )}
    </div>
  );
};

export default PaymentCard;

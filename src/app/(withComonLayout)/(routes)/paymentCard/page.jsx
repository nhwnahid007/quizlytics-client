"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react"; // Import Suspense
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutPage from "@/components/CheckoutPage/CheckoutPage";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const PaymentCard = () => {
  const searchParams = useSearchParams();
  const prices = searchParams.get("price");
  const plans = searchParams.get("plan");

  return (
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
        <p className="text-center">Loading price...</p>
      )}
      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(prices),
          currency: "usd",
        }}
      >
        <CheckoutPage prices={prices} />
      </Elements>
    </div>
  );
};

// Wrap PaymentCard in Suspense
const PaymentCardWrapper = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <PaymentCard />
  </Suspense>
);

export default PaymentCardWrapper;
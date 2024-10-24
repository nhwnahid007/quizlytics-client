import {NextResponse} from "next/server";
import Stripe from "stripe";

// const stripe = require("stripe")(process.env.NEXT_STRIPE_SECRET_KEY);
const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const {prices, email, userName} = body; // Ensure email and userName are passed in request body

    const paymentIntent = await stripe.paymentIntents.create({
      amount: prices,
      currency: "usd",
      receipt_email: email, // For sending receipt
      metadata: {userName}, // Save userName as metadata
      automatic_payment_methods: {enabled: true},
    });

    return NextResponse.json({clientSecret: paymentIntent.client_secret});
  } catch (error) {
    console.error("Internal Error:", error);
    return NextResponse.json(
      {error: `Internal Server Error: ${error}`},
      {status: 500}
    );
  }
}

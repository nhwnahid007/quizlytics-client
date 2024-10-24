import {NextResponse} from "next/server";
const stripe = require("stripe")(process.env.NEXT_STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const {prices, email, userName} = body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: prices,
      currency: "usd",
      receipt_email: email,
      metadata: {userName},
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

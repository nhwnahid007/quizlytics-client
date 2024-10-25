import {NextResponse} from "next/server";
console.log(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
 const stripe = require('stripe')('sk_test_51OEFM7ERHCr2ptRIRRRI7VEsIm5FGa5nat29Gh7n5ddpE2yPEqBfbtGxmsp6GkzEUxd2afi8pcXeB0wGDMFFq5YK000esb1exc');

export async function POST(request) {
  try {
    const body = await request.json();
    console.log("Request Body:", body); 
    const {prices} = body;

    const paymentIntent = await stripe.paymentIntents.create({
      prices: prices,
      currency: "usd",
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

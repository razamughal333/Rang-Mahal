"use server";

import Stripe from "stripe";
import { redirect } from "next/navigation";

export async function checkoutCredits(amount: number) {
  const stripe = new Stripe(
    "sk_test_51Pb8SwCBaXXOnaL8dSaYEbSE2mpfylvCrDtd9yImOtNffwWo6SFWs6K66gpZUa8UcHxhdTmHQtNNDoP7VqdM1d47008ZIM3eXE"
  );

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "pkr", // Or your desired currency
          product_data: {
            name: "Custom Amount",
          },
          unit_amount: amount * 100, // Amount in cents
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `http://localhost:3000/`,
    cancel_url: `http://localhost:3000/`,
  });

  redirect(session.url!);
}

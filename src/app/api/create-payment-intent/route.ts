import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-01-27.acacia', // Use a valid Stripe API version
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // ✅ Properly parse JSON request
    const { amount } = body;

    if (!amount || typeof amount !== 'number') {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: 'usd',
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret }, { status: 200 });
  } catch (error) {
    console.error('Stripe Error:', error);

    // Handle the error in a type-safe way
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Fallback for unknown errors
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
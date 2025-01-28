import { NextResponse } from 'next/server';

const CHAPA_SECRET_KEY = process.env.CHAPA_SECRET_KEY;
const CHAPA_API_URL = 'https://api.chapa.co/v1/transaction/initialize';

export async function POST(request: Request) {
  try {
    // Check for API key first
    if (!CHAPA_SECRET_KEY) {
      const error = 'Chapa API key is not configured';
      console.error(error);
      return NextResponse.json({ error }, { status: 503 });
    }

    const body = await request.json();
    const { amount, email, first_name, last_name, tx_ref } = body;

    // Validate required fields
    if (!amount || !email || !first_name || !last_name || !tx_ref) {
      const error = 'Missing required payment information';
      console.error(error, { body });
      return NextResponse.json({ error }, { status: 400 });
    }

    // Validate amount
    if (amount <= 0) {
      const error = 'Invalid payment amount';
      console.error(error, { amount });
      return NextResponse.json({ error }, { status: 400 });
    }

    // Ensure callback_url and return_url are valid URLs
    const callbackUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/callback`;
    const returnUrl = `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`;

    // Check if these URLs are valid
    try {
      new URL(callbackUrl);
      new URL(returnUrl);
    } catch (err) {
      const error = 'Invalid callback_url or return_url';
      console.error(error, { callbackUrl, returnUrl });
      return NextResponse.json({ error }, { status: 400 });
    }

    const paymentData = {
      amount: amount.toString(),
      currency: 'ETB',
      email,
      first_name,
      last_name,
      tx_ref,
      callback_url: callbackUrl,
      return_url: returnUrl,
      customization: {
        title: 'Event Payment',
        description: 'Payment for event registration'
      }
    };

    const response = await fetch(CHAPA_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CHAPA_SECRET_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(paymentData)
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error('Chapa API error:', responseData);
      return NextResponse.json(
        { error: responseData.message || 'Payment initialization failed' },
        { status: response.status }
      );
    }

    return NextResponse.json(responseData);

  } catch (error) {
    console.error('Payment processing error:', error);
    return NextResponse.json(
      { error: 'Failed to process payment request' },
      { status: 500 }
    );
  }
}

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

    // Log the received data for debugging
    console.log('Received payment request:', { amount, email, first_name, last_name, tx_ref });

    // Validate required fields
    if (!amount || !email || !first_name || !last_name || !tx_ref) {
      const missingFields = [];
      if (!amount) missingFields.push('amount');
      if (!email) missingFields.push('email');
      if (!first_name) missingFields.push('first_name');
      if (!last_name) missingFields.push('last_name');
      if (!tx_ref) missingFields.push('tx_ref');

      const error = `Missing required fields: ${missingFields.join(', ')}`;
      console.error(error, { body });
      return NextResponse.json({ error }, { status: 400 });
    }

    // Validate amount
    if (amount <= 0) {
      const error = 'Invalid payment amount';
      console.error(error, { amount });
      return NextResponse.json({ error }, { status: 400 });
    }

    // Get the base URL for callbacks
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // Ensure callback_url and return_url are valid URLs
    const callbackUrl = `${baseUrl}/api/payment/callback`;
    const returnUrl = `${baseUrl}/payment/success`;

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

    console.log('Sending payment request to Chapa:', paymentData);

    const response = await fetch(CHAPA_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CHAPA_SECRET_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(paymentData)
    });

    const responseData = await response.json();
    console.log('Chapa API response:', responseData);

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
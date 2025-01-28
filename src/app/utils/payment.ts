// utils/payment.ts
import axios from 'axios';

export const initiateChapaPayment = async (amount: number) => {
  try {
    const response = await axios.post('/api/payment/CreatePayment', {
      amount,
      email: 'user@example.com',
      phone: '0912345678',
    });
    // Redirect to Chapa payment page
    window.location.href = response.data.paymentUrl;
  } catch (error) {
    console.error('Failed to initiate Chapa payment:', error);
    throw error;
  }
};

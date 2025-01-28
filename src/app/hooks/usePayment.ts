import { useState } from 'react';
import { PaymentMethod } from '../types/payment';
import { initiateChapaPayment } from '../utils/payment';

export const usePayment = (amount: number) => {
  // Set the payment method to 'chapa' by default
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('chapa');

  const handlePayment = async () => {
    try {
      if (selectedMethod === 'chapa') {
        // Only initiate Chapa payment
        await initiateChapaPayment(amount);
      } else {
        // Handle unexpected cases or display an error
        console.error('Unsupported payment method:', selectedMethod);
      }
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  return {
    selectedMethod,
    setSelectedMethod,
    handlePayment
  };
};

import { useState } from 'react';
import { PaymentMethod } from '../types/payment';
import { initiateChapaPayment, initiateCBEBirrPayment } from '../utils/payment';

export const usePayment = (amount: number) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('chapa');

  const handlePayment = async () => {
    try {
      if (selectedMethod === 'chapa') {
        await initiateChapaPayment(amount);
      } else if (selectedMethod === 'cbe-birr') {
        await initiateCBEBirrPayment(amount);
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
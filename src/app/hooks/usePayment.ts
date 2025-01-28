// hooks/usePayment.ts
import { useState } from 'react';

export const usePayment = (price: number, onPaymentComplete: () => void) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Logic for initiating payment goes here
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: price, email: 'user@example.com' }), // Example payload
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || 'Payment initialization failed');
      }

      // Call onPaymentComplete callback if payment is successful
      onPaymentComplete();
    } catch (err: any) {
      setError(err?.message || 'Payment failed. Please try again.');
      console.error('Payment error:', err);
    } finally {
      setLoading(false);
    }
  };

  return { handlePayment, loading, error };
};

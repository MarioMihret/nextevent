import React, { useState } from 'react';
import { DollarSign, Loader } from 'lucide-react';

interface PaymentSummaryProps {
  price: number;
  onPay: () => void;
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({ price, onPay }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  
  const serviceFee = price * 0.05;
  const total = price + serviceFee;

  

  const handlePayment = async () => {
    try {
      setLoading(true);
      setError(null);

      const tx_ref = `TX-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      // Prepare payment data
      const payload = {
        amount: total,
        email: 'user@example.com', // In production, get from user session
        first_name: 'John',        // In production, get from user session
        last_name: 'Doe',          // In production, get from user session
        tx_ref,
      };

      console.log('Payment Payload:', payload); // Log payload to debug

      // Send payment request to the backend
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      // Check if the response was successful
      if (!response.ok) {
        throw new Error(data?.error || 'Payment initialization failed');
      }

      // Ensure checkout URL exists in response
      const checkoutUrl = data?.data?.checkout_url;
      if (!checkoutUrl) {
        throw new Error('Invalid payment response - missing checkout URL');
      }

      // Redirect to Chapa checkout page
      window.location.href = checkoutUrl;

    } catch (err: any) {
      // Handle errors gracefully and log to console
      const errorMessage = err?.message || 'Payment failed. Please try again.';
      console.error('Payment error:', errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };

  return (
    <div className="space-y-4">
      <div className="p-4 bg-gray-800 rounded-lg">
        <div className="flex justify-between mb-2">
          <span className="text-gray-400">Event Price</span>
          <span>ETB {price.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-400">Service Fee</span>
          <span>ETB {serviceFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between pt-2 mt-2 font-semibold border-t border-gray-700">
          <span>Total</span>
          <span>ETB {total.toFixed(2)}</span>
        </div>
      </div>

      {/* Error message display */}
      {error && (
        <div className="p-3 text-sm text-red-500 rounded-lg bg-red-500/10">
          {error}
        </div>
      )}

      {/* Payment button */}
      <button
        onClick={handlePayment}
        disabled={loading}
        className="flex items-center justify-center w-full gap-2 px-6 py-3 font-semibold text-white transition-colors bg-purple-500 rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <Loader className="w-5 h-5 animate-spin" />
        ) : (
          <DollarSign className="w-5 h-5" />
        )}
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </div>
  );
};

export default PaymentSummary;

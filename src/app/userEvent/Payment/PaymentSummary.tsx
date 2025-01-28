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
        email: 'user@example.com',
        first_name: 'John',
        last_name: 'Doe',
        tx_ref,
      };

      console.log('Sending payment request:', payload);

      try {
        // Send payment request to the backend with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

        const response = await fetch('/api/payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        const data = await response.json();

        // If there's an error in the response
        if (!response.ok) {
          throw new Error(data.error || 'Payment initialization failed');
        }

        // Ensure checkout URL exists in response
        const checkoutUrl = data?.data?.checkout_url;
        if (!checkoutUrl) {
          throw new Error('Invalid payment response - missing checkout URL');
        }

        console.log('Payment initialized successfully, redirecting to:', checkoutUrl);

        // Redirect to Chapa checkout page
        window.location.href = checkoutUrl;

      } catch (fetchError) {
        if (fetchError.name === 'AbortError') {
          throw new Error('Request timed out. Please try again.');
        }
        throw fetchError;
      }

    } catch (err) {
      // Handle errors gracefully
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Network error. Please check your connection and try again.';
      console.error('Payment error:', errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
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
// pages/payment/success.tsx
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const PaymentSuccess = () => {
  const router = useRouter();
  const { tx_ref } = router.query;

  useEffect(() => {
    // You can verify the payment status here using the tx_ref
    console.log('Payment reference:', tx_ref);
  }, [tx_ref]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 text-center bg-white rounded-lg shadow-lg">
        <div className="mb-4 text-green-500">
          <svg
            className="w-16 h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="mb-4 text-2xl font-bold">Payment Successful!</h2>
        <p className="mb-8 text-gray-600">
          Thank you for your payment. Your transaction has been completed successfully.
        </p>
        <button
          onClick={() => router.push('/')}
          className="px-6 py-2 text-white bg-purple-500 rounded-lg hover:bg-purple-600"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
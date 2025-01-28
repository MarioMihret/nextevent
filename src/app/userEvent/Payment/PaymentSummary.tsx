import React from 'react';
import { DollarSign } from 'lucide-react';

interface PaymentSummaryProps {
  price: number;
  onPay: () => void;
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({ price, onPay }) => {
  const serviceFee = price * 0.05;
  const total = price + serviceFee;

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
        <div className="border-t border-gray-700 mt-2 pt-2 flex justify-between font-semibold">
          <span>Total</span>
          <span>ETB {total.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={onPay}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg text-white font-semibold transition-colors"
      >
        <DollarSign className="w-5 h-5" />
        Pay Now
      </button>
    </div>
  );
};

export default PaymentSummary;
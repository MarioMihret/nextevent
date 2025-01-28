import React from 'react';
import { CreditCard } from 'lucide-react';

const PaymentMethodSelector: React.FC = () => {
  return (
    <div className="p-4 rounded-lg border-2 border-purple-500 bg-purple-500/10">
      <div className="flex items-center gap-4">
        <CreditCard className="w-6 h-6 text-purple-400" />
        <div className="text-left">
          <div className="font-semibold">Chapa Payment</div>
          <div className="text-sm text-gray-400">Secure payment with any bank card</div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodSelector;
import React from 'react';
import PaymentMethodSelector from './PaymentMethodSelector';
import PaymentSummary from './PaymentSummary';
import { usePayment } from '../../hooks/usePayment';

interface PaymentOptionsProps {
  price: number;
  onPaymentComplete: () => void;
}

const PaymentOptions: React.FC<PaymentOptionsProps> = ({ price, onPaymentComplete }) => {
  const { handlePayment } = usePayment(price, onPaymentComplete);

  return (
    <div className="space-y-4">
      <PaymentMethodSelector />
      <PaymentSummary 
        price={price} 
        onPay={handlePayment}
      />
    </div>
  );
};

export default PaymentOptions
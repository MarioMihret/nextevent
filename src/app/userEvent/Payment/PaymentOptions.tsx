import React from 'react';
import PaymentMethodSelector from './PaymentMethodSelector';
import PaymentSummary from './PaymentSummary';
import { usePayment } from '../../hooks/usePayment';

interface PaymentOptionsProps {
  price: number;
  onPaymentComplete: () => void;
}

const PaymentOptions: React.FC<PaymentOptionsProps> = ({ price, onPaymentComplete }) => {
  const { handlePayment, loading, error } = usePayment(price, onPaymentComplete);

  return (
    <div className="space-y-4">
      <PaymentMethodSelector />
      <PaymentSummary 
        price={price} 
        onPay={handlePayment} 
        loading={loading} // Pass loading state to prevent multiple payments
        error={error} // Display error message if payment fails
      />
    </div>
  );
};

export default PaymentOptions;

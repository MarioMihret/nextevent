import React from 'react';
import PaymentMethodSelector from './PaymentMethodSelector';
import PaymentSummary from './PaymentSummary';
import { usePayment } from '../../hooks/usePayment';

interface PaymentOptionsProps {
  price: number;
}

const PaymentOptions: React.FC<PaymentOptionsProps> = ({ price }) => {
  const { selectedMethod, setSelectedMethod, handlePayment } = usePayment(price);

  return (
    <div className="space-y-4">
      <PaymentMethodSelector 
        selectedMethod={selectedMethod}
        onSelect={setSelectedMethod}
      />
      <PaymentSummary 
        price={price} 
        onPay={handlePayment}
      />
    </div>
  );
};

export default PaymentOptions;
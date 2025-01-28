import React from 'react';
import { CreditCard, Smartphone } from 'lucide-react';
import { PaymentMethod } from '../../types/payment';

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod;
  onSelect: (method: PaymentMethod) => void;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({ 
  selectedMethod, 
  onSelect 
}) => {
  const methods = [
    {
      id: 'chapa',
      name: 'Chapa',
      icon: CreditCard,
      description: 'Pay with any bank card'
    },
    {
      id: 'cbe-birr',
      name: 'CBE Birr',
      icon: Smartphone,
      description: 'Pay with CBE Birr mobile wallet'
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-4">
      {methods.map((method) => {
        const Icon = method.icon;
        const isSelected = selectedMethod === method.id;

        return (
          <button
            key={method.id}
            onClick={() => onSelect(method.id as PaymentMethod)}
            className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-colors ${
              isSelected
                ? 'border-purple-500 bg-purple-500/10'
                : 'border-gray-700 hover:border-gray-600'
            }`}
          >
            <Icon className={`w-6 h-6 ${
              isSelected ? 'text-purple-400' : 'text-gray-400'
            }`} />
            <div className="text-left">
              <div className="font-semibold">{method.name}</div>
              <div className="text-sm text-gray-400">{method.description}</div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default PaymentMethodSelector;
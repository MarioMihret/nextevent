// components/ClientOnlyComponent.tsx
import React, { useState, useEffect } from 'react';

const ClientOnlyComponent: React.FC = () => {
  const [message, setMessage] = useState<string>('Loading...');

  useEffect(() => {
    // This runs only on the client
    const currentTime = new Date().toLocaleTimeString();
    setMessage(`Current time is: ${currentTime}`);
  }, []);

  return <h1>{message}</h1>;
};

export default ClientOnlyComponent;
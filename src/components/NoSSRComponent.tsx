// components/NoSSRComponent.tsx
import React from 'react';

const NoSSRComponent: React.FC = () => {
  return <div>This content is only visible on the client side.</div>;
};

export default NoSSRComponent;
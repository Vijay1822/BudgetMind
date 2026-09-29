import React from 'react';
import { OptimizationSandboxView } from '../components/OptimizationSandboxView';

export const SandboxPage: React.FC = () => {
  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
      <OptimizationSandboxView />
    </div>
  );
};

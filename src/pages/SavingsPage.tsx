import React from 'react';
import { SavingsLedgerView } from '../components/SavingsLedgerView';

export const SavingsPage: React.FC = () => {
  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
      <SavingsLedgerView />
    </div>
  );
};

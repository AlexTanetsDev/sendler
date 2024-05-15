import TableDebts from '@/components/TableDebts';
import BackBtn from '@/components/buttons/BackBtn';
import React from 'react';

const Debts = async () => {
  return (
    <>
      <BackBtn/>
      <div>
        <TableDebts />
      </div>
    </>
  );
};

export default Debts;

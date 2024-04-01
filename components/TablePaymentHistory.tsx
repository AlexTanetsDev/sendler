import { IPaymentHistory } from '@/globaltypes/types';
import { getByIdUserTransactionHistory } from '@/helpers/fetchUserId';
import React, { useEffect, useState } from 'react';

type Props = {
  userId: number;
};

const TablePaymentHistory = ({ userId }: Props) => {
  const [userTransactionsHistory, setUserTransactionsHistory] = useState<
    IPaymentHistory[] | undefined
  >();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getByIdUserTransactionHistory(userId);
        setUserTransactionsHistory(res.userTransactionsHistory);
      } catch (error) {
        console.error('Error while fetching users:', error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <table className="w-full border bg-priceTableBg">
      <caption className=" text-2xl text-right mb-2">Історія оплат користувача</caption>
      <thead>
        <tr className="bg-headerTable text-white text-xl font-roboto leading-[30px]">
          <th className="border px-4 py-3 font-normal">Сума</th>
          <th className="border px-4 py-3 font-normal">SMS</th>
          <th className="border px-4 py-3 font-normal">Дата поповнення</th>
          <th className="border px-4 py-3 font-normal">Дата оплати</th>
        </tr>
      </thead>
      <tbody className=" text-xl text-center">
        {userTransactionsHistory ? (
          userTransactionsHistory.map(elem => (
            <tr key={elem.transaction_id}>
              <td className="py-4 px-3 border font-montserrat text-xl">{elem.money_count}</td>
              <td className="py-4 px-3 border font-montserrat text-xl">{elem.sms_count}</td>
              <td className="py-4 w-1/3 px-3 border font-montserrat text-xl">
                {elem.transactions_date.toString().split('T')[0]}
              </td>
              <td className="py-4 w-1/3 px-3 border font-montserrat text-xl">
                {elem.paymant_date && elem.paymant_date.toString().split('T')[0]}
              </td>
            </tr>
          ))
        ) : (
          <tr className="text-center">
            <td colSpan={4} className="py-4 px-3 border font-montserrat text-xl">
              Користувач не має жодної історії транзакцій
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TablePaymentHistory;

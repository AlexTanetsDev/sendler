'use client';
import { allDebts, paydTransactiobByUserId } from '@/fetch-actions/debtsFetch';
import { IDebts } from '@/globaltypes/types';
import React, { useEffect, useState } from 'react';

const TableDebts = () => {
  const [debts, setDebts] = useState<IDebts[]>();
  const [isUpdated, setisUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePaydTransaction = async (transaction_id: number) => {
    await paydTransactiobByUserId(transaction_id);
    setisUpdated(prevIsUpdate => !prevIsUpdate);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const response = await allDebts();
        setDebts(response);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [isUpdated]);
  return (
    <table className="w-full border bg-priceTableBg text-center">
      <thead className="bg-lightGreen ">
        <tr className="bg-headerTable text-white text-xl font-roboto leading-[30px] ">
          <th className="py-[10px] px-3 border font-roboto text-xl font-normal">Логін</th>

          <th className="py-[10px] px-3 border font-roboto text-xl font-normal">Сумма(грн).</th>
          <th className="py-[10px] px-3 border font-roboto text-xl font-normal">СМС</th>
          <th className="py-[10px] px-3 border font-roboto text-xl font-normal">Дата поповнення</th>
          <th className="py-[10px] px-3 border font-roboto text-xl font-normal"></th>
        </tr>
      </thead>
      {debts && (
        <tbody className=" text-xl">
          {debts.length !== 0 ? (
            debts.map(elem => (
              <tr key={elem.transaction_id}>
                <td className="py-4 px-3 border font-montserrat text-xl">{elem.user_login}</td>
                <td className="py-4 px-3 border font-montserrat text-xl">{elem.money_count}</td>
                <td className="py-4 px-3 border font-montserrat text-xl">{elem.sms_count}</td>
                <td className="py-4 px-3 border font-montserrat text-xl">
                  {elem.transactions_date.toString().split('T')[0]}
                </td>
                <td className="py-4 px-3 border font-montserrat text-xl">
                  <button
                    className={`row-table__btn px-2 ${
                      isLoading ? 'text-slate-400 hover:bg-slate-500' : ''
                    }`}
                    onClick={async () => {
                      await handlePaydTransaction(elem?.transaction_id);
                    }}
                    disabled={isLoading}
                  >
                    Оплачено
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr className="text-center">
              <td colSpan={4} className="py-4 px-3 border font-montserrat text-xl">
                Не має жодної неоплаченої транзакцій
              </td>
            </tr>
          )}
        </tbody>
      )}
    </table>
  );
};

export default TableDebts;

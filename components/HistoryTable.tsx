'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getUserHistory } from '@/fetch-actions/historyFetchActions';
import HistoryList from './HistoryList';
import HistoryPeriodForm from './forms/HistoryPeriodForm';
import { IHistoryResponce, IHistoryPeriod } from '@/globaltypes/historyTypes';

type Props = {
  id: number | undefined;
};

export default function HistoryTable({ id }: Props) {
  const searchParams = useSearchParams();
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  const [userHistory, setUserHistory] = useState<IHistoryResponce[] | undefined>([]);
  const [historyPeriod, setHistoryPeriod] = useState<IHistoryPeriod | undefined>(undefined);

  useEffect(() => {
    if (startDate && endDate) {
      setHistoryPeriod({
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      });
    } else {
      setHistoryPeriod(undefined);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    async function fetchAPI() {
      try {
        const userHistory: IHistoryResponce[] | undefined = await getUserHistory({
          id,
          historyPeriod,
        });

        setUserHistory(userHistory);
      } catch (error: any) {
        console.log(error.message + ' | ' + error.response.data.error);
        setUserHistory([]);
      }
    }
    fetchAPI();
  }, [historyPeriod]);

  return (
    <>
      <div className="content-block">
        <HistoryPeriodForm />
        <div className="flex items-center gap-[100px] h-[58px] px-[26px] font-roboto text-[20px] text-white bg-[#417D8A]">
          <p className="w-[194px]">Шлях відправлення</p>
          <p className="w-[184px]">Дата</p>
          <p className="w-[150px]">Відправленно </p>
          <p className="w-[150px]">Отримано</p>
        </div>
        <HistoryList userHistory={userHistory} />
      </div>
    </>
  );
}

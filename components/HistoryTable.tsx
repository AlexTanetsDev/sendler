'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { getUserHistory } from '@/fetch-actions/historyFetchActions';
import HistoryList from './HistoryList';
import HistoryPeriodForm from './forms/HistoryPeriodForm';
import { FormInputsPeriod } from './forms/HistoryPeriodForm';
import { IHistoryResponce, IHistoryPeriod } from '@/globaltypes/historyTypes';

//Test
const userHistoryTest: IHistoryResponce[] = [
  {
    sending_group_date: new Date(2024, 2, 7),
    history_id: 123457676,
    group_name: 'Group name',
    send_method: 'API',
    recipient_status: ['fulfield', 'fulfield', 'fulfield'],
    text_sms: 'Запрошуємо',
    user_name: 'FASONCHIKI',
  },
  {
    sending_group_date: new Date(1995, 11, 17),
    history_id: 12345,
    group_name: 'Group name',
    send_method: 'API',
    recipient_status: ['fulfield', 'rejected'],
    text_sms: 'Запрошуємо',
    user_name: 'FASONCHIKI',
  },
  {
    sending_group_date: new Date(1995, 11, 17),
    history_id: 1234512,
    group_name: 'Group name',
    send_method: 'Site',
    recipient_status: ['fulfield', 'rejected', 'fulfield', 'fulfield'],
    text_sms: 'Запрошуємо',
    user_name: 'FASONCHIKI',
  },
  {
    sending_group_date: new Date(2021, 1, 10),
    history_id: 1256345,
    group_name: 'Group name',
    send_method: 'API',
    recipient_status: ['pending', 'fulfield'],
    text_sms: 'Запрошуємо',
    user_name: 'FASONCHIKI',
  },
  {
    sending_group_date: new Date(2021, 12, 20),
    history_id: 12336545,
    group_name: 'Group name',
    send_method: 'API',
    recipient_status: ['fulfield', 'fulfield', 'fulfield', 'fulfield'],
    text_sms: 'Запрошуємо',
    user_name: 'FASONCHIKI',
  },
];

type Props = {
  id: number | undefined;
};

export default function HistoryTable({ id }: Props) {
  const searchParams = useSearchParams();
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  const [userHistory, setUserHistory] = useState<IHistoryResponce[] | undefined>(userHistoryTest);
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

        // const userHistory: IHistoryResponce[] | undefined = historyPeriod
        //   ? userHistoryTest.filter(item => {
        //       return (
        //         historyPeriod.startDate &&
        //         historyPeriod.endDate &&
        //         new Date(item.sending_group_date).getTime() >=
        //           new Date(historyPeriod.startDate).getTime() &&
        //         new Date(item.sending_group_date).getTime() <=
        //           new Date(historyPeriod.endDate).getTime()
        //       );
        //     })
        //   : userHistoryTest;

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

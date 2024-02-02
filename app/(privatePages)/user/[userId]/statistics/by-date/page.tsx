'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

import getUserHistory from '@/app/utils/getUserHistory';
import formatTableDate from '@/app/utils/formatTableDate';
import Title from '@/components/Title';
import HistoryPeriodForm from '@/components/forms/HistoryPeriodForm';
import BackStatisticsBtn from '@/components/buttons/BackStatisticsBtn';
import { IHistoryPeriod, IHistoryResponce } from '@/globaltypes/historyTypes';

//testData
const userHistoryTest: IHistoryResponce[] = [
  {
    sending_group_date: new Date(),
    history_id: 123457676,
    group_name: 'Group name',
    send_method: 'API',
    recipient_status: ['fulfield', 'fulfield', 'fulfield'],
    text_sms: 'Запрошуємо',
    user_name: 'FASONCHIKI',
  },
  {
    sending_group_date: new Date(),
    history_id: 12345,
    group_name: 'Group name',
    send_method: 'API',
    recipient_status: ['fulfield', 'rejected'],
    text_sms: 'Запрошуємо',
    user_name: 'FASONCHIKI',
  },
  {
    sending_group_date: new Date(),
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

export default function DayHistory({ params }: { params: { userId: string } }) {
  const [userHistory, setUserHistory] = useState<IHistoryResponce[]>([]);

  const userId = Number(params.userId);
  const searchParams = useSearchParams();
  const historyDate = searchParams.get('date');

  const memoizedUserHistory = useCallback(async () => {
    const historyPeriod: IHistoryPeriod = {
      startDate: historyDate ? new Date(historyDate) : undefined,
      endDate: historyDate ? new Date(historyDate) : undefined,
    };
    const userHistory: IHistoryResponce[] | undefined = await getUserHistory({
      id: userId,
      historyPeriod,
    });

    if (userHistory) setUserHistory(userHistory);
  }, [historyDate, userId]);

  useEffect(() => {
    memoizedUserHistory();
  }, [memoizedUserHistory]);

  return (
    <section className="container mx-auto">
      <Title type="h1" color="dark">
        Статистика за датою
      </Title>
      <div className="mt-[60px]">
        <div className="content-block">
          <HistoryPeriodForm />
          <div className="ml-[26px]">
            <p className="mb-5 text-xl font-roboto text-[#1B1B30]">
              Розсилки за {historyDate ? formatTableDate(new Date(historyDate)) : '-'}
            </p>
            <BackStatisticsBtn>
              <p>Повернутись до загальної статистики за період</p>
            </BackStatisticsBtn>
          </div>
          <div className="flex items-center justify-between h-[58px] px-[26px] font-roboto text-[20px] text-white bg-[#417D8A]">
            <p className="w-[130px]">Текст sms</p>
            <p className="w-[118px]">Відправник</p>
            <p className="w-[126px]">Статус </p>
            <p className="w-[160px]">Доставлено sms</p>
            <p className="w-[200px]">Доставлено номерів</p>
            <p className="w-[77px]">
              <Image src="/svg/excel.svg" alt="Excel icon" width={42} height={42} />
            </p>
            <p className="w-[73px]">Дії</p>
          </div>

          <ul>
            {userHistory &&
              userHistory.length !== 0 &&
              userHistory.map(item => {
                return (
                  <li
                    key={item.history_id}
                    className="flex items-center justify-between h-[47px] px-[26px] font-roboto text-lg text-black border-b border-[#B5C9BE]"
                  >
                    <p className="w-[130px] text-[#2366E8]">
                      <Link href={`by-date/${item.history_id}`}>{item.text_sms}</Link>
                    </p>
                    <p className="w-[118px]">{item.user_name}</p>
                    <p className="w-[126px]">Доставлено</p>
                    <p className="w-[160px]">
                      {item.recipient_status.filter(item => item === 'fulfield').length}/
                      {item.recipient_status.length}
                    </p>
                    <p className="w-[200px]">
                      {item.recipient_status.filter(item => item === 'fulfield').length}/
                      {item.recipient_status.length}
                    </p>
                    <p className="w-[77px] text-[#2366E8]">Export</p>
                    <p className="w-[73px]">&#8212;</p>
                  </li>
                );
              })}
            {(!userHistory || userHistory.length < 3) &&
              Array.from({ length: 3 - userHistory.length }).map((_, index: number) => {
                return (
                  <li
                    key={index}
                    className="flex items-center justify-between h-[47px] px-[26px] font-roboto text-lg text-black border-b border-[#B5C9BE]"
                  ></li>
                );
              })}
          </ul>
        </div>
      </div>
    </section>
  );
}

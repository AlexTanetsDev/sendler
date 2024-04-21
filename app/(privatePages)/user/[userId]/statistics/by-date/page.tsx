'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { getUserHistory } from '@/fetch-actions/historyFetchActions';
import formatTableDate from '@/app/utils/formatTableDate';
import Title from '@/components/Title';
import SendingPermissionBtn from '@/components/buttons/SendingPermissionBtn';
import BackStatisticsBtn from '@/components/buttons/BackStatisticsBtn';
import { countSuccessfullySentNumbers } from '@/helpers/getCountSuccessfullySentNumbers';
import { IHistoryPeriod, IHistoryResponce } from '@/globaltypes/historyTypes';
import { SmsStatusEnum } from '@/globaltypes/types';

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
            <p className="w-[113px]">Дії</p>
          </div>
          <ul>
            {userHistory &&
              userHistory.length !== 0 &&
              userHistory.map(item => {
                return (
                  <li
                    key={item.history_id as number}
                    className="flex items-center justify-between h-[47px] px-[26px] font-roboto text-lg text-black border-b border-[#B5C9BE]"
                  >
                    <p className="w-[130px] text-[#2366E8] text-ellipsis whitespace-nowrap overflow-hidden">
                      <Link href={`by-date/${item.history_id}`}>{item.text_sms}</Link>
                    </p>
                    <p className="w-[118px]">{item.alfa_name}</p>
                    <p className="w-[126px]">
                      {item.sending_group_date >= new Date() && item.sending_permission === true
                        ? 'Заплановано'
                        : item.sending_permission === false
                        ? 'Зупинено'
                        : item.sending_group_date < new Date() &&
                          item.recipient_status.some(item => item === 'pending')
                        ? 'Відправлено'
                        : 'Завершено'}
                    </p>
                    <p className="w-[160px]">
                      {item.recipient_status.filter(item => item === 'fullfield').length}/
                      {item.recipient_status.length}
                    </p>
                    <p className="w-[200px]">
                      {countSuccessfullySentNumbers(item)}/
                      {Array.from(new Set(item.clients)).length}
                    </p>
                    <p className="w-[113px]">
                      {new Date(item.sending_group_date) > new Date() ? (
                        <SendingPermissionBtn history={item} />
                      ) : (
                        <>&#8212;</>
                      )}
                    </p>
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

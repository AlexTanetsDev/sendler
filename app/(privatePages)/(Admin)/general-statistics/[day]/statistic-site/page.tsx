'use client';

import { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Title from '@/components/Title';
import { getUserHistoryDetails } from '@/fetch-actions/historyFetchActions';
import { IHistoryDetailsResponce } from '@/globaltypes/historyTypes';

type Props = {};

const SiteHistoryDetails = () => {
  const [userHistoryDetails, setUserHistoryDetails] = useState<IHistoryDetailsResponce[]>([]);

  const searchParams = useSearchParams();
  const historyId = searchParams.get('history_id');
  const sendingGroups = Object.keys(
    userHistoryDetails.reduce((acc, obj) => ({ ...acc, [obj.group_name]: obj }), {})
  ).join(', ');

  const memoizedUserHistoryDetails = useCallback(async () => {
    const userHistory: IHistoryDetailsResponce[] | undefined = historyId
      ? await getUserHistoryDetails(historyId)
      : undefined;

    if (userHistory) setUserHistoryDetails(userHistory);
  }, [historyId]);

  useEffect(() => {
    memoizedUserHistoryDetails();
  }, [memoizedUserHistoryDetails]);

  return (
    <div className="content-block mx-auto">
      <div className="ml-[26px]">
        <div className="flex mb-10 text-xl font-roboto text-[#1B1B30]">
          <div className="mr-8">
            <p className="mb-4">Відправник</p>
            <p className="mb-4">Статус розсилки</p>
            <p>Назва групи</p>
          </div>
          <div className="mr-28 font-montserrat text-lg">
            <p className="mb-4 text-[#2366E8]">
              {userHistoryDetails[0] ? userHistoryDetails[0]?.alfa_name : '-'}
            </p>
            <p className="mb-4">
              {userHistoryDetails.some(history => {
                history.recipient_status.some(status => status === 'pending');
              })
                ? 'Відправлено'
                : userHistoryDetails[0]?.sending_group_date >= new Date() &&
                  userHistoryDetails[0]?.sending_permission === true
                ? 'Заплановано'
                : userHistoryDetails[0]?.sending_permission === false
                ? 'Зупинено'
                : 'Завершено'}
            </p>
            <p className="max-w-[300px]">{sendingGroups}</p>
          </div>
          <div>
            <p className="mb-4">Текст sms</p>
            <p className="mr-28 font-montserrat text-base">
              {userHistoryDetails[0] ? userHistoryDetails[0]?.text_sms : ''}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-[100px] h-[58px] px-[26px] font-roboto text-[20px] text-white bg-[#417D8A]">
        <p className="w-[166px]">Номер телефону</p>
        <p className="w-[196px]">Дати відправки</p>
        <p className="w-[130px]">Кількість sms</p>
        <p className="w-[130px]">Статус</p>
      </div>

      <ul>
        {userHistoryDetails &&
          userHistoryDetails.length !== 0 &&
          userHistoryDetails.map((item, index) => {
            return (
              <li
                key={index}
                className="flex items-center gap-[100px] h-[47px] px-[26px] font-roboto text-l text-black border-b border-[#B5C9BE]"
              >
                <p className="w-[166px]">{item.tel}</p>
                <p className="w-[196px]">
                  {new Date(item.sending_group_date).toLocaleString('uk-UA', { timeZone: 'UTC' })}
                </p>
                <p className="w-[130px]">{item.recipient_status.length}</p>
                <p className="w-[130px]">
                  {item.recipient_status.every(item => item === 'fullfield')
                    ? 'Доставлено'
                    : 'Недоставлено'}
                </p>
              </li>
            );
          })}

        {(!userHistoryDetails || userHistoryDetails.length < 3) &&
          Array.from({ length: 3 - userHistoryDetails.length }).map((_, index: number) => {
            return (
              <li
                key={index}
                className="flex items-center justify-between h-[47px] px-[26px] font-roboto text-lg text-black border-b border-[#B5C9BE]"
              ></li>
            );
          })}
      </ul>
    </div>
  );
};

export default SiteHistoryDetails;

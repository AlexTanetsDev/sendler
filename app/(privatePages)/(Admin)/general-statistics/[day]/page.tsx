'use client';

import React from 'react';
import { useState, useCallback, useEffect } from 'react';
import TableStatisticsPerDay from '@/components/TableStatisticsPerDay';
import GreenButton from '@/components/buttons/GreenButton';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { getUserHistory } from '@/fetch-actions/historyFetchActions';
import formatTableDate from '@/app/utils/formatTableDate';
import Title from '@/components/Title';
import SendingPermissionBtn from '@/components/buttons/SendingPermissionBtn';
import BackStatisticsBtn from '@/components/buttons/BackStatisticsBtn';
import { IHistoryPeriod, IHistoryResponce } from '@/globaltypes/historyTypes';
import { SmsStatusEnum, SendMethodType } from '@/globaltypes/types';

const ALL_USERS = -1;

type Props = {};

const DayHistory = ({ params: { day } }: { params: { day: string } }) => {
  const [userHistory, setUserHistory] = useState<IHistoryResponce[]>([]);
  const [sendMethod, setSendMethod] = useState<SendMethodType>('web');

  function parseDateString(dateString: string) {
    const [day, month, year] = dateString.split('.').map(Number);
    return new Date(year, month - 1, day);
  }

  const memoizedUserHistory = useCallback(async () => {
    const historyPeriod: IHistoryPeriod = {
      startDate: day ? parseDateString(day) : undefined,
      endDate: day ? parseDateString(day) : undefined,
    };
    const userHistory: IHistoryResponce[] | undefined = await getUserHistory({
      id: ALL_USERS,
      sendMethod,
      historyPeriod,
    });

    if (userHistory) setUserHistory(userHistory);
  }, [day, sendMethod]);

  useEffect(() => {
    memoizedUserHistory();
  }, [memoizedUserHistory]);

  const handleSendMethod = (method: SendMethodType) => {
    setSendMethod(method);
  };

  return (
    <>
      <p>Statistics for {day ?? ''}</p>
      <div className="flex gap-4 mb-4 mt-4">
        <GreenButton size="normal" onClick={() => handleSendMethod('web')}>
          Site
        </GreenButton>
        <GreenButton size="normal" onClick={() => handleSendMethod('api')}>
          Api
        </GreenButton>
      </div>
      <TableStatisticsPerDay userHistory={userHistory} />
    </>
  );
};

export default DayHistory;

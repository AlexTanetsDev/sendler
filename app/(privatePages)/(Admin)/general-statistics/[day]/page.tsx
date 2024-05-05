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
import { SmsStatusEnum } from '@/globaltypes/types';

const testUserId = 23;

type Props = {};

const DayHistory = ({ params: { day } }: { params: { day: string } }) => {
  const [userHistory, setUserHistory] = useState<IHistoryResponce[]>([]);

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
      id: testUserId,
      historyPeriod,
    });

    if (userHistory) setUserHistory(userHistory);
  }, [day, testUserId]);

  useEffect(() => {
    memoizedUserHistory();
  }, [memoizedUserHistory]);

  return (
    <>
      <p>Statistict for {day ?? ''}</p>
      <div className="flex gap-4 mb-4 mt-4">
        <GreenButton size="normal">Site</GreenButton>
        <GreenButton size="normal">Api</GreenButton>
      </div>
      <TableStatisticsPerDay userHistory={userHistory} />
    </>
  );
};

export default DayHistory;

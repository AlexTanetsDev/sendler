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

const DayHistory = ({ params }: { params: { day: string } }) => {
  // const day = params.day;
  // const searchParams = useSearchParams();
  // const historyDate = searchParams.get('months');

  const [userHistory, setUserHistory] = useState<IHistoryResponce[]>([]);

  const searchParams = useSearchParams();
  const historyDate = searchParams.get('date');

  const memoizedUserHistory = useCallback(async () => {
    const historyPeriod: IHistoryPeriod = {
      startDate: historyDate ? new Date(historyDate) : undefined,
      endDate: historyDate ? new Date(historyDate) : undefined,
    };
    const userHistory: IHistoryResponce[] | undefined = await getUserHistory({
      id: testUserId,
      historyPeriod,
    });

    if (userHistory) setUserHistory(userHistory);
  }, [historyDate, testUserId]);

  useEffect(() => {
    memoizedUserHistory();
  }, [memoizedUserHistory]);

  return (
    <>
      <p>
        Statistict for {historyDate}
      </p>
      <div className="flex gap-4 mb-4 mt-4">
        <GreenButton size="normal">Site</GreenButton>
        <GreenButton size="normal">Api</GreenButton>
      </div>
      <TableStatisticsPerDay userHistory={userHistory} />
    </>
  );
};

export default DayHistory;

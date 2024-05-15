'use client';

import SelectMonth from '@/components/SelectMonth';
import TableAdminStatistics from '@/components/TableAdminStatistics';
import { months } from '@/data/data';
import Link from 'next/link';
import { useState, useCallback, useEffect } from 'react';
import { IHistoryPeriod, IHistoryResponce } from '@/globaltypes/historyTypes';
import { getUserHistory } from '@/fetch-actions/historyFetchActions';
import { summarizeHistoryByDate } from '@/helpers/SortHistoryByDate';
import BackBtn from '@/components/buttons/BackBtn';

const ALL_USERS = -1;

const GeneralStatistics = () => {
  const [userHistory, setUserHistory] = useState<IHistoryResponce[]>([]);

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const defaultMonth = months.find(month => month.id === currentMonth);
  const day = '5';
  const [selectedMonth, setSelectedMonth] = useState<string | undefined>(defaultMonth?.value);

  function getDaysInMonth(year: any, month: any) {
    return new Date(year, month + 1, 0).getDate();
  }

  function getMonthIndex(monthValue: any) {
    const month = months.find(m => m.value === monthValue.toLowerCase());
    return month ? month.id - 1 : -1;
  }

  function getMonthDateRange(monthValue: any) {
    const currentMonthIndex = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const selectedMonthIndex = getMonthIndex(monthValue);

    let year;
    if (selectedMonthIndex <= currentMonthIndex) {
      year = currentYear;
    } else {
      year = currentYear - 1;
    }

    const startDate = new Date(year, selectedMonthIndex, 1);
    const endDate = new Date(year, selectedMonthIndex, getDaysInMonth(year, selectedMonthIndex));

    return { startDate, endDate };
  }

  const memoizedUserHistory = useCallback(async () => {
    const historyPeriod: IHistoryPeriod = getMonthDateRange(selectedMonth);
    const userHistory: IHistoryResponce[] | undefined = await getUserHistory({
      id: ALL_USERS,
      historyPeriod,
    });

    if (userHistory) {
      setUserHistory(summarizeHistoryByDate(userHistory));
    }
  }, [selectedMonth]);

  useEffect(() => {
    memoizedUserHistory();
  }, [memoizedUserHistory]);

  const handleMonthChange = (value: string) => {
    setSelectedMonth(value);
  };

  return (
    <>
    <BackBtn/>
      <div className="flex items-center mb-8">
        <Link
          href={{
            pathname: `general-statistics/${day}/`,
            query: {
              months: selectedMonth,
            },
          }}
        >
          id
        </Link>
        <h1 className=" text-xl mr-4">Сортувати по місяцю: </h1>
        <SelectMonth options={months} value={selectedMonth} onChange={handleMonthChange} />
      </div>
      <TableAdminStatistics userHistory={userHistory} />
    </>
  );
};

export default GeneralStatistics;

'use client';

import SelectMonth from '@/components/SelectMonth';
import TableAdminStatistics from '@/components/TableAdminStatistics';
import { months } from '@/data/data';
import Link from 'next/link';
import { useState } from 'react';

const GeneralStatistics = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const defaultMonth = months.find(month => month.id === currentMonth);
const day = "5";
  const [selectedMonth, setSelectedMonth] = useState<string | undefined>(defaultMonth?.value);

  const handleMonthChange = (value: string) => {
    setSelectedMonth(value);
  };

  return (
    <>
      <div className="flex items-center mb-8">
        <Link href={{
                    pathname: `general-statistics/${day}/`,
                    query: {
                      months: selectedMonth,
                    },
                  }}>id</Link>
        <h1 className=" text-xl mr-4">Сортувати по місяцю: </h1>
        <SelectMonth options={months} value={selectedMonth} onChange={handleMonthChange} />
      </div>
      <TableAdminStatistics />
    </>
  );
};

export default GeneralStatistics;

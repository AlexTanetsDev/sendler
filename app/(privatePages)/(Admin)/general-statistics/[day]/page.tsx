'use client';
import TableStatisticsPerDay from '@/components/TableStatisticsPerDay';
import GreenButton from '@/components/buttons/GreenButton';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';

type Props = {};

const DayHistory = ({ params }: { params: { day: string } }) => {
  const day = params.day;
  const searchParams = useSearchParams();
  const historyDate = searchParams.get('months');
  console.log(historyDate);

  return (
    <>
      {' '}
      <p>
        Statistict for {day} {historyDate}
      </p>
      <div className="flex gap-4 mb-4 mt-4">
        <GreenButton size="normal">Site</GreenButton>
        <GreenButton size="normal">Api</GreenButton>
      </div>
      <TableStatisticsPerDay />
    </>
  );
};

export default DayHistory;

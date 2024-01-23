'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import formatTableDate from '@/app/utils/formatTableDate';
import Title from '@/components/Title';
import BackStatisticsBtn from '@/components/buttons/BackStatisticsBtn';
import getUserHistoryDetails from '@/app/utils/getUserHistoryDetails';
import { IHistoryResponce } from '@/globaltypes/historyTypes';

export default function HistoryDetails({
  params,
}: {
  params: { userId: string; historyId: string };
}) {
  const [userHistoryDetails, setUserHistoryDetails] = useState<IHistoryResponce[]>([]);

  const userId = Number(params.userId);
  const historyId = String(params.historyId);

  const memoizedUserHistoryDetails = useCallback(async () => {
    const userHistory: IHistoryResponce[] | undefined = await getUserHistoryDetails(historyId);

    if (userHistory) setUserHistoryDetails(userHistory);
  }, [historyId]);

  useEffect(() => {
    memoizedUserHistoryDetails();
  }, [memoizedUserHistoryDetails]);
  return (
    <section className="container mx-auto">
      <Title type="h1" color="dark">
        Детальна статистика
      </Title>
      <div className="content-block mt-[60px]">
        <div className="ml-[26px]">
          <div className="flex items-center gap-3 mb-5">
            <p className="text-xl font-roboto text-[#1B1B30]">Розсилки за</p>
            <Link href={`/statistics/`}>
              <Image src="/svg/excel.svg" alt="Excel icon" width={42} height={42} />
            </Link>
          </div>
          <BackStatisticsBtn>
            <p>Повернутись до статистики за день</p>
          </BackStatisticsBtn>
          <div className="flex mb-10 text-xl font-roboto text-[#1B1B30]">
            <div className="mr-8">
              <p className="mb-4">Відправник</p>
              <p className="mb-4">Статус розсилки</p>
              <p>Назва групи</p>
            </div>
            <div className="mr-28 font-montserrat text-lg">
              <p className="mb-4 text-[#2366E8]">FASONCHIKI</p>
              <p className="mb-4">Відіслано</p>
              <p>Україна</p>
            </div>
            <div>
              <p className="mb-4">Текст sms</p>
              <p className="mr-28 font-montserrat text-base">
                Святкові знижки і подарунки вже на сайті
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

        <div className="flex items-center gap-[100px] h-[47px] px-[26px] font-roboto text-l text-black border-b border-[#B5C9BE]">
          <p className="w-[166px]">1234567890</p>
          <p className="w-[196px]"></p>
          <p className="w-[130px]">1</p>
          <p className="w-[130px]">Доставлено</p>
        </div>
      </div>
    </section>
  );
}

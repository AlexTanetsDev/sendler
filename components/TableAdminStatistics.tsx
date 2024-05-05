import React from 'react';
import Link from 'next/link';
import { SmsStatusEnum } from '@/globaltypes/types';
import formatTableDate from '@/app/utils/formatTableDate';
import { IHistoryPeriod, IHistoryResponce } from '@/globaltypes/historyTypes';

type Props = { userHistory: IHistoryResponce[] };

const TableAdminStatistics = ({ userHistory }: Props) => {
  return (
    <table className="w-full border bg-priceTableBg text-center">
      <thead className="bg-lightGreen ">
        <tr className="bg-headerTable text-white text-xl font-roboto leading-[30px] ">
          <th className="py-[10px] px-3 border font-roboto text-xl font-normal">Дата</th>
          <th className="py-[10px] px-3 border font-roboto text-xl font-normal">Кіл-ть номерів</th>
          <th className="py-[10px] px-3 border font-roboto text-xl font-normal">
            Кіл-ть відправленних СМС
          </th>
          <th className="py-[10px] px-3 border font-roboto text-xl font-normal">
            Кіл-ть доставленних СМС
          </th>
        </tr>
      </thead>

      <tbody className=" text-xl">
        {userHistory.map((elem: IHistoryResponce, index: number) => (
          <tr key={index}>
            <td className="py-4 px-3 border font-montserrat text-xl text-[#2366E8]">
              <Link
                href={{
                  pathname: `general-statistics/${formatTableDate(elem.sending_group_date)}/`,
                }}
              >
                {formatTableDate(elem.sending_group_date)}
              </Link>
            </td>
            <td className="py-4 px-3 border font-montserrat text-xl">
              {Array.from(new Set(elem.clients)).length}
            </td>
            <td className="py-4 px-3 border font-montserrat text-xl">
              {elem.recipient_status.length}
            </td>
            <td className="py-4 px-3 border font-montserrat text-xl">
              {elem.recipient_status.filter((item: SmsStatusEnum) => item === 'fullfield').length}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableAdminStatistics;

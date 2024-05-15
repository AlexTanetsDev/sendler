import React from 'react';
import Link from 'next/link';
import { countSuccessfullySentNumbers } from '@/helpers/getCountSuccessfullySentNumbers';
import formatTableDate from '@/app/utils/formatTableDate';
import { IHistoryPeriod, IHistoryResponce } from '@/globaltypes/historyTypes';

type Props = { userHistory: IHistoryResponce[] };

const TableStatisticsPerDay = ({ userHistory }: Props) => {
  return (
    <table className="w-full border bg-priceTableBg text-center">
      <thead className="bg-lightGreen ">
        <tr className="bg-headerTable text-white text-xl font-roboto leading-[30px] ">
          <th className="py-[10px] px-3 border font-roboto text-xl font-normal">ID</th>
          <th className="py-[10px] px-3 border font-roboto text-xl font-normal">Текст</th>
          <th className="py-[10px] px-3 border font-roboto text-xl font-normal">СМС імя</th>
          <th className="py-[10px] px-3 border font-roboto text-xl font-normal">Статус</th>
          <th className="py-[10px] px-3 border font-roboto text-xl font-normal">Кіл-ть смс</th>
          <th className="py-[10px] px-3 border font-roboto text-xl font-normal">Дост. смс</th>
          <th className="py-[10px] px-3 border font-roboto text-xl font-normal">Кіл-ть номерів</th>
          <th className="py-[10px] px-3 border font-roboto text-xl font-normal">Дост. номерів</th>
          <th className="py-[10px] px-3 border font-roboto text-xl font-normal">Дата та час</th>
          <th className="py-[10px] px-3 border font-roboto text-xl font-normal">Деталі</th>
        </tr>
      </thead>

      <tbody className=" text-xl">
        {userHistory.map((elem: IHistoryResponce, index: number) => (
          <tr key={index}>
            <td className="py-4 px-3 border font-montserrat text-xl">{elem.history_id}</td>
            <td className="py-4 px-3 border font-montserrat text-xl">{elem.text_sms}</td>
            <td className="py-4 px-3 border font-montserrat text-xl">{elem.alfa_name}</td>
            <td className="py-4 px-3 border font-montserrat text-xl">
              {elem.sending_group_date >= new Date() && elem.sending_permission === true
                ? 'Заплановано'
                : elem.sending_permission === false
                ? 'Зупинено'
                : elem.sending_group_date < new Date() &&
                  elem.recipient_status.some(item => item === 'pending')
                ? 'Відправлено'
                : 'Завершено'}
            </td>
            <td className="py-4 px-3 border font-montserrat text-xl">
              {elem.recipient_status.length}
            </td>
            <td className="py-4 px-3 border font-montserrat text-xl">
              {elem.recipient_status.filter(item => item === 'fullfield').length}
            </td>
            <td className="py-4 px-3 border font-montserrat text-xl">
              {Array.from(new Set(elem.clients)).length}
            </td>
            <td className="py-4 px-3 border font-montserrat text-xl">
              {countSuccessfullySentNumbers(elem)}
            </td>
            <td className="py-4 px-3 border font-montserrat text-xl">
              {new Date(elem.sending_group_date).toLocaleString('uk-UA')}
            </td>
            <td className="py-4 px-3 border font-montserrat text-xl">
              {elem.send_method === 'web' ? (
                <Link
                  href={{
                    pathname: `/general-statistics/${formatTableDate(
                      elem.sending_group_date
                    )}/statistic-site`,
                    query: {
                      history_id: elem.history_id,
                    },
                  }}
                >
                  <div className="text-[#2366E8]">Детальніше</div>
                </Link>
              ) : (
                <>&#8212;</>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableStatisticsPerDay;

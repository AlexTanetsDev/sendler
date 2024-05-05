import Link from 'next/link';

import formatTableDate from '@/app/utils/formatTableDate';
import { summarizeHistoryByDate } from '@/helpers/SortHistoryByDate';
import { IHistoryResponce } from '@/globaltypes/historyTypes';
import { SmsStatusEnum } from '@/globaltypes/types';

type Props = {
  userHistory: IHistoryResponce[] | undefined;
};

export default function HistoryList({ userHistory }: Props) {
  const sortHistory = userHistory ? summarizeHistoryByDate(userHistory) : undefined;

  return (
    <ul>
      {sortHistory &&
        sortHistory.length !== 0 &&
        sortHistory.map(item => {
          return (
            <li
              key={typeof item.history_id === 'number' ? item.history_id : item.history_id[0]}
              className="flex items-center gap-[100px] h-[47px] px-[26px] font-roboto text-[20px] text-black border-b border-[#B5C9BE]"
            >
              {}
              <p className="w-[194px]">{item.send_method}</p>
              <p className="w-[184px] text-[#2366E8]">
                <Link
                  href={{
                    pathname: `statistics/by-date/`,
                    query: {
                      date: new Date(item.sending_group_date).toString(),
                    },
                  }}
                >
                  {formatTableDate(item.sending_group_date)}
                </Link>
              </p>
              <p className="w-[150px]">{item.recipient_status.length}</p>
              <p className="w-[150px]">
                {item.recipient_status.filter((item: SmsStatusEnum) => item === 'fullfield').length}
              </p>
            </li>
          );
        })}
      {sortHistory && sortHistory.length > 0 && (
        <>
          <li className="flex items-center gap-[100px] h-[47px] px-[26px] font-roboto text-[20px] text-black border-b border-[#B5C9BE]">
            {}
            <p className="w-[194px]">Всього</p>
            <p className="w-[184px] text-[#2366E8]"></p>
            <p className="w-[150px]">
              {sortHistory?.reduce((acc, item) => acc + item.recipient_status.length, 0)}
            </p>
            <p className="w-[150px]">
              {sortHistory?.reduce(
                (acc, item) =>
                  acc +
                  item.recipient_status.filter((item: SmsStatusEnum) => item === 'fullfield')
                    .length,
                0
              )}
            </p>
          </li>
          {sortHistory.length === 1 && (
            <li className="flex items-center gap-[100px] h-[47px] px-[26px] font-roboto text-[20px] text-black border-b border-[#B5C9BE]"></li>
          )}
        </>
      )}
      {(!sortHistory || sortHistory.length === 0) &&
        Array.from({ length: 3 }).map((_, index: number) => {
          return (
            <li
              key={index}
              className="flex items-center gap-[100px] h-[47px] px-[26px] font-roboto text-[20px] text-black border-b border-[#B5C9BE]"
            ></li>
          );
        })}
    </ul>
  );
}

import Link from 'next/link';
import formatTableDate from '@/app/utils/formatTableDate';
import { summarizeHistoryByDate } from '@/helpers/SortHistoryByDate';
import { IHistoryResponce } from '@/globaltypes/historyTypes';
import { SmsStatusEnum } from '@/globaltypes/types';

type Props = {
  userHistory: IHistoryResponce[] | [];
};

export default async function HistoryList({ userHistory }: Props) {
  const sortHistory = summarizeHistoryByDate(userHistory);

  return (
    <ul>
      {sortHistory &&
        sortHistory.length !== 0 &&
        sortHistory.map(item => {
          return (
            <li
              key={item.history_id}
              className="flex items-center gap-[100px] h-[47px] px-[26px] font-roboto text-[20px] text-black border-b border-[#B5C9BE]"
            >
              {}
              <p className="w-[194px]">{item.send_method}</p>
              <p className="w-[184px] text-[#2366E8]">
                <Link
                  href={{
                    pathname: `statistics/by-date/`,
                    query: {
                      date: item.sending_group_date.toISOString(),
                    },
                  }}
                >
                  {formatTableDate(item.sending_group_date)}
                </Link>
              </p>
              <p className="w-[150px]">{item.recipient_status.length}</p>
              <p className="w-[150px]">
                {item.recipient_status.filter((item: SmsStatusEnum) => item === 'fulfield').length}
              </p>
            </li>
          );
        })}
    </ul>
  );
}

import Link from "next/link";
import formatTableDate from "@/app/utils/formatTableDate";
import { IHistoryResponce } from "@/globaltypes/historyTypes";

type Props = {
  userHistory: IHistoryResponce[] | [];
};

export default async function HistoryList({ userHistory }: Props) {
  return (
    <ul>
      {userHistory &&
        userHistory.length !== 0 &&
        userHistory.map((item) => {
          return (
            <li
              key={item.history_id}
              className="flex items-center gap-[100px] h-[47px] px-[26px] font-roboto text-[20px] text-black border-b border-[#B5C9BE]"
            >
              {}
              <p className="w-[194px]">Невідомо</p>
              <p className="w-[184px] text-[#2366E8]">
                <Link href={`/statistics/by-date/`}>
                  {formatTableDate(item.sending_group_date)}
                </Link>
              </p>
              <p className="w-[150px]">{}</p>
              <p className="w-[150px]">{}</p>
            </li>
          );
        })}
    </ul>
  );
}

import { IHistoryResponce } from "@/globaltypes/historyTypes";

type Props = {
  userHistory: IHistoryResponce[] | [];
};

export default async function HistoryList({ userHistory }: Props) {
  function formatDateTime(inputDate: Date): string {
    const date = new Date(inputDate);

    return new Intl.DateTimeFormat().format(date);
  }

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
              <p className="w-[184px]">
                {formatDateTime(item.sending_group_date)}
              </p>
              <p className="w-[150px]">{item.group_name}</p>
              <p className="w-[150px]">{item.group_name}</p>
            </li>
          );
        })}
    </ul>
  );
}

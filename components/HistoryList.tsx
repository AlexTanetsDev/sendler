import { IHistoryResponce } from "@/globaltypes/historyTypes";

type Props = {
  userHistory: IHistoryResponce[] | [];
};

export default async function HistoryList({ userHistory }: Props) {
	
  function formatDateTime(inputDate: Date): string {
    const date = new Date(inputDate);

    return new Intl.DateTimeFormat("en-GB", {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric",
      year: "numeric",
    }).format(date);
  }

  return (
    <ul>
      {userHistory &&
        userHistory.length !== 0 &&
        userHistory.map((item) => {
          return (
            <li
              key={item.history_id}
              className="flex items-center gap-[100px] h-[57px] px-[26px] pt-[18px] pb-[13px] font-roboto text-[20px] text-black border-b border-black"
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

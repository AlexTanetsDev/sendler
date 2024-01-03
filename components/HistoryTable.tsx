import { redirect } from "next/navigation";

import { getUserHistory } from "@/app/utils";
import { IHistoryResponce } from "@/globaltypes/historyTypes";
import HistoryList from "./HistoryList";
import HistoryPeriodForm from "./forms/HistoryPeriodForm";

type Props = {
  id: number | undefined;
};

export default async function HistoryTable({ id }: Props) {
  let userHistory: IHistoryResponce[] | undefined = await getUserHistory({
    id,
  });

  if (userHistory === undefined) {
    redirect("/");
  }

  userHistory = [
    {
      sending_group_date: new Date(),
      history_id: 12345,
      group_name: "Group name",
    },
  ];

  return (
    <>
      <div className="content-block">
        <HistoryPeriodForm />
        <div className="flex items-center gap-[100px] h-[58px] px-[26px] font-roboto text-[20px] text-white bg-[#417D8A]">
          <p className="w-[194px]">Шлях відправлення</p>
          <p className="w-[184px]">Дата</p>
          <p className="w-[150px]">Відправленно </p>
          <p className="w-[150px]">Отримано</p>
        </div>
        <HistoryList userHistory={userHistory} />
      </div>
    </>
  );
}

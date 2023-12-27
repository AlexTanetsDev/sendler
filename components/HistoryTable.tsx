import { redirect } from "next/navigation";

import { getUserHistory } from "@/app/utils";
import { IHistoryResponce } from "@/globaltypes/historyTypes";
import HistoryList from "./HistoryList";

type Props = {
  id: number | undefined;
};

export default async function HistoryTable({ id }: Props) {
  const userHistory: IHistoryResponce[] | undefined = await getUserHistory({
    id,
  });

  if (userHistory === undefined) {
    redirect("/");
  }

  return (
    <>
      <div className="content-block">
        <div className="ml-[26px]">
          <p className="form-title mb-8 ">Пріод відправки SMS</p>
          <form className="flex items-center gap-8 w-full mb-16">
            <input
              type="date"
              className="flex items-center justify-center h-[48px] w-[196px] py-2 px-3 font-montserrat bg-white text-[#1B1B30] rounded-[18px] text-[20px] border-[1px] border-[#E6E6E6]"
            />
            <div className="h-px w-6 bg-black"></div>
            <input
              type="date"
              className="flex items-center justify-center h-[48px] w-[196px] py-2 px-3 font-montserrat bg-white text-[#1B1B30] rounded-[18px] text-[20px] border-[1px] border-[#E6E6E6]"
            />
            <button
              type="submit"
              className="flex items-center justify-center py-2.5 px-9 font-roboto bg-[#32BB79] text-white rounded-[14px] text-[16px]"
            >
              Дивитись
            </button>
          </form>
        </div>

        <div className="flex items-center gap-[100px] h-[58px] px-[26px] font-roboto text-[20px] text-white bg-[#417D8A]">
          <p className="w-[194px]">Шлях відправлення</p>
          <p className="w-[184px]">Дата</p>
          <p className="w-[150px]">Відправленно </p>
          <p className="w-[150px]">Отримано</p>
        </div>
      </div>
      <HistoryList userHistory={userHistory} />
    </>
  );
}

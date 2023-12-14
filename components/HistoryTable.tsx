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
        <p className="form-title mb-8">Пріод відправки SMS</p>
        <form className="flex items-baseline gap-8 w-full mb-16">
          <input
            type="date"
            className="flex items-center justify-center h-[48px] w-[196px] py-2 px-3 font-montserrat bg-[#D9D9D9] text-[#372037] rounded-[18px] text-[18px] border-[1px] border-[#737373]"
          />
          <div className="h-px w-6 bg-black"></div>
          <input
            type="date"
            className="flex items-center justify-center h-[48px] w-[196px] py-2 px-3 font-montserrat bg-[#D9D9D9] text-[#372037] rounded-[18px] text-[18px] border-[1px] border-[#737373]"
          />
          <button
            type="submit"
            className="flex items-center justify-center h-[63px] w-[208px] py-4 px-14 font-montserrat bg-[#D9D9D9] text-[#372037] rounded-[18px] text-[18px] border-[1px] border-[#636060]"
          >
            Дивитись
          </button>
        </form>

        <div className="flex items-center gap-[100px] h-[57px] px-[26px] pt-[18px] pb-[13px] font-roboto text-[20px] text-black bg-[#BEBDBD] rounded-[18px]">
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

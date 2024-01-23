type Props = {
  id: number | undefined;
};

export default function HistoryPeriodForm() {
  return (
    <div className="ml-[26px]">
      <p className="mb-10 text-xl font-roboto text-[#1B1B30]">Пріод відправки SMS</p>
      <form className="flex items-center gap-8 w-full mb-10">
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
  );
}

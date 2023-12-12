"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { IHistoryResponce } from "@/globaltypes/historyTypes";
import { useSession } from "next-auth/react";
axios.defaults.baseURL = "http://localhost:3000/";

const SendingHistory = () => {
  const [history, setHistory] = useState<IHistoryResponce[]>([]);
  const router = useRouter();
  const { data: session } = useSession();

  const xport = useCallback(async () => {
    try {
      const response = await axios.get(`api/sending-history`, {
        params: {
          userId: session?.user?.user_id,
        },
      });
      setHistory(response.data.history);
    } catch (error) {
      console.log(error);
    }
  }, [session?.user?.user_id]);

  useEffect(() => {
    xport();
  }, [xport]);

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
    <div className="container xl mx-auto pb-20 pt-[60px]">
      <div className="flex items-center justify-end mb-[60px]">
        <div className="bg-[#B6B5B5] flex items-center justify-center h-[61px] w-[309px]  py-[14px] px-[60px] font-roboto text-[#372037] rounded-[18px] text-[22px]">
          {session?.user?.user_name}: 0 SMS
        </div>
      </div>
      <h1 className="mb-3  font-roboto text-[40px]  text-[#372037] font-semibold">
        Статистика
      </h1>
      <button
        type="button"
        onClick={() => console.log("archive")}
        className="bg-[#B6B5B5] flex items-center justify-center h-[35px] mb-[60px] py-2 px-2.5 font-roboto text-[#372037] rounded-[10px] text-[18px] border-[1px] border-black"
      >
        Дивитись архів
      </button>

      <div className="container flex flex-col pt-[60px] bg-[#D9D9D9] rounded-[10px]">
        <p className="mb-10 mx-6 font-roboto text-2xl font-medium text-[#372037]">
          Пріод відправки SMS
        </p>
        <form className="container flex items-baseline gap-8 w-full mb-10 px-6 bg-[#D9D9D9] rounded-[10px]">
          <input
            type="date"
            className="flex items-center justify-center h-[48px] w-[196px] py-2 px-3 font-montserrat bg-[#D9D9D9] text-[#372037] rounded-[18px] text-[18px] border-[1px] border-[#737373] cursor-pointer"
          />
          <div className="h-px w-6 bg-black"></div>
          <input
            type="date"
            className="flex items-center justify-center h-[48px] w-[196px] py-2 px-3 font-montserrat bg-[#D9D9D9] text-[#372037] rounded-[18px] text-[18px] border-[1px] border-[#737373] cursor-pointer"
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

        <ul>
          {history &&
            history.map((item) => {
              return (
                <li
                  key={item.history_id}
                  className="flex items-center gap-[100px] h-[57px] px-[26px] pt-[18px] pb-[13px] font-roboto text-[20px] text-black border-b border-black"
                >
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
      </div>
    </div>
  );
};

export default SendingHistory;

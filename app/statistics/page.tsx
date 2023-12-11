"use client";

import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { IHistoryResponce } from "@/globaltypes/historyTypes";
import { useSession } from "next-auth/react";
axios.defaults.baseURL = "http://localhost:3000/";

const SendingHistory = () => {
  const [history, setHistory] = useState<IHistoryResponce[]>([]);

  const { data: session } = useSession();

  const xport = useCallback(async () => {
    try {
      const response = await axios.get(`api/sending-history`, {
        params: {
          userId: 13,
        },
      });
      setHistory(response.data.history);
    } catch (error) {
      console.log(error);
    }
  }, []);

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
          User name: 0 SMS
        </div>
      </div>
      <h1 className="mb-3  font-roboto text-[40px]  text-[#372037] font-semibold">
        Статистика
      </h1>
      <button
        type="button"
        className="bg-[#B6B5B5] flex items-center justify-center h-[35px] mb-[60px] py-2 px-2.5 font-roboto text-[#372037] rounded-[10px] text-[18px] border-[1px] border-black"
      >
        Дивитись архів
      </button>

      <div className="container flex flex-col pt-[60px] bg-[#D9D9D9] rounded-[10px]">
        <p className="mb-10 px-6 font-roboto text-2xl font-medium text-[#372037]">
          Пріод відправки SMS
        </p>
        for{" "}
        <p className="mb-8 text-emerald-400">
          User: {session?.user?.user_login}
        </p>
        where{" "}
        <p className="mb-8 text-emerald-400">
          Id_User: {session?.user?.user_id}
        </p>
        <ul>
          {history.map((item) => {
            return (
              <li key={item.history_id}>
                <p>history_id = {item.history_id}</p>
                <p>
                  sending_group_date = {formatDateTime(item.sending_group_date)}
                </p>
                <p>group_name = {item.group_name}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SendingHistory;

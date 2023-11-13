"use client";

import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { IHistoryResponce } from "@/globaltypes/historyTypes";
axios.defaults.baseURL = "http://localhost:3000/";

const SendingHistory = () => {
  const [history, setHistory] = useState<IHistoryResponce[]>([]);

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
    <div className="flex flex-col items-center py-8">
      <p className="mb-8 text-emerald-400">Sending-history</p>
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
  );
};

export default SendingHistory;

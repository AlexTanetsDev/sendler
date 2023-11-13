"use client";

import React from "react";
import { useState, useCallback, useEffect } from "react";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000/";

const SendingHistory = () => {
  const [history, setHistory] = useState();

  const xport = useCallback(async () => {
    try {
      const response = await axios.get(`api/sending-history`, {
        params: {
          userId: 5,
        },
      });

      console.log(response.data);

      setHistory(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    xport();
  });

  return (
    <div className="flex flex-col items-center py-8">
      <p className="mb-8 text-emerald-400">Sending-history</p>
      <ul>
        {/* {history &&
          history.map((item) => {
            return <li>{item}</li>;
          })} */}
        {history}
      </ul>
    </div>
  );
};

export default SendingHistory;

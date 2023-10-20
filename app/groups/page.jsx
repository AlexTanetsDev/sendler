"use client";

import React from "react";
import { useState, useCallback } from "react";
import * as XLSX from "xlsx/xlsx.mjs";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000/";

const CreateGroup = () => {
  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const xport = useCallback(async () => {
    const ab = await (await file).arrayBuffer();
    const wb = XLSX.read(ab);
    const wsname = wb.SheetNames[0];
    const clients = XLSX.utils.sheet_to_json(wb.Sheets[wsname]);
    const id = 1;

    try {
      const response = await axios.post(`api/sending-groups`, {
        id: id,
        name: "women",
        clients: clients,
      });
      console.log("Create group:  ", response.data);
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div className="flex flex-col items-center py-8">
      <input
        type="file"
        name="file"
        accept=".xls"
        onChange={handleFileChange}
        className="mb-8"
      />
      <button type="submit" onClick={xport}>
        <b>Enter</b>
      </button>
    </div>
  );
};

export default CreateGroup;

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
    const ab = await file.arrayBuffer();
    const wb = XLSX.read(ab);
    const wsname = wb.SheetNames[0];
    const clients = XLSX.utils.sheet_to_json(wb.Sheets[wsname]);
    const groupId = 115;

    try {
      const response = await axios.put(`api/admin/sending-groups/${groupId}`, {
        clients: clients,
      });
      console.log(response.data.message);
    } catch (error) {
      console.log(error.response.data.message);
    }
  }, [file]);

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

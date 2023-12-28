"use client";

import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000/";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import * as XLSX from "xlsx/xlsx.mjs";

import Title from "@/components/Title";

export default function UpdateGroupPage({ params }) {
  const groupId = Number(params.id);
  const router = useRouter();
  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const xport = useCallback(async () => {
    // const aa = file;
    if (file) {
      const ab = await file.arrayBuffer();
      const wb = XLSX.read(ab);
      const wsname = wb.SheetNames[0];
      const clients = XLSX.utils.sheet_to_json(wb.Sheets[wsname]);

      try {
        const response = await axios.put(`api/sending-groups/${groupId}`, {
          clients: clients,
          cache: "no-store",
        });
        console.log(response.data.message);
        router.push("/user/contacts-manage");
      } catch (error) {
        console.log(error.message + " | " + error.response.data.error);
      }
    } else {
      console.log("Please, select a file!");
    }
  }, [file, groupId, router]);
  return (
    <section className="container mx-auto">
      <Title type="h1" color="dark">
        Управління контактами
      </Title>
      <div className="content-block mt-[53px] text-center">
        <Title type="h2" color="dark">
          Створення групи
        </Title>
        <div className="flex flex-col items-center py-8">
          <input
            type="file"
            name="file"
            accept=".xls,.xlsx"
            onChange={handleFileChange}
            className="mb-8 bg-slate-300"
          />
          <button type="submit" onClick={xport}>
            <b>Enter</b>
          </button>
        </div>
      </div>
    </section>
  );
}

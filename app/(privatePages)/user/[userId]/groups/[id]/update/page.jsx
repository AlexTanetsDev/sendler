"use client";

import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000/";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import * as XLSX from "xlsx/xlsx.mjs";

import Title from "@/components/Title";
import { useSession } from "next-auth/react";

export default function UpdateGroupPage({ params }) {
  const { data: session } = useSession();
  const userId = session?.user.user_id;
  const groupId = Number(params.id);
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [groupName, setGroupName] = useState("");

  const getGroupName = async () => {
    try {
      if (groupId) {
        const response = await axios.get(`api/sending-groups/${groupId}`);
        const { group } = response.data.res;
        setGroupName(group);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const memoizedGetClients = useCallback(getGroupName, [groupId]);

  useEffect(() => {
    memoizedGetClients();
  }, [memoizedGetClients]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const xport = useCallback(async () => {
    if (file) {
      const ab = await file.arrayBuffer();
      const wb = XLSX.read(ab);
      const wsname = wb.SheetNames[0];
      const clients = XLSX.utils.sheet_to_json(wb.Sheets[wsname]);

      try {
        await axios.put(`api/sending-groups/${groupId}`, {
          clients: clients,
          cache: "no-store",
        });
        router.push(`/user/${userId}/groups`);
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
        <Title type="title-main_text" color="dark">
          Редагування групи
          <span className="ml-4 text-headerTable">{groupName}</span>
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

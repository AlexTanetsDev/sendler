'use client';

import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000/';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import * as XLSX from 'xlsx/xlsx.mjs';

import Title from '@/components/Title';
import GreenButton from '@/components/buttons/GreenButton';
import Image from 'next/image';

export default function UpdateGroupPage({ params }) {
  const userId = Number(params.userId);
  const groupId = Number(params.id);
  const router = useRouter();
  const [file, setFile] = useState('');
  const [groupName, setGroupName] = useState('');
  const [numberClients, setNumberClients] = useState(0);

  const getGroupName = async () => {
    try {
      if (groupId) {
        const res = await axios.get(`api/sending-groups/${groupId}`);
        const group = res.data.res.group;
        const clientsGroup = res.data.res.clients;
        setGroupName(group);
        setNumberClients(clientsGroup.length);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const memoizedGetClients = useCallback(getGroupName, [groupId]);

  useEffect(() => {
    memoizedGetClients();
  }, [memoizedGetClients]);

  const handleFileChange = e => {
    setFile(e.target.files[0]);
  };

  const xport = useCallback(async () => {
    if (file) {
      const ab = await file.arrayBuffer();
      const wb = XLSX.read(ab);
      const wsname = wb.SheetNames[0];
      const clients = XLSX.utils.sheet_to_json(wb.Sheets[wsname]);

      try {
        const res = await axios.put(`api/sending-groups/${groupId}`, {
          clients: clients,
          cache: 'no-store',
        });
        console.log(res.data.message);
        router.push(`/user/${userId}/groups`);
      } catch (error) {
        console.log(error.message + ' | ' + error.response.data.error);
      }
    } else {
      console.log('Please, select a file!');
    }
  }, [file, groupId, router, userId]);

  return (
    <section className="container mx-auto">
      <Title type="h1" color="dark">
        Управління контактами
      </Title>
      <div className="content-block mt-[53px]">
        <div className=" ml-[26px]">
          <Title type="title_block" color="dark">
            Редагування групи:
            <span className="ml-4 text-headerTable">{`${groupName} (${numberClients})`}</span>
          </Title>
        </div>
        <p className="w-[724px] mb-[50px] mt-10 ml-[26px] text-left main_text">
          Ви можете додати номери телефонів контактів з файлу у форматі Excel або текстового файлу.
          Виберіть файл, який містить Ваші контакти:
        </p>
        <p className="block ml-[26px] mb-3 label"> Додати контакт з файлу</p>
        <div className="relative flex flex-row text-base flex items-center justify-start ml-[26px]">
          <label
            htmlFor="file"
            className="flex items-center justify-between w-[474px] block input w-8 h-[48px] mr-8 pr-[28px] bg-slate-300"
          >
            <div className="grow pl-[28px] main_text">{file.name}</div>
            <Image src="/svg/paper-clip.svg" alt="paper clip" width={32} height={32} className="" />
          </label>
          <input
            type="file"
            id="file"
            name="file"
            accept=".xls,.xlsx"
            onChange={handleFileChange}
            className="absolute input_file h-[48px] mr-8 bg-slate-300"
          />
          <GreenButton size="normal" onClick={xport}>
            Додати
          </GreenButton>
        </div>
      </div>
    </section>
  );
}

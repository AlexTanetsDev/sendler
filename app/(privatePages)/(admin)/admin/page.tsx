'use client';

import DetailBtn from '@/components/buttons/Details';
import ManageContactBtn from '@/components/buttons/ManageContactBtn';
import { combinedAlfaNameAndUser } from '@/globaltypes/types';
import { CombinedAlfaNamesAndUser } from '@/helpers/AlfaName';
import { useEffect, useState } from 'react';

const Admin = () => {
  const [allUsersAlfaNames, setallUsersAlfaNames] = useState<combinedAlfaNameAndUser[]>([]);


  const sortAllUsersAlfaNames = allUsersAlfaNames.sort((a, b) => {
    return a.user_active === b.user_active ? 0 : a.user_active ? -1 : 1;
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await CombinedAlfaNamesAndUser();
        const alfaNames = res.mappedUsers;
        setallUsersAlfaNames(alfaNames);
      } catch (error) {
        console.error('Error while fetching users:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <table className="mt-10 w-full border bg-priceTableBg">
        <thead>
          <tr className="bg-headerTable text-white text-xl font-roboto  leading-[30px]">
            <th className="w-1/8 border px-4 py-3 font-normal">ID клієнта</th>
            <th className="w-1/4 border px-4 py-3 font-normal">Альфа ім&apos;я</th>
            <th className="w-1/4 border px-4 py-3 font-normal">Логін</th>
            <th className="w-1/8 border px-4 py-3 font-normal">Баланс</th>
            <th className="w-1/4 border px-4 py-3 font-normal">Управляти</th>
            <th className="w-full border px-4 py-3 font-normal">Додаткова інформація</th>
          </tr>
        </thead>
        <tbody>
          {sortAllUsersAlfaNames.map(elem => (
            <tr className={` text-center ${elem.user_active ? "" : ' bg-gray-500'}`} key={elem.user_id}>
              <td className="py-4 px-3 border font-montserrat text-xl">{elem.user_id}</td>
              <td className="py-4 px-3 border font-montserrat text-xl">
                {elem?.alfa_name?.join(', ')}
              </td>
              <td className="py-4 px-3 border font-montserrat text-xl">{elem.user_login}</td>
              <td className="py-4 px-3 border font-montserrat text-xl">{elem.balance}</td>
              <td className="py-4 px-3 border font-montserrat text-xl ">
                <ManageContactBtn id={elem.user_id}>Manage Contact </ManageContactBtn>{' '}
                <DetailBtn id={elem.user_id}>Detail </DetailBtn>
              </td>
              <td className="py-4 px-3 border font-montserrat text-sm">{elem.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Admin;

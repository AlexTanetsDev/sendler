'use client';

import DetailBtn from '@/components/buttons/Details';
import ManageContactBtn from '@/components/buttons/ManageContactBtn';
import SearchUserForm from '@/components/forms/SearchUserForm';
import { combinedAlfaNameAndUser } from '@/globaltypes/types';
import { CombinedAlfaNamesAndUser } from '@/helpers/AlfaName';
import { useEffect, useState } from 'react';

const Admin = () => {
  const [allUsersAlfaNames, setallUsersAlfaNames] = useState<combinedAlfaNameAndUser[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [filterallUsersAlfaNames, setFilterAllUsersAlfaNames] = useState<combinedAlfaNameAndUser[]>(
    allUsersAlfaNames ? allUsersAlfaNames : []
  );

  const getFilter = (e: any) => {
    setFilter(e.target.value);
  };

  const filterAllUsersLogin = (users: combinedAlfaNameAndUser[], login: string) => {
    const filtered = users.filter(user =>
      user.user_login.toLowerCase().includes(login.toLowerCase())
    );
    setFilterAllUsersAlfaNames(filtered);
  };

  const sortAllUsersAlfaNames = (
    filter.length === 0 ? allUsersAlfaNames : filterallUsersAlfaNames
  ).sort((a, b) => {
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

  useEffect(() => {
    filterAllUsersLogin(allUsersAlfaNames, filter);
  }, [filter, allUsersAlfaNames]);

  return (
    <div className="flex flex-col items-center justify-center">
      <SearchUserForm getFilter={getFilter} />
      <table className="mt-10 w-full border bg-priceTableBg text-center">
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
        <tbody className="text-center">
          {sortAllUsersAlfaNames.length !== 0 ? (
            sortAllUsersAlfaNames.map(elem => (
              <tr
                className={` text-center ${elem.user_active ? '' : ' bg-gray-500'}`}
                key={elem.user_id}
              >
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
            ))
          ) : (
            <tr className="text-center">
              <td colSpan={6} className="py-4 px-3 border font-montserrat text-xl">
                Не має жодного логіна з таким ім'ям
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;

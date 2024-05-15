'use client';

import BackBtn from '@/components/buttons/BackBtn';
import { combinedAlfaNameAndUser } from '@/globaltypes/types';

import { ActiveAlfaName, CombinedAlfaNamesAndUser, DeleteAlfaName } from '@/helpers/AlfaName';
import { useEffect, useState } from 'react';

const SenderNameApproved = () => {
  const [isUpdated, setisUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [OnlyNotActiveAlfaNames, setOnlyNotActiveAlfaNames] = useState<combinedAlfaNameAndUser[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const users = await CombinedAlfaNamesAndUser();
        setOnlyNotActiveAlfaNames(users.OnlyNotActiveAlfaNames);
        setIsLoading(false);
      } catch (error) {
        console.error('Error while fetching users:', error);
      }
    };

    fetchData();
  }, [isUpdated]);

  const handleDelete = async (id: number) => {
    await DeleteAlfaName(id);
    setisUpdated(prevIsUpdate => !prevIsUpdate);
  };

  const handleActivateAlfaName = async (id: number) => {
    await ActiveAlfaName(id);
    setisUpdated(prevIsUpdate => !prevIsUpdate);
  };

  return (
    <>
    <BackBtn/>
      <table className="mt-10 w-full border bg-priceTableBg">
        <thead>
          <tr className="bg-headerTable text-white text-xl font-roboto  leading-[30px]">
            <th className="border px-4 py-3 font-normal">Логін</th>
            <th className=" border px-4 py-3 font-normal">Альфа ім&apos;я</th>
            <th className=" border px-4 py-3 font-normal">Email</th>
            <th className=" border px-4 py-3 font-normal">Телефон</th>
            <th className=" border px-4 py-3 font-normal">Активувати</th>
            <th className=" border px-4 py-3 font-normal">Видалити</th>
          </tr>
        </thead>
       { !isLoading && <tbody>
          {OnlyNotActiveAlfaNames.length === 0 ? (
            <tr className="text-center">
              <td colSpan={6} className="py-4 px-3 border font-montserrat text-xl">
                Ви не маєте жодних альфа-імен для активації
              </td>
            </tr>
          ) : (
            OnlyNotActiveAlfaNames.map(elem => (
              <tr className="text-center" key={elem.alfa_name_id}>
                <td className="py-4 px-3 border font-montserrat text-xl">{elem.user_login}</td>
                <td className="py-4 px-3 border font-montserrat text-xl">{elem.alfa_name}</td>
                <td className="py-4 px-3 border font-montserrat text-xl">{elem.email}</td>
                <td className="py-4 px-3 border font-montserrat text-xl">{elem.tel}</td>
                <td className="py-4 px-3 border font-montserrat text-xl">
                  <button
                    className={`row-table__btn px-2 ${
                      isLoading ? 'text-slate-400 hover:bg-slate-500' : ''
                    }`}
                    onClick={async () => {
                      await handleActivateAlfaName(elem?.alfa_name_id);
                    }}
                    disabled={isLoading}
                  >
                    Активувати
                  </button>
                </td>
                <td className="py-4 px-3 border font-montserrat text-xl">
                  <button
                    className={`row-table__btn px-2 ${
                      isLoading ? 'text-slate-400 hover:bg-slate-500' : ''
                    }`}
                    onClick={async () => await handleDelete(elem?.alfa_name_id)}
                    disabled={isLoading}
                  >
                    Видалити
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>}
      </table>
    </>
  );
};

export default SenderNameApproved;

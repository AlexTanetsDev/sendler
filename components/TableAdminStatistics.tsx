import React from 'react';

type Props = {};

const TableAdminStatistics = (props: Props) => {
  return (
    <table className="w-full border bg-priceTableBg text-center">
      <thead className="bg-lightGreen ">
        <tr className="bg-headerTable text-white text-xl font-roboto leading-[30px] ">
          <th className="py-[10px] px-3 border font-roboto text-xl font-normal">Дата</th>
          <th className="py-[10px] px-3 border font-roboto text-xl font-normal">Кіл-ть номерів</th>
          <th className="py-[10px] px-3 border font-roboto text-xl font-normal">
            Кіл-ть відправленних СМС
          </th>
          <th className="py-[10px] px-3 border font-roboto text-xl font-normal">
            Кіл-ть доставленних СМС
          </th>
        </tr>
      </thead>

      <tbody className=" text-xl">
        {/*        
          .map(elem => (
            <tr key={elem.}>
              <td className="py-4 px-3 border font-montserrat text-xl"></td>
              <td className="py-4 px-3 border font-montserrat text-xl"></td>
              <td className="py-4 px-3 border font-montserrat text-xl">{elem}</td>
              <td className="py-4 px-3 border font-montserrat text-xl">
                {elem}
              </td>
             
            </tr>    ) */}
      </tbody>
    </table>
  );
};

export default TableAdminStatistics;

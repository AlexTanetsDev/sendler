import React from 'react';

type Props = {};

const TableStatisticsPerDay = (props: Props) => {
  return (
    <table className="w-full border bg-priceTableBg text-center">
      <thead className="bg-lightGreen ">
        <tr className="bg-headerTable text-white text-xl font-roboto leading-[30px] ">
          <th className="py-[10px] px-3 border font-roboto text-xl font-normal">ID</th>
          <th className="py-[10px] px-3 border font-roboto text-xl font-normal">Текст</th>
          <th className="py-[10px] px-3 border font-roboto text-xl font-normal">СМС імя</th>
          <th className="py-[10px] px-3 border font-roboto text-xl font-normal">Статус</th>
          <th className="py-[10px] px-3 border font-roboto text-xl font-normal">Кіл-ть смс</th>
          <th className="py-[10px] px-3 border font-roboto text-xl font-normal">Дост. смс</th>
          <th className="py-[10px] px-3 border font-roboto text-xl font-normal">Кіл-ть номерів</th>
          <th className="py-[10px] px-3 border font-roboto text-xl font-normal">Дост. номерів</th>
          <th className="py-[10px] px-3 border font-roboto text-xl font-normal">Дата та час</th>
          <th className="py-[10px] px-3 border font-roboto text-xl font-normal">Деталі</th>
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
              <td className="py-4 px-3 border font-montserrat text-xl"></td>
              <td className="py-4 px-3 border font-montserrat text-xl"></td>
              <td className="py-4 px-3 border font-montserrat text-xl">{elem}</td>
              <td className="py-4 px-3 border font-montserrat text-xl">
              <td className="py-4 px-3 border font-montserrat text-xl"></td>
              <td className="py-4 px-3 border font-montserrat text-xl"></td>             
            </tr>    ) */}
      </tbody>
    </table>
  );
};

export default TableStatisticsPerDay;

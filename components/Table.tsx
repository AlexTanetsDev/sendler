const Table = () => {
  return (
    <table className="lg:w-[746px] w-[626px] ml-auto bg-priceTableBg  border border-priceTableBorderColor lg:ml-6">
      <thead className="bg-lightGreen">
        <tr>
          <th className="py-[10px] px-3 border   font-roboto text-xl font-normal text-left">
            СМС
          </th>
          <th className="py-[10px] px-3 border   font-roboto text-xl font-normal text-left">
            Ціна одного SMS, грн.
          </th>
        </tr>
      </thead>
      <tbody className=" text-xl">
        <tr>
          <td className="py-4 px-3 border">Від 1 до 999</td>
          <td className="py-4 px-3 border">0,77</td>
        </tr>
        <tr>
          <td className="py-4 px-3 border">Від 1 000 до 4 999</td>
          <td className="py-4 px-3 border">0,74 (від 740 грн)</td>
        </tr>
        <tr>
          <td className="py-4 px-3 border">Від 5 000 до 9 999</td>
          <td className="py-4 px-3 border">0,73 (від 3 650 грн)</td>
        </tr>
        <tr>
          <td className="py-4 px-3 border">Від 10 000 до 49 999</td>
          <td className="py-4 px-3 border">0,72 (від 7 200 грн)</td>
        </tr>
        <tr>
          <td className="py-4 px-3 border">Від 50 000 до 99 999</td>
          <td className="py-4 px-3 border">0,71 (від 35 500 грн)</td>
        </tr>
        <tr>
          <td className="py-4 px-3 border">Від 100 000 до 499 999</td>
          <td className="py-4 px-3 border">0,70 (від 70 000 грн)</td>
        </tr>
        <tr>
          <td className="py-4 px-3 border">Від 500 000 и бiльше</td>
          <td className="py-4 px-3 border">договірна</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;

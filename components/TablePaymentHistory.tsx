import { IGetUser } from '@/fetch-actions/types'
import { IUser } from '@/globaltypes/types'
import React from 'react'



const TablePaymentHistory = () => {
  return (
<table className="mt-10 w-1/2 border bg-priceTableBg">
  <caption>Історія оплат користувача</caption>
  <thead >
    <tr className="bg-headerTable text-white text-xl font-roboto  leading-[30px]">
      <th  className="border px-4 py-3 font-normal">Сума</th>
      <th  className="border px-4 py-3 font-normal">SMS</th>
      <th  className="border px-4 py-3 font-normal">Дата поповнення</th>
      <th  className="border px-4 py-3 font-normal">Оплата</th>
      <th  className="border px-4 py-3 font-normal">Дата оплати</th>
    </tr>
  </thead>
  <tbody  className=" text-xl">
{/* {user && user.map( elem => (
   <tr key={elem.id}>
   <td className="py-4 px-3 border font-montserrat text-xl"></td>
   <td className="py-4 px-3 border font-montserrat text-xl">
   </td>
 </tr>
))} */}

    
  </tbody>
</table>

  )
}

export default TablePaymentHistory
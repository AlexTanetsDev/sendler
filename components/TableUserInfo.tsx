import React from 'react'

type Props = {}

const TableUserInfo = (props: Props) => {
  return (

      <table className="table-auto mt-10 w-1/2 border bg-priceTableBg">
        <tbody>
          <tr>
            <td className="border px-4 py-2 font-semibold">ID</td>
            <td className="border px-4 py-2">1</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Imie</td>
            <td className="border px-4 py-2">Max</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Login</td>
            <td className="border px-4 py-2">MAX</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Telefon</td>
            <td className="border px-4 py-2">1212</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Email</td>
            <td className="border px-4 py-2">hfhjf</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Balans</td>
            <td className="border px-4 py-2">0</td>
          </tr>
        </tbody>
      </table>

    
  )
}

export default TableUserInfo
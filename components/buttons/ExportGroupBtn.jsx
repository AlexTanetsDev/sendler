import axios from 'axios';
import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx/xlsx.mjs';
import { getGroupById } from '@/fetch-actions/groupsFetchActions';

export default function ExportGroupBtn({ id, group, children }) {
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClick = async () => {
    try {
      const res = await getGroupById(id);

      const { clients, groupName } = res.data.res;
      clients.forEach(client => {
        delete client.id;
      });

      clients.forEach(client => {
        delete client.total_count;
        delete client.client_id;
      });

      const keysObject = Object.keys(clients[0]);
      const ws = XLSX.utils.json_to_sheet(clients, { headers: keysObject });
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, ws, 'Sheet 1');
      XLSX.writeFile(workbook, `${groupName}.xlsx`);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (Number(group.number_members) === 0) {
      setIsDisabled(true);
    }
  }, [group.number_members]);

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isDisabled}
      className={Number(group.number_members) ? 'row-table__btn' : 'row-table-disable__btn'}
    >
      {children}
    </button>
  );
}

import axios from 'axios';
import * as XLSX from 'xlsx/xlsx.mjs';

export default function ExportGroupBtn({ id, children }) {
  const handleClick = async () => {
    try {
      const res = await axios.get(`api/sending-groups/${id}`, {
        params: {
          userId: null,
          filter: '',
          limit: null,
          visible: 0,
        },
      });
      const { clients, groupName } = res.data.res;
      clients.forEach(client => {
        delete client.id;
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
  return (
    <button type="button" onClick={handleClick} className="row-table__btn">
      {children}
    </button>
  );
}

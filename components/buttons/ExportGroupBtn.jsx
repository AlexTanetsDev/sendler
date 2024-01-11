import axios from "axios";
import * as XLSX from "xlsx/xlsx.mjs";

export default function ExportGroupGroupBtn({ id, children }) {
  const handleClick = async () => {
    try {
      const res = await axios.get(`api/sending-groups/${id}`);
      const { clients, group } = res.data.res;
      clients.forEach((client) => {
        delete client.client_id;
      });
      const keysObject = Object.keys(clients[0]);
      const ws = XLSX.utils.json_to_sheet(clients, { headers: keysObject });
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, ws, "Sheet 1");
      XLSX.writeFile(workbook, `${group}.xlsx`);
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

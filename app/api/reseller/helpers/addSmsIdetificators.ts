import db from "@/db";

export const addSmsIdentificators = async (
  history_id: string,
  clients: any[],
  identificators: string[]
) => {
  const factor = identificators.length / clients.length;
  let counter = 0;
  let interval = 1;
  const query = identificators
    .map((identificator) => {
      const str = `(${history_id}, ${clients[counter].tel}, ${identificator})`;
      if (interval === factor) {
        counter += 1;
        interval = 1;
      } else {
        interval += 1;
      }
      return str;
    })
    .join(",");

  return await db.query(
    `INSERT INTO sms_identificators (history_id, client_id, identificator) VALUES ${query} RETURNING *`
  );
};

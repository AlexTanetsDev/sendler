import db from "@/db";
import axios from "axios";
import resellerAuth from "../api/reseller/helpers/resellerAuth";
import smsStatDecoder from "../api/reseller/helpers/smsStatusDecoder";

export const updateSmsStatusByHistoryId = async (history_id: number) => {
  const smsIdentificators = await db.query(
    "SELECT client_id, identificator FROM sms_identificators where history_id = $1",
    [history_id]
  );

  const resultArray: ResultObject[] = [];
  const clientIds: Record<number, ResultObject> = {};

  smsIdentificators.rows.forEach((item) => {
    if (clientIds[item.client_id]) {
      clientIds[item.client_id].identificator.push(item.identificator);
    } else {
      clientIds[item.client_id] = {
        client_id: item.client_id,
        identificator: [item.identificator],
      };
      resultArray.push(clientIds[item.client_id]);
    }
  });

  const finalyArr = await Promise.all(
    resultArray.map(async (client) => {
      const stat = await getSmsStatus(client.identificator);
      return { client_id: client.client_id, status: stat };
    })
  );

  const smsStatUpdateQString = smsStatusUpdateQueryCreator(finalyArr);

  const statusResult = await updateResipientsStatusDb(
    smsStatUpdateQString,
    history_id
  );

  return statusResult.rows;
};

interface ResultObject {
  client_id: number;
  identificator: string[];
}

interface IClientSmsStat extends Partial<ResultObject> {
  status: string;
}

const getSmsStatus = async (identificators: string[]) => {
  const authRes = await resellerAuth();
  if (!authRes) throw new Error("Authorisation error");

  const statusArr = await Promise.all(
    identificators.map(async (idf) => {
      const result = await axios.get(
        `https://api.streamtools.com.ua/rest/Sms/State?sessionId=${authRes}&messageId=${idf}`
      );
      return smsStatDecoder(result.data.State);
    })
  );

  if (statusArr.includes("pending")) return "pending";
  if (statusArr.includes("rejected")) return "rejected";
  return "fullfield";
};

const smsStatusUpdateQueryCreator = (clientsSmsStatuses: IClientSmsStat[]) => {
  const query = clientsSmsStatuses
    .map((sms) => {
      return `when ${sms.client_id} then '${sms.status}'`;
    })
    .join(" ");
  return query;
};

const updateResipientsStatusDb = (query: string, history_id: number) => {
  return db.query(
    `UPDATE recipients_status SET
        recipient_status =
        case client_id
           ${query}
           else recipient_status
        end
    WHERE history_id = ${history_id}
    RETURNING *`
  );
};

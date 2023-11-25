import { NextResponse } from "next/server";
import axios from "axios";
import resellerAuth from "../helpers/resellerAuth";
import db from "@/db";
import { getClientsTelByGroupId } from "../helpers/getClientsTelByGroupId";
import { createSmsUrlStr } from "../helpers/createSmsQueryString";
import { addSendingHistory } from "../helpers/addSendingHistory";
import { addSmsIdentificators } from "../helpers/addSmsIdetificators";
import { addSmsStatus } from "../helpers/addSmsStatus";

const { RESELLER_URL, RESELLER_SOURSE_ADRESS } = process.env;

export async function POST(req: Request) {
  const authRes = await resellerAuth();
  if (!authRes) throw new Error("Authorisation error");

  const { group_id, text, client_id } = await req.json();

  const clients = await getClientsTelByGroupId(group_id);

  const smsQuerystr = createSmsUrlStr(clients, text);

  const sendedSmsRes = await axios.post(
    `${RESELLER_URL}/rest/Sms/SendBulk?SessionID=${authRes}&SourceAddress=${RESELLER_SOURSE_ADRESS}&${smsQuerystr}`,
    {
      headers: {
        "Content-Type": "application/ x - www - form - urlencoded",
      },
    }
  );
  const historyId = await addSendingHistory(group_id);

  const smsIdentificatorsRes = addSmsIdentificators(
    historyId,
    clients,
    sendedSmsRes.data
  );
  console.log((await smsIdentificatorsRes).rows);

  const statusRes = await addSmsStatus(group_id, client_id);

  return NextResponse.json(statusRes);
}

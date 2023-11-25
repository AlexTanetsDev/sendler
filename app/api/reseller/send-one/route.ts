import { NextResponse } from "next/server";
import axios from "axios";
import resellerAuth from "../helpers/resellerAuth";
import db from "@/db";
import { getClientsTelByGroupId } from "../helpers/getClientsTelByGroupId";
import { createSmsUrlStr } from "../helpers/createSmsQueryString";

const { RESELLER_URL, RESELLER_SOURSE_ADRESS } = process.env;

export async function POST(req: Request) {
  const authRes = await resellerAuth();
  if (!authRes) throw new Error("Authorisation error");
  const { group_id, text } = await req.json();

  const clients = await getClientsTelByGroupId(group_id);
  const queryStr = createSmsUrlStr(clients, text);

  const res = await axios.post(
    `${RESELLER_URL}/rest/Sms/Send?SessionID=${authRes}&SourceAddress=${RESELLER_SOURSE_ADRESS}&${queryStr}`,
    {
      headers: {
        "Content-Type": "application/ x - www - form - urlencoded",
      },
    }
  );

  //   [
  //   {
  //     history_id: 1,
  //     group_id: 26,
  //     sending_group_date: 2023-10-24T17:24:26.964Z
  //   }
  // ]
  // const historyRes = await db.query(
  //   "INSERT INTO sending_history (group_id) VALUES ($1) RETURNING *",
  //   [groupId]
  // );

  // GET SMS STATUS
  // CreationDateUtc: null;
  // Price: null;
  // ReportedDateUtc: null;
  // State: 255;
  // StateDescription: "Неизвестный";
  // SubmittedDateUtc: null;
  // TimeStampUtc: "/Date(-62135596800000)/";
  // const statusRes = await axios.post(
  //   `${RESELLER_URL}rest/Sms/State?sessionId=${authRes.data}&messageId=${res.data[0]}`
  // );

  // const addSmsStatus = await db.query(
  //   "INSERT INTO recipients_status (group_id, client_id, recipient_status) VALUES ($1, $2, 'pending') RETURNING * ",
  //   [groupId, client_id]
  // );
  return NextResponse.json(res.data);
}

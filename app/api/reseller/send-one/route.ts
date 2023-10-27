import { NextResponse } from "next/server";
import axios from "axios";
import resellerAuth from "../helpers/resellerAuth";
import db from "@/db";

const { RESELLER_URL, RESELLER_SOURSE_ADRESS } = process.env;

export async function POST(req: Request) {
  const authRes = await resellerAuth();
  if (!authRes?.data) throw new Error("Authorisation error");
  const { groupId, userId, text } = await req.json();

  const telRes = await db.query(
    "SELECT client_id FROM groups_members WHERE group_id = $1",
    [groupId]
  );
  const { client_id } = telRes.rows[0];

  const clientTelres = await db.query(
    "SELECT tel FROM clients WHERE client_id = $1",
    [client_id]
  );
  const { tel } = clientTelres.rows[0];

  const res = await axios.post(
    `${RESELLER_URL}rest/Sms/Send?SessionID=${authRes.data}&DestinationAddress=${tel}&SourceAddress=${RESELLER_SOURSE_ADRESS}&Data=${text}`,
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
  const historyRes = await db.query(
    "INSERT INTO sending_history (group_id) VALUES ($1) RETURNING *",
    [groupId]
  );

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

  const addSmsStatus = await db.query(
    "INSERT INTO recipients_status (group_id, client_id, recipient_status) VALUES ($1, $2, 'pending') RETURNING * ",
    [groupId, client_id]
  );
  return NextResponse.json("sms send sucsessfuly");
}

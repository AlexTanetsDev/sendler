import { NextResponse } from "next/server";
import axios from "axios";
import resellerAuth from "../helpers/resellerAuth";
import db from "@/db";

const { RESELLER_URL, RESELLER_SOURSE_ADRESS } = process.env;

export async function POST(req: Request) {
  const authRes = await resellerAuth();
  if (!authRes?.data) throw new Error("Authorisation error");

  const { group_id, text } = await req.json();

  const clientsRes = await db.query(
    "SELECT client_id FROM groups_members WHERE group_id = $1",
    [group_id]
  );
  const clientsId = clientsRes.rows;
  const clientsTel = await Promise.all(
    clientsId.map(async (client) => {
      const clientTelRes = await db.query(
        "SELECT tel FROM clients WHERE client_id =$1",
        [client.client_id]
      );
      const { tel } = clientTelRes.rows[0];
      const str = `DestinationAddresses=${tel}&Data=${text}&`;

      return str;
    })
  );
  const urlStr = clientsTel.join("");
  const normalizedUrlStr = urlStr.slice(0, urlStr.length - 2);

  const res = await axios.post(
    `${RESELLER_URL}/rest/Sms/SendBulk?SessionID=${authRes.data}&SourceAddress=${RESELLER_SOURSE_ADRESS}&${normalizedUrlStr}`,
    {
      headers: {
        "Content-Type": "application/ x - www - form - urlencoded",
      },
    }
  );

  return NextResponse.json(res.data);
}

import { NextResponse } from "next/server";
import axios from "axios";
import { resellerAuth } from "../resellerAuth";

const { RESELLER_URL } = process.env;

export async function POST(req: Request) {
  const authRes = await resellerAuth();
  if (!authRes?.data) throw new Error("Authorisation error");

  const res = await axios.post(
    `${RESELLER_URL}rest/Sms/Send?SessionID=${authRes.data}`,
    {
      headers: {
        "Content-Type": "application/ x - www - form - urlencoded",
      },
    }
  );

  return NextResponse.json(res.data);
}

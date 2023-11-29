import { NextResponse } from "next/server";
import axios from "axios";
import resellerAuth from "../helpers/resellerAuth";

const { RESELLER_URL } = process.env;

export async function GET(req: Request) {
  const authRes = await resellerAuth();
  if (!authRes) throw new Error("Authorisation error");

  const res = await axios.get(
    `${RESELLER_URL}/rest/User/Balance?SessionID=${authRes}`
  );

  return NextResponse.json(res.data);
}

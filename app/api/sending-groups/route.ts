import { NextResponse } from "next/server";
import db from "@/db";

// get all groups for all users
// or
// get all groups for one user by user ID
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("userId");

  if (id) {
    // getting logic for one user
    return NextResponse.json(null);
  }

  //getting all groups
  return NextResponse.json(null);
}

// add new sendig group, here we working with excel file of clients and get user ID from search params
// 1. we adding all clients to clients table and getting all clients id in array
// 2. create sending group with user_id from search params and array of clients
export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("userId");
  const body = await request.json();
}

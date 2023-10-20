import { NextResponse } from "next/server";
import db from "@/db";

// get one sending group
export async function GET(request, { params }) {
  const { id } = params;

  const userGroup = await db.query(
    `SELECT groups_members.client_id, clients.tel 
		FROM groups_members
		JOIN clients ON groups_members.client_id = clients.client_id
		WHERE groups_members.group_id = ${id} `
  );

  // console.log("params:  ", params)
  return NextResponse.json(userGroup.rows, { status: 200 });
}

// delete one sending group
export async function DELETE(request, { params }) {
  const id = params.id;
}

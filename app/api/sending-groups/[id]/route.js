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

  return NextResponse.json(userGroup.rows, { status: 200 });
}

// delete one sending group
export async function DELETE(request, { params }) {
  const { id } = params;

  await db.query(
    `DELETE FROM send_groups
		WHERE send_groups.group_id = ${id} `
  );
  return NextResponse.json(`Group with id=${id} is deleted`, { status: 200 });
}

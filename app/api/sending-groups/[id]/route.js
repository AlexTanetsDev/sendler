import { NextResponse } from "next/server";
import db from "@/db";

// get one sending group
export async function GET(request, { params }) {
  const { id } = params;

  //checking group_id existense
  const groupIdRes = await db.query("SELECT group_id FROM send_groups");
  const groupIdObjectArray = groupIdRes.rows;
  const groupsIdInDatabase = [];
  for (const groupIdObject of groupIdObjectArray) {
    groupsIdInDatabase.push(groupIdObject.group_id);
  }

  if (
    !groupsIdInDatabase.find(
      (groupIdInDatabase) => groupIdInDatabase === Number(id)
    )
  ) {
    return NextResponse.json(`The group with id = ${id} does not exist`, {
      status: 400,
    });
  }

  try {
    const userGroups = await db.query(
      `SELECT groups_members.client_id, clients.tel 
		FROM groups_members
		JOIN clients ON groups_members.client_id = clients.client_id
		WHERE groups_members.group_id = ${id} `
    );

    return NextResponse.json(userGroups.rows, { status: 200 });
  } catch (error) {
    return NextResponse.json("Failed to get a groups list", { status: 500 });
  }
}

// delete one sending group
export async function DELETE(request, { params }) {
  const { id } = params;

  //checking group_id existense
  const groupIdRes = await db.query("SELECT group_id FROM send_groups");
  const groupIdObjectArray = groupIdRes.rows;
  const groupsIdInDatabase = [];
  for (const groupIdObject of groupIdObjectArray) {
    groupsIdInDatabase.push(groupIdObject.group_id);
  }

  if (
    !groupsIdInDatabase.find(
      (groupIdInDatabase) => groupIdInDatabase === Number(id)
    )
  ) {
    return NextResponse.json(`The group with id = ${id} does not exist`, {
      status: 400,
    });
  }

  try {
    await db.query(
      `DELETE FROM send_groups
		WHERE send_groups.group_id = ${id}`
    );

    return NextResponse.json(`Group with id = ${id} is deleted`, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json("Failed to delete a group", { status: 500 });
  }
}

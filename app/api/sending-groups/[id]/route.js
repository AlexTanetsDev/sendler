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
		WHERE send_groups.group_id = ${id}`
  );
  return NextResponse.json(`Group with id=${id} is deleted`, { status: 200 });
}

// add new sendig group, here we working with excel file of clients and get user ID from search params
// 1. we adding all clients to clients table and getting all clients id in array
// 2. create sending group with user_id from search params and array of clients
export async function POST(request, { params }) {
  const { name, clients } = await request.json();
  const { id } = params;
  console.log(clients);

  async function insertClient(tel, userId, groupId) {
    await db.query(
      `INSERT INTO clients (tel, user_id) values($1, $2) RETURNING *`,
      [tel, userId]
    );
    const clientId = await db.query(
      `SELECT client_id FROM clients WHERE user_id = ${userId} AND tel=${tel} `
    );

    const { client_id } = clientId.rows[0];

    await db.query(
      `INSERT INTO groups_members (group_id, client_id) values($1, $2) RETURNING *`,
      [groupId, client_id]
    );
  }

  const userIdRes = await db.query(`SELECT user_id FROM users`);
  const userIdObjectArray = userIdRes.rows;
  const usersId = [];
  for (const userIdObject of userIdObjectArray) {
    usersId.push(userIdObject.user_id);
  }

  if (!usersId.find((userId) => userId === Number(id))) {
    return NextResponse.json(`The user with id=${id} does not exist`, {
      status: 400,
    });
  }

  try {
    const group = await db.query(
      `INSERT INTO send_groups (group_name, user_id) values($1, $2) RETURNING *`,
      [name, id]
    );
    const userClients = await db.query(
      `SELECT tel FROM clients WHERE user_id = ${id}`
    );

    const userClientsArray = userClients.rows;
    const { group_id } = group.rows[0];

    const numberClients = [];
    for (const numberClient of userClientsArray) {
      numberClients.push(numberClient.tel);
    }

    clients.map((client) => {
      if (!numberClients.find((numberClient) => numberClient === client.tel)) {
        const { tel } = client;
        insertClient(tel, id, group_id);
      }
    });
    return NextResponse.json(group.rows[0], { status: 200 });
  } catch (error) {
    return NextResponse.json("Failed to create a new group", { status: 500 });
  }
}

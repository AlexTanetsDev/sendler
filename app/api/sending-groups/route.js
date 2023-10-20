import { NextResponse } from "next/server";
import db from "@/db";

// get all groups for all users
// or
// get all groups for one user by user ID
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("userId");
  console.log(searchParams);
  console.log(id);

  if (id) {
    // getting logic for one user
    try {
      const groups = await db.query(
        `SELECT group_name FROM send_groups WHERE user_id = ${id}`
      );
      return NextResponse.json(groups.rows);
    } catch (error) {
      return NextResponse.json(error);
    }
  }

  //getting all groups
  return NextResponse.json(null);
}

// add new sendig group, here we working with excel file of clients and get user ID from search params
// 1. we adding all clients to clients table and getting all clients id in array
// 2. create sending group with user_id from search params and array of clients
// export async function POST(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const id = searchParams.get("userId");
//   const body = await request.json();
// }
export async function POST(request) {
  const { id, name, clients } = await request.json();

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
      if (
        !numberClients.find((numberClient) => numberClient === client.number)
      ) {
        const { tel } = client;
        insertClient(tel, id, group_id);
      }
    });

    return NextResponse.json(group.rows[0], { status: 200 });
  } catch (error) {
    return NextResponse.json("Failed to create a new group", { status: 500 });
  }
}

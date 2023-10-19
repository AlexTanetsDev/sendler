const db = require("../../../../../db");

export async function POST(request, response) {
  const { id, name, clients } = await request.json();

  async function insertClient(number, userId, groupId) {
    await db.query(
      `INSERT INTO clients (tel, user_id) values($1, $2) RETURNING *`,
      [number, userId]
    );
    const clientId = await db.query(
      `SELECT client_id FROM clients WHERE user_id = ${userId} AND tel=${number} `
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
        const { number } = client;
        insertClient(number, id, group_id);
      }
    });

    return new Response(JSON.stringify(group.rows[0]), { status: 200 });
  } catch (error) {
    return new Response("Failed to create a new group", { status: 500 });
  }
}

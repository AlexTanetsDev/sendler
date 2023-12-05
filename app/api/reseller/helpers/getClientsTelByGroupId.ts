import db from "@/db";
import { IClientsIdWithTel } from "@/globaltypes/types";

export const getClientsTelByGroupId = async (
  group_id: string
): Promise<IClientsIdWithTel[]> => {
  const clientsRes = await db.query(
    "SELECT clients.client_id, clients.tel FROM clients JOIN groups_members ON groups_members.client_id = clients.client_id AND groups_members.group_id = $1",
    [group_id]
  );
  return clientsRes.rows;
};

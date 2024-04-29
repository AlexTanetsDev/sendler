import db from "@/db";

export default async function insertAlfaName(name: any, id: number, active: boolean) {

	const res = await db.query(
		`INSERT iNTO sendler_name (alfa_name, user_id, alfa_name_active) values($1, $2, $3) RETURNING *`,
		[name, id, active]);

	if (res.rows[0].alfa_name) {
		return res.rows[0].alfa_name;
	}
}
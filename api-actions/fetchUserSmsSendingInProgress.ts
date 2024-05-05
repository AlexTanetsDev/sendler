import db from "@/db";

import { QueryResult } from "pg";
import { ISendingProcess } from "@/globaltypes/types";

export default async function fetchUserSmsSendingInProgress(id: number): Promise<ISendingProcess[]> {
	const res: QueryResult<any> = await db.query(
		`SELECT rs.history_id, recipient_status, COUNT(*), to_char(sh.sending_group_date, 'DD.MM.YYYY HH24:MI:SS') AS sending_group_date
		FROM recipients_status rs
		INNER JOIN sending_history sh ON sh.history_id = rs.history_id
		WHERE rs.history_id IN (
		SELECT DISTINCT rs.history_id
		FROM recipients_status rs
		INNER JOIN sending_history sh ON sh.history_id = rs.history_id
		INNER JOIN sending_members sm ON sh.history_id = sm.history_id
		INNER JOIN send_groups sg ON sg.group_id = sm.group_id
		WHERE rs.recipient_status = 'pending' AND sg.user_id = ${id})
		GROUP BY rs.history_id, recipient_status, sh.sending_group_date`
	);

	// modify sending array
	let sendingInProgress: ISendingProcess[] = [];
	for (let i = 0; i < res.rows.length; i = i + 1) {
		sendingInProgress.push({
			history_id: res.rows[i].history_id,
			date: res.rows[i].sending_group_date
		})
		if (res.rows[i]) {
			if (res.rows[i].recipient_status === 'rejected') {
				sendingInProgress[i].rejected = Number(res.rows[i].count);
			};
			if (res.rows[i].recipient_status === 'fullfield') {
				sendingInProgress[i].fullfield = Number(res.rows[i].count);
			};
			if (res.rows[i].recipient_status === 'pending') {
				sendingInProgress[i].pending = Number(res.rows[i].count);
			};
		};
	};

	// duplicate data of sending in each items with same history_id
	for (let i = 0; i < sendingInProgress.length; i += 1) {
		for (let j = 0; j < sendingInProgress.length; j += 1) {
			if (sendingInProgress[i].history_id === sendingInProgress[j].history_id) {
				sendingInProgress[i] = { ...sendingInProgress[i], ...sendingInProgress[j] };
			};
		};
	};

	//remove duplicate items of sending array
	for (let i = 0; i < sendingInProgress.length; i += 1) {
		for (let j = 0; j < sendingInProgress.length; j += 1) {
			if (sendingInProgress[i].history_id === sendingInProgress[j].history_id) {
				if (i !== j) {
					sendingInProgress.splice(j, 1);
				}
			};
		};
	};

	return sendingInProgress;
};
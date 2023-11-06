import { Pool } from "pg";
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const pool = new Pool({
	host: DB_HOST,
	port: 5432,
	database: DB_NAME,
	user: DB_USER,
	password: DB_PASSWORD,
	// ssl: { rejectUnauthorized: false },
});

export default pool;

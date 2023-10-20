// import pgPromise from "pg-promise";

// const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// const pgp = pgPromise();

// const cn = {
// 	host: DB_HOST,
// 	port: 5432,
// 	database: DB_NAME,
// 	user: DB_USER,
// 	password: DB_PASSWORD,
// 	ssl: { rejectUnauthorized: false },
// };

// let db;

// if (!db) {
// 	db = pgp(cn);
// }

// export default db;

const Pool = require('pg').Pool;
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

let pool;

if (!pool) {
	pool = new Pool({
		host: DB_HOST,
		port: 5432,
		database: DB_NAME,
		user: DB_USER,
		password: DB_PASSWORD,
		ssl: { rejectUnauthorized: false },
	});
}


module.exports = pool;

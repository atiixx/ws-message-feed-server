// db.js
import postgres from "postgres";

const sql = postgres(process.env.DB_URL);

//await sql`DROP TABLE messages`;
await sql`CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    name varchar(255),
    message varchar(255),
    date varchar(255)
)`;

export default sql;

// config/database.js
import postgres from "postgres";

const sql = postgres({
  host: 'ep-square-sky-a1vkt05d.ap-southeast-1.aws.neon.tech',
  database: 'project1',
  username: 'Test1_owner',
  password: 'pNvSg3E7byCw',
  port: 5432,
  ssl: { rejectUnauthorized: false }, // Correct ssl configuration
  connection: {
    options: `project=ep-square-sky-a1vkt05d`,
  },
});

async function getPgVersion() {
  try {
    const result = await sql`select version()`;
    console.log(result);
  } catch (error) {
    console.error('Database connection error:', error);
  }
}

getPgVersion(); // Test the connection on startup

export default sql;

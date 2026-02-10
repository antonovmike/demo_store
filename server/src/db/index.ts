import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const database =
  process.env.NODE_ENV === "test"
    ? process.env.PGDATABASE_TEST
    : process.env.PGDATABASE;

const pool = new Pool({
  host: process.env.PGHOST,
  port: process.env.PGPORT ? parseInt(process.env.PGPORT, 10) : undefined,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database,
});

export default pool;

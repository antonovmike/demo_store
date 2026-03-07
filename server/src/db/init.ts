import fs from "fs";
import path from "path";
import pool from "./index.js";
import { getDirname } from "../utils/paths.js";

const __dirname = getDirname(import.meta.url);

async function initDb() {
  const schemaPath = path.join(__dirname, "schema.sql");
  const schema = fs.readFileSync(schemaPath, "utf8");
  try {
    await pool.query(schema);
    if (process.env.NODE_ENV !== "test") {
      console.log("✅ Database schema initialized");
    }
  } catch (err: any) {
    console.error("❌ Error initializing schema:", err.message);
    console.error(err.stack);
    throw err; // Throw error so init_db.js can handle it
  }
}

export default initDb;

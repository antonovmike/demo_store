import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pool from "./index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function initDb() {
  const schemaPath = path.join(__dirname, "schema.sql");
  const schema = fs.readFileSync(schemaPath, "utf8");
  try {
    await pool.query(schema);
    if (process.env.NODE_ENV !== "test") {
      console.log("✅ Database schema initialized");
    }
  } catch (err) {
    console.error("❌ Error initializing schema:", err);
  }
}

export default initDb;
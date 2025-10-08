const fs = require("fs");
const path = require("path");
const pool = require("./index");

async function initDb() {
  const schemaPath = path.join(__dirname, "schema.sql");
  const schema = fs.readFileSync(schemaPath, "utf8");
  try {
    await pool.query(schema);
    console.log("✅ Database schema initialized");
  } catch (err) {
    console.error("❌ Error initializing schema:", err);
  }
}

module.exports = initDb;
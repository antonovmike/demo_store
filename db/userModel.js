const pool = require("./index");

// Create user
async function createUser(username, passwordHash) {
  const result = await pool.query(
    "INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id, username",
    [username, passwordHash]
  );
  return result.rows[0];
}

// Find user by username
async function findUserByUsername(username) {
  const result = await pool.query(
    "SELECT * FROM users WHERE username = $1",
    [username]
  );
  return result.rows[0]; // or undefined
}

// Clear all users (for testing)
async function deleteAllUsers() {
  await pool.query("DELETE FROM users");
}

module.exports = {
  createUser,
  findUserByUsername,
  deleteAllUsers,
};

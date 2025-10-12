const pool = require("./index");

// Create user
async function createUser(username, passwordHash) {
  try {
    const result = await pool.query(
      "INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id, username",
      [username, passwordHash]
    );
    return result.rows[0];
  } catch (err) {
    console.error("Error creating user:", err);
    throw err;
  }
}

// Find user by username
async function findUserByUsername(username) {
  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    return result.rows[0]; // or undefined
  } catch (err) {
    console.error("Error finding user:", err);
    throw err;
  }
}

// Clear all users (for testing)
async function deleteAllUsers() {
  try {
    await pool.query("DELETE FROM users");
  } catch (err) {
    console.error("Error deleting users:", err);
    throw err;
  }
}

module.exports = {
  createUser,
  findUserByUsername,
  deleteAllUsers,
};

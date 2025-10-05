let users = []; // Temporary storage of users in memory
let nextId = 1;

function createUser(username, passwordHash) {
  const user = {
    id: nextId++,
    username,
    passwordHash,
  };
  users.push(user);
  return user;
}

function findUserByUsername(username) {
  return users.find(u => u.username === username);
}

function findUserById(id) {
  return users.find(u => u.id === id);
}

// Needed for tests to reset the array
function resetUsers() {
  users = [];
  nextId = 1;
}

module.exports = {
  createUser,
  findUserByUsername,
  findUserById,
  resetUsers,
};

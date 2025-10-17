const { User, Role } = require('../models');

// Using Sequelize ORM for user operations

// Create user
async function createUser(username, passwordHash, roleName = 'user') {
  try {
    const role = await Role.findOne({ where: { name: roleName } });
    if (!role) {
      throw new Error(`Role with name '${roleName}' not found`);
    }
    const user = await User.create({ username, password_hash: passwordHash, roleId: role.id });
    return { id: user.id, username: user.username, role: role.name };
  } catch (err) {
    console.error('Error creating user:', err);
    throw err;
  }
}

// Find user by username
async function findUserByUsername(username) {
  try {
    const user = await User.findOne({ where: { username } });
    return user ? user.get({ plain: true }) : undefined;
  } catch (err) {
    console.error('Error finding user:', err);
    throw err;
  }
}

// Clear all users (for testing)
async function deleteAllUsers() {
  try {
    await User.destroy({ where: {} });
  } catch (err) {
    console.error('Error deleting users:', err);
    throw err;
  }
}

module.exports = {
  createUser,
  findUserByUsername,
  deleteAllUsers
};
import models from '../models/index.js';
const { User, Role } = models;

console.log("Imported User:", User && (typeof User === "object" ? Object.keys(User) : typeof User));

// Using Sequelize ORM for user operations

// Create user
async function createUser(username, passwordHash, roleName = 'user') {
  try {
    const role = await Role.findOne({ where: { name: roleName } });

    if (!role) {
      // If "role" not found, fall back to "user" role
      console.warn(`⚠️ Role '${roleName}' not found. Falling back to 'user'.`);
      role = await Role.findOne({ where: { name: 'user' } });

      // If even "user" role doesn't exist, create it
      if (!role) {
        console.warn("⚠️ Default role 'user' not found. Creating fallback role...");
        role = await Role.create({ name: 'user' });
      }
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

export { createUser, findUserByUsername, deleteAllUsers };
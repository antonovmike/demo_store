import { User, Role } from "../models/index.js";

// Create user
async function createUser(
  username: string,
  email: string,
  passwordHash: string,
  roleName = "user",
) {
  let role = await Role.findOne({ where: { name: roleName } });

  if (!role) {
    console.warn(`⚠️ Role '${roleName}' not found. Falling back to 'user'.`);
    role = await Role.findOne({ where: { name: "user" } });

    if (!role) {
      console.warn(
        "⚠️ Default role 'user' not found. Creating fallback role...",
      );
      role = await Role.create({ name: "user" });
    }
  }

  const user = await User.create({
    username,
    email: email,
    password_hash: passwordHash,
    roleId: role.id,
  });
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    role: role.name,
  };
}

// Find user by username
async function findUserByUsername(username: string) {
  const user = await User.findOne({ where: { username } });
  return user ? user.get({ plain: true }) : undefined;
}

// Remove all users (for testing purposes)
async function deleteAllUsers() {
  await User.destroy({ where: {} });
}

export default { createUser, findUserByUsername, deleteAllUsers };

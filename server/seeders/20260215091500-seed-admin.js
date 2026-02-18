"use strict";
import bcrypt from "bcrypt";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface) {
    const passwordHash = await bcrypt.hash("admin", 10);

    const [adminRole] = await queryInterface.sequelize.query(
      `SELECT id FROM "Roles" WHERE name = 'admin' LIMIT 1;`,
    );

    const roleId = adminRole[0]?.id;

    await queryInterface.bulkInsert("Users", [
      {
        username: "admin",
        email: "admin@demostore.com",
        password_hash: passwordHash,
        roleId: roleId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Users", { username: "admin" }, {});
  },
};

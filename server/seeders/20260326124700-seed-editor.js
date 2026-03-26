"use strict";
import bcrypt from "bcrypt";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface) {
    const passwordHash = await bcrypt.hash("editor", 10);

    const [editorRole] = await queryInterface.sequelize.query(
      `SELECT id FROM "Roles" WHERE name = 'editor' LIMIT 1;`,
    );

    const roleId = editorRole[3]?.id;

    await queryInterface.bulkInsert("Users", [
      {
        username: "editor",
        email: "editor@demostore.com",
        password_hash: passwordHash,
        roleId: roleId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Users", { username: "editor" }, {});
  },
};

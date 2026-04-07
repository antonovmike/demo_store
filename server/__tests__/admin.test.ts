import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  test,
  expect,
} from "@jest/globals";
import bcrypt from "bcrypt";
import request from "supertest";

import app from "../src/server.js";

import { Role, User } from "../src/models";
import { sequelizeInstance as sequelize } from "../src/models";

// Ensure the database is in a clean state before tests run
beforeAll(async () => {
  await sequelize.sync({ force: true });

  // Create default roles
  await Role.bulkCreate([{ name: "user" }, { name: "admin" }, { name: "editor" }]);
  // Create test users
  await User.create({
    username: "Alice",
    email: "alice@example.com",
    password_hash: await bcrypt.hash("123456", 10),
    roleId: 1, // user role
  });
  await User.create({
    username: "AdminUser",
    email: "admin@example.com",
    password_hash: await bcrypt.hash("adminpass", 10),
    roleId: 2, // admin role
  });
  await User.create({
    username: "EditorUser",
    email: "editor@example.com",
    password_hash: await bcrypt.hash("editorpass", 10),
    roleId: 3, // editor role
  });
});

beforeEach(async () => {
  await sequelize.sync({ force: true });
  await Role.bulkCreate([{ name: "user" }, { name: "admin" }, { name: "editor" }]);
});

// Close Sequelize connection
afterAll(async () => {
  await sequelize.close();
});

describe("Admin routes", () => {
  test("POST /admin/change-password allows admin to change another user's password", async () => {
    const adminRole = await Role.findOne({ where: { name: "admin" } });
    const userRole = await Role.findOne({ where: { name: "user" } });

     console.log("adminRole", adminRole);
     console.log("userRole", userRole);

    const admin = await User.create({
      username: "AdminUser",
      email: "admin@example.com",
      password_hash: await bcrypt.hash("adminpass", 10),
      roleId: adminRole!.id,
    });

    const targetUser = await User.create({
      username: "TargetUser",
      email: "target@example.com",
      password_hash: await bcrypt.hash("oldpass", 10),
      roleId: userRole!.id,
    });
    
    const loginRes = await request(app).post("/users/login").send({
      email: "admin@example.com",
      password: "adminpass",
    });
    const token = loginRes.body.token;

    const res = await request(app)
      .post("/admin/change-password")
      .set("Authorization", `Bearer ${token}`)
      .send({ userId: targetUser.id, newPassword: "newpass123" });

    expect(res.statusCode).toBe(200);
  });

  test("POST /admin/change-password denies editor", async () => {
    const editorRole = await Role.findOne({ where: { name: "editor" } });
    const userRole = await Role.findOne({ where: { name: "user" } });

    console.log("editorRole", editorRole);
    console.log("userRole", userRole);

    await User.create({
      username: "EditorUser",
      email: "editor@example.com",
      password_hash: await bcrypt.hash("editorpass", 10),
      roleId: editorRole!.id,
    });

    const targetUser = await User.create({
      username: "TargetUser",
      email: "target@example.com",
      password_hash: await bcrypt.hash("oldpass", 10),
      roleId: userRole!.id,
    });

    const loginRes = await request(app).post("/users/login").send({
      email: "editor@example.com",
      password: "editorpass",
    });
    const token = loginRes.body.token;

    const res = await request(app)
      .post("/admin/change-password")
      .set("Authorization", `Bearer ${token}`)
      .send({ userId: targetUser.id, newPassword: "newpass123" });

    expect(res.statusCode).toBe(403);
    expect(res.body).toHaveProperty("error", "Forbidden: insufficient role");
  });

  test("POST /admin/change-password denies regular user", async () => {
    const userRole = await Role.findOne({ where: { name: "user" } });

    console.log("userRole", userRole);

    await User.create({
      username: "RegularUser",
      email: "user@example.com",
      password_hash: await bcrypt.hash("userpass", 10),
      roleId: userRole!.id,
    });

    const targetUser = await User.create({
      username: "TargetUser",
      email: "target@example.com",
      password_hash: await bcrypt.hash("oldpass", 10),
      roleId: userRole!.id,
    });

    const loginRes = await request(app).post("/users/login").send({
      email: "user@example.com",
      password: "userpass",
    });
    const token = loginRes.body.token;

    const res = await request(app)
      .post("/admin/change-password")
      .set("Authorization", `Bearer ${token}`)
      .send({ userId: targetUser.id, newPassword: "newpass123" });

    expect(res.statusCode).toBe(403);
    expect(res.body).toHaveProperty("error", "Forbidden: insufficient role");
  });
});

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
  await Role.bulkCreate([{ name: "user" }, { name: "admin" }]);
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
});

beforeEach(async () => {
  await sequelize.sync({ force: true });
  await Role.bulkCreate([{ name: "user" }, { name: "admin" }]);
});

// Close Sequelize connection
afterAll(async () => {
  await sequelize.close();
});

describe("Admin routes", () => {
  test("admin can change another user's password", async () => {
    // TODO: Implement test
  });
});

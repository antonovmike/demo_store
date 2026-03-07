import { afterAll, beforeAll, describe, test, expect } from "@jest/globals";
import bcrypt from "bcrypt";
import request from "supertest";
import path from "path";
import app from "../src/server";

import { Role, User } from "../src/models";
import { sequelizeInstance as sequelize } from "../src/models";

beforeAll(async () => {
  await sequelize.sync({ force: true });
  await Role.bulkCreate([{ name: "user" }, { name: "admin" }]);

  await User.create({
    username: "Alice",
    email: "alice@example.com",
    password_hash: await bcrypt.hash("123456", 10),
    roleId: 1,
  });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Avatar upload", () => {
  test("PUT /users/me/avatar succeeds with valid PNG file", async () => {
    const loginRes = await request(app).post("/users/login").send({
      email: "alice@example.com",
      password: "123456",
    });
    expect(loginRes.statusCode).toBe(200);
    const token = loginRes.body.token;

    const filePath = path.join(__dirname, "fixtures", "avatar.png");

    const res = await request(app)
      .put("/users/me/avatar")
      .set("Authorization", `Bearer ${token}`)
      .attach("avatar", filePath);

    expect(res.statusCode).toBe(200);
  });
});

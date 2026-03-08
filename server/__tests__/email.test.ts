import {
  beforeEach,
  describe,
  test,
  expect,
  jest,
  beforeAll,
  afterAll,
} from "@jest/globals";
import request from "supertest";
import bcrypt from "bcrypt";

import app from "../src/server";
import { User } from "../src/models";
import { sequelizeInstance as sequelize, Role } from "../src/models";
import transporter from "../src/services/email/transporter";

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

// Create mock for nodemailer transporter
jest.mock("../src/services/email/transporter", () => {
  const sendMailMock = jest.fn();
  return {
    __esModule: true,
    default: { sendMail: sendMailMock },
  };
});

afterAll(async () => {
  await sequelize.close();
});

describe("nodestyle callback api", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
    await Role.bulkCreate([{ name: "user" }, { name: "admin" }]);
    await User.create({
      username: "Alice",
      email: "allice@example.com",
      password_hash: await bcrypt.hash("123456", 10),
      roleId: 1, // user role
    });
  });
  beforeEach(() => {
    (transporter.sendMail as jest.Mock).mockClear();
  });

  test("should succeed for email sending", async () => {
    const response = await request(app)
      .post("/users/reset-password")
      .send({ email: "allice@example.com", password: "123456" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/);

    expect(response.status).toBe(200);
    expect(transporter.sendMail).toHaveBeenCalled();
  });
});

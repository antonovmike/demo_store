const request = require("supertest");
const app = require("../server");
const { sequelize, Product, User, Role } = require("../models");
const bcrypt = require("bcrypt");

beforeAll(async () => {});

afterAll(async () => {
  await sequelize.close();
});

describe("Products API", () => {});
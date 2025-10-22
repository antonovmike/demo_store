const request = require("supertest");
const app = require("../server");
const { sequelize, Product, User, Role } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../serverConfig");

let adminToken;

beforeAll(async () => {
  await sequelize.sync({ force: true });

  // Create roles
  const [userRole, adminRole] = await Promise.all([
    Role.create({ name: "user" }),
    Role.create({ name: "admin" }),
  ]);

  // Create an admin user
  const passwordHash = await bcrypt.hash("adminpass", 10);
  const admin = await User.create({
    username: "Admin",
    password_hash: passwordHash,
    roleId: adminRole.id,
  });

  // Generate JWT for admin
  const secret = "test_secret_key";
  adminToken = jwt.sign({ id: admin.id }, secret, { expiresIn: "1h" });

  // Create a couple of products
  await Product.bulkCreate([
    { name: "Laptop", price: 999.99, description: "Powerful laptop" },
    { name: "Mouse", price: 25.5, description: "Wireless mouse" },
  ]);
});

afterAll(async () => {
  await sequelize.close();
});

describe("Products API", () => {
  test("GET /products returns list of products", async () => {
    const res = await request(app).get("/products");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty("name");
    expect(res.body[0]).toHaveProperty("price");
  });
});
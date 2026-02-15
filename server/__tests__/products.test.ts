import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import request from "supertest";

import app from "../src/server";

import { Product, User, Role } from "../src/models";
import { sequelizeInstance as sequelize } from "../src/models";
import { SECRET_KEY } from "../src/serverConfig";

let adminToken: string;

beforeAll(async () => {
  await sequelize.sync({ force: true });

  async function createRoles() {
    const userRole = await Role.create({ name: "user" });
    const adminRole = await Role.create({ name: "admin" });
    return [userRole, adminRole];
  }

  const [userRole, adminRole] = await createRoles();

  // Create an admin user
  const passwordHash = await bcrypt.hash("adminpass", 10);
  const admin = await User.create({
    username: "Admin",
    email: "admin@example.com",
    password_hash: passwordHash,
    roleId: adminRole.id,
  });

  // Generate JWT for admin
  adminToken = jwt.sign({ id: admin.id, role: "admin" }, SECRET_KEY, {
    expiresIn: "1h",
  });

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

  test("POST /products fails without token", async () => {
    const res = await request(app).post("/products").send({
      name: "Monitor",
      price: 199.99,
      description: "HD monitor",
    });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("error");
  });

  test("GET /products/:id returns a product", async () => {
    const all = await Product.findAll();
    const firstId = all[0].id;

    const res = await request(app).get(`/products/${firstId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id", firstId);
    expect(res.body).toHaveProperty("name");
  });

  test("GET /products/:id returns 404 for invalid id", async () => {
    const res = await request(app).get("/products/9999");
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error", "Product not found");
  });

  test("POST /products creates a new product (admin only)", async () => {
    const res = await request(app)
      .post("/products")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Keyboard",
        price: 49.99,
        description: "Mechanical keyboard",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("name", "Keyboard");
  });
});

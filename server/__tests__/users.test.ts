import bcrypt from "bcrypt";
import request from "supertest";

import app from "../src/server";

import { Role, User } from "../src/models";
import { sequelizeInstance as sequelize } from "../src/models";

// Ensure the database is in a clean state before tests run
beforeAll(async () => {
  await sequelize.sync({ force: true });

  // Create default roles
  await Role.bulkCreate([{ name: "user" }, { name: "admin" }]);
});

// Clean up the database
beforeEach(async () => {
  await User.destroy({ where: {} });
});

// Close Sequelize connection
afterAll(async () => {
  await sequelize.close();
});

describe("User routes", () => {
  // Test user registration with default role
  test("POST /users/register creates a new user with role 'user'", async () => {
    const res = await request(app)
      .post("/users/register")
      .send({ username: "Alice", password: "123456" });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("username", "Alice");

    // Fetch user including role
    const dbUser = await User.findOne({
      where: { username: "Alice" },
      include: [{ model: Role, as: "role" }],
    });
    expect(dbUser).not.toBeNull();
    expect(dbUser!.role).not.toBeNull();
    expect(dbUser!.role!.name).toBe("user");
  });

  // Test admin registration manually via ORM
  test("Manually created admin can log in and has role 'admin'", async () => {
    const passwordHash = await bcrypt.hash("adminpass", 10);

    const adminRole = await Role.findOne({ where: { name: "admin" } });

    await User.create({
      username: "AdminUser",
      password_hash: passwordHash,
      roleId: adminRole!.id,
    });

    const loginRes = await request(app)
      .post("/users/login")
      .send({ username: "AdminUser", password: "adminpass" });

    expect(loginRes.statusCode).toBe(200);
    expect(loginRes.body).toHaveProperty("token");

    const dbUser = await User.findOne({
      where: { username: "AdminUser" },
      include: [{ model: Role, as: "role" }],
    });

    expect(dbUser).not.toBeNull();
    expect(dbUser!.role).not.toBeNull();
    expect(dbUser!.role!.name).toBe("admin");
  });

  // Test user registration with existing username fails
  test("POST /users/register with existing username fails", async () => {
    await request(app)
      .post("/users/register")
      .send({ username: "Alice", password: "123456" });

    const res = await request(app)
      .post("/users/register")
      .send({ username: "Alice", password: "123456" });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error", "User already exists");
  });

  // Test user login works with valid credentials
  test("POST /users/login works with valid credentials", async () => {
    await request(app)
      .post("/users/register")
      .send({ username: "Alice", password: "123456" });

    const res = await request(app)
      .post("/users/login")
      .send({ username: "Alice", password: "123456" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(typeof res.body.token).toBe("string");
  });

  // Test user login fails with invalid password
  test("POST /users/login fails with invalid password", async () => {
    await request(app)
      .post("/users/register")
      .send({ username: "Alice", password: "123456" });

    const res = await request(app)
      .post("/users/login")
      .send({ username: "Alice", password: "wrongpassword" });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty(
      "error",
      "User not found or invalid username or password",
    );
  });

  // Secure route test /me with valid token
  test("GET /users/me returns user data with valid token", async () => {
    // First, register and log in.
    await request(app)
      .post("/users/register")
      .send({ username: "Alice", password: "123456" });

    const loginRes = await request(app)
      .post("/users/login")
      .send({ username: "Alice", password: "123456" });

    const token = loginRes.body.token;

    const res = await request(app)
      .get("/users/me")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("username", "Alice");
  });

  // Secure route test /me without token
  test("GET /users/me without token returns 401", async () => {
    const res = await request(app).get("/users/me");
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("error");
  });

  // Secure route test /me with invalid token
  test("GET /users/me with invalid token returns 401", async () => {
    const res = await request(app)
      .get("/users/me")
      .set("Authorization", "Bearer invalidtoken123");

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("error");
  });
});

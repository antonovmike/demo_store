const request = require("supertest");
const app = require("../server");
const { resetUsers } = require("../models/userModel");

beforeEach(() => {
  resetUsers(); // Clear users before each test
});

describe("User routes", () => {
  // Test user registration
  test("POST /users/register creates a new user", async () => {
    const res = await request(app)
      .post("/users/register")
      .send({ username: "Alice", password: "123456" });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("username", "Alice");
  });

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

  // Test user login
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

  test("POST /users/login fails with invalid password", async () => {
    await request(app)
      .post("/users/register")
      .send({ username: "Alice", password: "123456" });

    const res = await request(app)
      .post("/users/login")
      .send({ username: "Alice", password: "wrongpassword" });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("error", "Invalid username or password");
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
});

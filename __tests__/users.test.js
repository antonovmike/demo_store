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
    // ADD TEST
  });

  test("POST /users/login fails with invalid password", async () => {
    // ADD TEST
  });
});
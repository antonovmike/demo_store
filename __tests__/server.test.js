const request = require("supertest");
const app = require("../server"); // Import server for testing

describe("DemoStore API", () => {
  test("GET /ping → pong", async () => {
    const res = await request(app).get("/ping");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("pong");
  });

  test("GET /hello → Hello", async () => {
    const res = await request(app).get("/hello");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello");
  });
});

test("GET /status → { status: 'ok', uptime: number }", async () => {
  const res = await request(app).get("/status");
  expect(res.statusCode).toBe(200);
  expect(res.body).toHaveProperty("status", "ok");
  expect(typeof res.body.uptime).toBe("string"); // Since .toFixed(2) is used
});

test("GET /unknown → 404 Not Found", async () => {
  const res = await request(app).get("/unknown");
  expect(res.statusCode).toBe(404);
  expect(res.body).toHaveProperty("error", "Not found");
});

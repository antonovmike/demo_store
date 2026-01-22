import request from "supertest";
import app from "../server.js";

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
  // The value of res.body.uptime is expected to be a string representation of 
  // the process uptime with two decimal places. This is because the process 
  // uptime is obtained by calling process.uptime() and then using the 
  // .toFixed(2) method to format it as a string with two decimal places.
  expect(typeof res.body.uptime).toBe("string");
});

test("GET /unknown → 404 Not Found", async () => {
  const res = await request(app).get("/unknown");
  expect(res.statusCode).toBe(404);
  expect(res.body).toHaveProperty("error", "Not found");
});

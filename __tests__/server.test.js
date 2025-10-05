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

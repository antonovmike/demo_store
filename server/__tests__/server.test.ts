import { describe, test, expect } from "@jest/globals";
import request from "supertest";

import type { Express } from "express";

import app from "../src/server";

describe("DemoStore API", () => {
  test("GET /ping → pong", async () => {
    const res = await request(app as Express).get("/ping");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("pong");
  });

  test("GET /hello → Hello", async () => {
    const res = await request(app as Express).get("/hello");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello");
  });
});

test("GET /status → { status: 'ok', uptime: string }", async () => {
  const res = await request(app as Express).get("/status");
  expect(res.statusCode).toBe(200);
  expect(res.body).toHaveProperty("status", "ok");
  expect(typeof res.body.uptime).toBe("string");
});

test("GET /unknown → 404 Not Found", async () => {
  const res = await request(app as Express).get("/unknown");
  expect(res.statusCode).toBe(404);
  expect(res.body).toHaveProperty("error", "Not found");
});

import { beforeEach, describe, test, expect, jest } from "@jest/globals";
import request from "supertest";
import app from "../src/server";

// Create mock for nodemailer transporter
jest.mock("../src/services/email/transporter", () => {
  const sendMailMock = jest.fn();
  return {
    __esModule: true,
    default: { sendMail: sendMailMock },
  };
});

import transporter from "../src/services/email/transporter";

describe("nodestyle callback api", () => {
  beforeEach(() => {
    (transporter.sendMail as jest.Mock).mockClear();
  });

  test("should succeed for email sending", async () => {
    const response = await request(app)
      .post("/users/reset-password")
      .send({ email: "test@example.com", password: "password123" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/);

    expect(response.status).toBe(200);
    expect(transporter.sendMail).toHaveBeenCalled();
  });
});

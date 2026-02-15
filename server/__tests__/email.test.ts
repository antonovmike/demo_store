import { beforeEach, describe, test, expect, jest } from "@jest/globals";
import request from "supertest";

import app from "../src/server";

const sendMailMock = jest.fn();

jest.mock("nodemailer");

const nodemailer = require("nodemailer");
nodemailer.createTransport.mockReturnValue({ sendMail: sendMailMock });

beforeEach(() => {
  sendMailMock.mockClear();
  nodemailer.createTransport.mockClear();
});

describe("nodestyle callback api", () => {
  test("should succeed for email sending", async () => {
    expect.assertions(0);
    const response = await request(app)
      .post("/login")
      .send({ email: "test@example.com", password: "password123" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/);
  });
});

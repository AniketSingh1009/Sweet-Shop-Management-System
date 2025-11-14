import request from "supertest";
import app from "../app";
import { db } from "../config/db";

beforeEach(async () => {
  await db.query("DELETE FROM users");
});

afterAll(async () => {
  await db.end();
});


const user = {
  email: "test@example.com",
  password: "Password@123"
};

describe("Auth Register", () => {
  it("should register a new user and return 201 + token", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send(user);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("token");
  });
});

describe("Auth Login", () => {
  it("should login a user and return 200 + token", async () => {
    // First register the user
    await request(app)
      .post("/api/auth/register")
      .send(user);

    // Then login
    const res = await request(app)
      .post("/api/auth/login")
      .send(user);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});

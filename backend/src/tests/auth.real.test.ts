// src/tests/auth.real.test.ts
process.env.JWT_SECRET = process.env.JWT_SECRET || "test-secret";

import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../app";
import { db } from "../config/db";

beforeAll(async () => {
  await db.query("DELETE FROM users");
});

afterAll(async () => {
  await db.end();
});



describe("Auth - real behavior (RED tests)", () => {
  const user = { 
    email: "test@example.com",
    password: "Password@123"
  };

  it("REGISTER: should return 201 and a verifiable JWT containing the email", async () => {
    const res = await request(app).post("/api/auth/register").send(user);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("token");

    const payload = jwt.verify(res.body.token, process.env.JWT_SECRET as string) as any;
    expect(payload).toHaveProperty("email", user.email);
  });

  it("REGISTER: duplicate email should return 409", async () => {
    const res = await request(app).post("/api/auth/register").send(user);
    expect(res.status).toBe(409);
  });

  it("LOGIN: correct password should return 200 and verifiable JWT", async () => {
    const res = await request(app).post("/api/auth/login").send(user);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");

    const payload = jwt.verify(res.body.token, process.env.JWT_SECRET as string) as any;
    expect(payload).toHaveProperty("email", user.email);
  });

  it("LOGIN: wrong password should return 401", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: user.email, password: "WrongPass123" });
    expect(res.status).toBe(401);
  });
});

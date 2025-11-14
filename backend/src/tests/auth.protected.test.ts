import request from "supertest";
import app from "../app";
import { db } from "../config/db";

beforeAll(async () => {
  await db.query("DELETE FROM users");
});

afterAll(async () => {
  await db.end();
});

describe("Protected Routes - JWT Authentication", () => {
  const user = {
    email: "protected@example.com",
    password: "Password@123"
  };

  let token: string;

  it("should register a user and get a token", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send(user);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("token");
    token = res.body.token;
  });

  it("should deny access to protected route without token", async () => {
    const res = await request(app).get("/api/users/profile");

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Access token required");
  });

  it("should deny access with invalid token", async () => {
    const res = await request(app)
      .get("/api/users/profile")
      .set("Authorization", "Bearer invalid-token");

    expect(res.status).toBe(403);
    expect(res.body.message).toBe("Invalid or expired token");
  });

  it("should allow access to protected route with valid token", async () => {
    const res = await request(app)
      .get("/api/users/profile")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.email).toBe(user.email);
  });
});

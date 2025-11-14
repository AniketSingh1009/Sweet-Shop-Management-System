import request from "supertest";
import app from "../app";

describe("Auth Validation", () => {
  it("should return 400 if email is missing", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ password: "Password@123" });

    expect(res.status).toBe(400);
  });

  it("should return 400 if password is missing", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ email: "test@example.com" });

    expect(res.status).toBe(400);
  });

  it("should return 400 for invalid email format", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ email: "not-an-email", password: "Password@123" });

    expect(res.status).toBe(400);
  });

  it("should return 400 for weak password", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ email: "test@example.com", password: "123" });

    expect(res.status).toBe(400);
  });
});

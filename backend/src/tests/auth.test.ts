import request from "supertest";
import app from "../app";

describe("Auth Register", () => {
  it("should register a new user and return 201 + token", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        email: "test@example.com",
        password: "Password@123"
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("token");
  });
});

import request from "supertest";
import app from "../app";

describe("Auth Login", () => {
  it("should login a user and return 200 + token", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "test@example.com",
        password: "Password@123"
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});

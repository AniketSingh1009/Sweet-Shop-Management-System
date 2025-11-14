import request from "supertest";
import app from "../app";
import { db } from "../config/db";

describe("GET /api/sweets", () => {
  let authToken: string;

  beforeAll(async () => {
    // Register and login to get auth token
    await request(app)
      .post("/api/auth/register")
      .send({ email: "getsweets@example.com", password: "password123" });

    const loginResponse = await request(app)
      .post("/api/auth/login")
      .send({ email: "getsweets@example.com", password: "password123" });

    authToken = loginResponse.body.token;

    // Add test sweets
    await db.query(
      "INSERT INTO sweets (name, category, price, quantity_in_stock) VALUES ($1, $2, $3, $4)",
      ["Test Chocolate Bar", "Chocolate", 3.99, 50]
    );
    await db.query(
      "INSERT INTO sweets (name, category, price, quantity_in_stock) VALUES ($1, $2, $3, $4)",
      ["Test Gummy Bears", "Candy", 2.49, 100]
    );
  });

  afterAll(async () => {
    await db.query("DELETE FROM sweets WHERE name LIKE 'Test%'");
    await db.query("DELETE FROM users WHERE email = 'getsweets@example.com'");
    await db.end();
  });

  it("should return a list of all sweets", async () => {
    const response = await request(app)
      .get("/api/sweets")
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(2);
    
    const sweet = response.body[0];
    expect(sweet).toHaveProperty("id");
    expect(sweet).toHaveProperty("name");
    expect(sweet).toHaveProperty("category");
    expect(sweet).toHaveProperty("price");
    expect(sweet).toHaveProperty("quantity_in_stock");
  });

  it("should return 401 if no auth token is provided", async () => {
    const response = await request(app).get("/api/sweets");

    expect(response.status).toBe(401);
  });
});

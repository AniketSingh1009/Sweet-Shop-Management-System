import request from "supertest";
import app from "../app";
import { db } from "../config/db";

describe("GET /api/sweets/search", () => {
  let authToken: string;

  beforeAll(async () => {
    // Register and login to get auth token
    await request(app)
      .post("/api/auth/register")
      .send({ email: "searchsweets@example.com", password: "password123" });

    const loginResponse = await request(app)
      .post("/api/auth/login")
      .send({ email: "searchsweets@example.com", password: "password123" });

    authToken = loginResponse.body.token;

    // Add test sweets for searching
    await db.query(
      "INSERT INTO sweets (name, category, price, quantity_in_stock) VALUES ($1, $2, $3, $4)",
      ["Dark Chocolate Bar", "Chocolate", 4.99, 30]
    );
    await db.query(
      "INSERT INTO sweets (name, category, price, quantity_in_stock) VALUES ($1, $2, $3, $4)",
      ["Milk Chocolate", "Chocolate", 3.49, 50]
    );
    await db.query(
      "INSERT INTO sweets (name, category, price, quantity_in_stock) VALUES ($1, $2, $3, $4)",
      ["Sour Gummy Worms", "Candy", 2.99, 100]
    );
    await db.query(
      "INSERT INTO sweets (name, category, price, quantity_in_stock) VALUES ($1, $2, $3, $4)",
      ["Lollipop Mix", "Candy", 1.99, 200]
    );
  });

  afterAll(async () => {
    await db.query("DELETE FROM sweets WHERE name IN ('Dark Chocolate Bar', 'Milk Chocolate', 'Sour Gummy Worms', 'Lollipop Mix')");
    await db.query("DELETE FROM users WHERE email = 'searchsweets@example.com'");
  });

  it("should search sweets by name", async () => {
    const response = await request(app)
      .get("/api/sweets/search?name=chocolate")
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(2);
    expect(response.body.every((s: any) => s.name.toLowerCase().includes("chocolate"))).toBe(true);
  });

  it("should search sweets by category", async () => {
    const response = await request(app)
      .get("/api/sweets/search?category=Candy")
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(2);
    expect(response.body.every((s: any) => s.category === "Candy")).toBe(true);
  });

  it("should search sweets by price range", async () => {
    const response = await request(app)
      .get("/api/sweets/search?minPrice=2&maxPrice=4")
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(2);
    expect(response.body.every((s: any) => s.price >= 2 && s.price <= 4)).toBe(true);
  });

  it("should search sweets by multiple criteria", async () => {
    const response = await request(app)
      .get("/api/sweets/search?category=Chocolate&minPrice=3&maxPrice=5")
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.every((s: any) => s.category === "Chocolate" && s.price >= 3 && s.price <= 5)).toBe(true);
  });

  it("should return empty array if no matches found", async () => {
    const response = await request(app)
      .get("/api/sweets/search?name=nonexistent")
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(0);
  });

  it("should return 401 if no auth token is provided", async () => {
    const response = await request(app).get("/api/sweets/search?name=chocolate");

    expect(response.status).toBe(401);
  });
});

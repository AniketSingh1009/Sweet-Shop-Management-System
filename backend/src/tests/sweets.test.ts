import request from "supertest";
import app from "../app";
import { db } from "../config/db";

describe("POST /api/sweets", () => {
  let authToken: string;

  beforeAll(async () => {
    // Register and login to get auth token
    await request(app)
      .post("/api/auth/register")
      .send({ email: "sweettest@example.com", password: "password123" });

    const loginResponse = await request(app)
      .post("/api/auth/login")
      .send({ email: "sweettest@example.com", password: "password123" });

    authToken = loginResponse.body.token;
  });

  afterAll(async () => {
    // Clean up test data
    await db.query("DELETE FROM sweets WHERE name LIKE 'Test%'");
    await db.query("DELETE FROM users WHERE email = 'sweettest@example.com'");
    await db.end();
  });

  it("should create a new sweet with valid data", async () => {
    const sweetData = {
      name: "Test Chocolate",
      category: "Chocolate",
      price: 2.99,
      quantity_in_stock: 100
    };

    const response = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${authToken}`)
      .send(sweetData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe(sweetData.name);
    expect(response.body.category).toBe(sweetData.category);
    expect(response.body.price).toBe(sweetData.price);
    expect(response.body.quantity_in_stock).toBe(sweetData.quantity_in_stock);
  });

  it("should return 401 if no auth token is provided", async () => {
    const sweetData = {
      name: "Test Candy",
      category: "Candy",
      price: 1.99,
      quantity_in_stock: 50
    };

    const response = await request(app)
      .post("/api/sweets")
      .send(sweetData);

    expect(response.status).toBe(401);
  });

  it("should return 400 if required fields are missing", async () => {
    const response = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${authToken}`)
      .send({ name: "Test Sweet" });

    expect(response.status).toBe(400);
  });
});

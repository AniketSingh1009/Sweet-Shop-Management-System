import request from "supertest";
import app from "../app";
import { db } from "../config/db";

describe("POST /api/sweets/:id/restock", () => {
  let adminToken: string;
  let userToken: string;
  let testSweetId: number;

  beforeAll(async () => {
    // Add role column if it doesn't exist
    try {
      await db.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'user'`);
    } catch (err) {
      // Column might already exist
    }

    // Register and login as admin
    await request(app)
      .post("/api/auth/register")
      .send({ email: "adminrestock@example.com", password: "password123" });

    await db.query("UPDATE users SET role = 'admin' WHERE email = 'adminrestock@example.com'");

    const adminLoginResponse = await request(app)
      .post("/api/auth/login")
      .send({ email: "adminrestock@example.com", password: "password123" });

    adminToken = adminLoginResponse.body.token;

    // Register and login as regular user
    await request(app)
      .post("/api/auth/register")
      .send({ email: "userrestock@example.com", password: "password123" });

    const userLoginResponse = await request(app)
      .post("/api/auth/login")
      .send({ email: "userrestock@example.com", password: "password123" });

    userToken = userLoginResponse.body.token;

    // Add a test sweet to restock
    const result = await db.query(
      "INSERT INTO sweets (name, category, price, quantity_in_stock) VALUES ($1, $2, $3, $4) RETURNING id",
      ["Sweet To Restock", "Candy", 2.99, 10]
    );
    testSweetId = result.rows[0].id;
  });

  afterAll(async () => {
    await db.query("DELETE FROM sweets WHERE name = 'Sweet To Restock'");
    await db.query("DELETE FROM users WHERE email IN ('adminrestock@example.com', 'userrestock@example.com')");
  });

  it("should restock a sweet when user is admin", async () => {
    const restockData = {
      quantity: 50
    };

    const response = await request(app)
      .post(`/api/sweets/${testSweetId}/restock`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send(restockData);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Restock successful");
    expect(response.body.sweet.quantity_in_stock).toBe(60);
    expect(response.body.sweet.id).toBe(testSweetId);

    // Verify quantity was updated in database
    const checkResult = await db.query("SELECT quantity_in_stock FROM sweets WHERE id = $1", [testSweetId]);
    expect(checkResult.rows[0].quantity_in_stock).toBe(60);
  });

  it("should handle multiple restocks", async () => {
    const restockData = {
      quantity: 20
    };

    const response = await request(app)
      .post(`/api/sweets/${testSweetId}/restock`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send(restockData);

    expect(response.status).toBe(200);
    expect(response.body.sweet.quantity_in_stock).toBe(80);
  });

  it("should return 403 when regular user tries to restock", async () => {
    const restockData = {
      quantity: 10
    };

    const response = await request(app)
      .post(`/api/sweets/${testSweetId}/restock`)
      .set("Authorization", `Bearer ${userToken}`)
      .send(restockData);

    expect(response.status).toBe(403);
    expect(response.body.error).toBe("Access denied. Admin only.");
  });

  it("should return 400 if quantity is not provided", async () => {
    const response = await request(app)
      .post(`/api/sweets/${testSweetId}/restock`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({});

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Quantity is required");
  });

  it("should return 400 if quantity is invalid", async () => {
    const response = await request(app)
      .post(`/api/sweets/${testSweetId}/restock`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ quantity: -10 });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Quantity must be a positive integer");
  });

  it("should return 404 if sweet does not exist", async () => {
    const response = await request(app)
      .post("/api/sweets/99999/restock")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ quantity: 10 });

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Sweet not found");
  });

  it("should return 401 if no auth token is provided", async () => {
    const response = await request(app)
      .post(`/api/sweets/${testSweetId}/restock`)
      .send({ quantity: 10 });

    expect(response.status).toBe(401);
  });
});

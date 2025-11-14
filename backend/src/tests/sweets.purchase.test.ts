import request from "supertest";
import app from "../app";
import { db } from "../config/db";

describe("POST /api/sweets/:id/purchase", () => {
  let authToken: string;
  let testSweetId: number;

  beforeAll(async () => {
    // Register and login to get auth token
    await request(app)
      .post("/api/auth/register")
      .send({ email: "purchaseuser@example.com", password: "password123" });

    const loginResponse = await request(app)
      .post("/api/auth/login")
      .send({ email: "purchaseuser@example.com", password: "password123" });

    authToken = loginResponse.body.token;

    // Add a test sweet to purchase
    const result = await db.query(
      "INSERT INTO sweets (name, category, price, quantity_in_stock) VALUES ($1, $2, $3, $4) RETURNING id",
      ["Sweet To Purchase", "Candy", 2.99, 100]
    );
    testSweetId = result.rows[0].id;
  });

  afterAll(async () => {
    await db.query("DELETE FROM sweets WHERE name = 'Sweet To Purchase'");
    await db.query("DELETE FROM users WHERE email = 'purchaseuser@example.com'");
  });

  it("should purchase a sweet and decrease quantity", async () => {
    const purchaseData = {
      quantity: 5
    };

    const response = await request(app)
      .post(`/api/sweets/${testSweetId}/purchase`)
      .set("Authorization", `Bearer ${authToken}`)
      .send(purchaseData);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Purchase successful");
    expect(response.body.sweet.quantity_in_stock).toBe(95);
    expect(response.body.sweet.id).toBe(testSweetId);

    // Verify quantity was updated in database
    const checkResult = await db.query("SELECT quantity_in_stock FROM sweets WHERE id = $1", [testSweetId]);
    expect(checkResult.rows[0].quantity_in_stock).toBe(95);
  });

  it("should handle multiple purchases", async () => {
    const purchaseData = {
      quantity: 10
    };

    const response = await request(app)
      .post(`/api/sweets/${testSweetId}/purchase`)
      .set("Authorization", `Bearer ${authToken}`)
      .send(purchaseData);

    expect(response.status).toBe(200);
    expect(response.body.sweet.quantity_in_stock).toBe(85);
  });

  it("should return 400 if quantity is not provided", async () => {
    const response = await request(app)
      .post(`/api/sweets/${testSweetId}/purchase`)
      .set("Authorization", `Bearer ${authToken}`)
      .send({});

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Quantity is required");
  });

  it("should return 400 if quantity is invalid", async () => {
    const response = await request(app)
      .post(`/api/sweets/${testSweetId}/purchase`)
      .set("Authorization", `Bearer ${authToken}`)
      .send({ quantity: -5 });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Quantity must be a positive integer");
  });

  it("should return 400 if quantity exceeds stock", async () => {
    const response = await request(app)
      .post(`/api/sweets/${testSweetId}/purchase`)
      .set("Authorization", `Bearer ${authToken}`)
      .send({ quantity: 1000 });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Insufficient stock");
  });

  it("should return 404 if sweet does not exist", async () => {
    const response = await request(app)
      .post("/api/sweets/99999/purchase")
      .set("Authorization", `Bearer ${authToken}`)
      .send({ quantity: 1 });

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Sweet not found");
  });

  it("should return 401 if no auth token is provided", async () => {
    const response = await request(app)
      .post(`/api/sweets/${testSweetId}/purchase`)
      .send({ quantity: 1 });

    expect(response.status).toBe(401);
  });
});

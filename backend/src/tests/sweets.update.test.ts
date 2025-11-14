import request from "supertest";
import app from "../app";
import { db } from "../config/db";

describe("PUT /api/sweets/:id", () => {
  let authToken: string;
  let testSweetId: number;

  beforeAll(async () => {
    // Register and login to get auth token
    await request(app)
      .post("/api/auth/register")
      .send({ email: "updatesweets@example.com", password: "password123" });

    const loginResponse = await request(app)
      .post("/api/auth/login")
      .send({ email: "updatesweets@example.com", password: "password123" });

    authToken = loginResponse.body.token;

    // Add a test sweet to update
    const result = await db.query(
      "INSERT INTO sweets (name, category, price, quantity_in_stock) VALUES ($1, $2, $3, $4) RETURNING id",
      ["Original Sweet", "Candy", 2.99, 50]
    );
    testSweetId = result.rows[0].id;
  });

  afterAll(async () => {
    await db.query("DELETE FROM sweets WHERE name IN ('Original Sweet', 'Updated Sweet')");
    await db.query("DELETE FROM users WHERE email = 'updatesweets@example.com'");
  });

  it("should update a sweet with valid data", async () => {
    const updateData = {
      name: "Updated Sweet",
      category: "Chocolate",
      price: 3.99,
      quantity_in_stock: 75
    };

    const response = await request(app)
      .put(`/api/sweets/${testSweetId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send(updateData);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(testSweetId);
    expect(response.body.name).toBe(updateData.name);
    expect(response.body.category).toBe(updateData.category);
    expect(response.body.price).toBe(updateData.price);
    expect(response.body.quantity_in_stock).toBe(updateData.quantity_in_stock);
  });

  it("should update only provided fields", async () => {
    const partialUpdate = {
      price: 4.99,
      quantity_in_stock: 100
    };

    const response = await request(app)
      .put(`/api/sweets/${testSweetId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send(partialUpdate);

    expect(response.status).toBe(200);
    expect(response.body.price).toBe(partialUpdate.price);
    expect(response.body.quantity_in_stock).toBe(partialUpdate.quantity_in_stock);
    expect(response.body.name).toBe("Updated Sweet");
  });

  it("should return 404 if sweet does not exist", async () => {
    const updateData = {
      name: "Non-existent Sweet",
      category: "Candy",
      price: 2.99,
      quantity_in_stock: 50
    };

    const response = await request(app)
      .put("/api/sweets/99999")
      .set("Authorization", `Bearer ${authToken}`)
      .send(updateData);

    expect(response.status).toBe(404);
  });

  it("should return 401 if no auth token is provided", async () => {
    const updateData = {
      name: "Updated Sweet",
      category: "Chocolate",
      price: 3.99,
      quantity_in_stock: 75
    };

    const response = await request(app)
      .put(`/api/sweets/${testSweetId}`)
      .send(updateData);

    expect(response.status).toBe(401);
  });

  it("should return 400 if invalid data is provided", async () => {
    const invalidData = {
      price: "invalid"
    };

    const response = await request(app)
      .put(`/api/sweets/${testSweetId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send(invalidData);

    expect(response.status).toBe(400);
  });
});

import request from "supertest";
import app from "../app";
import { db } from "../config/db";

describe("DELETE /api/sweets/:id", () => {
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
      .send({ email: "admin@example.com", password: "password123" });

    // Set admin role
    await db.query("UPDATE users SET role = 'admin' WHERE email = 'admin@example.com'");

    const adminLoginResponse = await request(app)
      .post("/api/auth/login")
      .send({ email: "admin@example.com", password: "password123" });

    adminToken = adminLoginResponse.body.token;

    // Register and login as regular user
    await request(app)
      .post("/api/auth/register")
      .send({ email: "regularuser@example.com", password: "password123" });

    const userLoginResponse = await request(app)
      .post("/api/auth/login")
      .send({ email: "regularuser@example.com", password: "password123" });

    userToken = userLoginResponse.body.token;

    // Add a test sweet to delete
    const result = await db.query(
      "INSERT INTO sweets (name, category, price, quantity_in_stock) VALUES ($1, $2, $3, $4) RETURNING id",
      ["Sweet To Delete", "Candy", 2.99, 50]
    );
    testSweetId = result.rows[0].id;
  });

  afterAll(async () => {
    await db.query("DELETE FROM sweets WHERE name = 'Sweet To Delete'");
    await db.query("DELETE FROM users WHERE email IN ('admin@example.com', 'regularuser@example.com')");
  });

  it("should delete a sweet when user is admin", async () => {
    const response = await request(app)
      .delete(`/api/sweets/${testSweetId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Sweet deleted successfully");

    // Verify sweet is deleted
    const checkResult = await db.query("SELECT * FROM sweets WHERE id = $1", [testSweetId]);
    expect(checkResult.rows.length).toBe(0);
  });

  it("should return 403 when regular user tries to delete", async () => {
    // Add another sweet for this test
    const result = await db.query(
      "INSERT INTO sweets (name, category, price, quantity_in_stock) VALUES ($1, $2, $3, $4) RETURNING id",
      ["Another Sweet To Test", "Candy", 1.99, 30]
    );
    const sweetId = result.rows[0].id;

    const response = await request(app)
      .delete(`/api/sweets/${sweetId}`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(response.status).toBe(403);
    expect(response.body.error).toBe("Access denied. Admin only.");

    // Clean up
    await db.query("DELETE FROM sweets WHERE id = $1", [sweetId]);
  });

  it("should return 404 if sweet does not exist", async () => {
    const response = await request(app)
      .delete("/api/sweets/99999")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.status).toBe(404);
  });

  it("should return 401 if no auth token is provided", async () => {
    const response = await request(app).delete(`/api/sweets/${testSweetId}`);

    expect(response.status).toBe(401);
  });
});

import request from "supertest";
import app from "../index";

describe("Order API", () => {
    let customerToken: string;
    let productId: string;

    beforeAll(async () => {
        const loginRes = await request(app).post("/auth/login").send({
            email: "customer@example.com",
            password: "password123",
        });

        customerToken = loginRes.body.token;

        const productRes = await request(app)
            .post("/products")
            .set("Authorization", `Bearer ${customerToken}`)
            .send({
                name: "Test Product",
                price: 50,
                stock: 20,
                category: "Electronics",
            });

        productId = productRes.body.id;
    });

    it("should place an order", async () => {
        const res = await request(app)
            .post("/orders")
            .set("Authorization", `Bearer ${customerToken}`)
            .send({
                items: [{ productId, quantity: 1 }],
            });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("orderId");
    });
});

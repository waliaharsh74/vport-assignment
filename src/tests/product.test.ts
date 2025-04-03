import request from "supertest";
import app from "../index";

describe("Product API", () => {
    let vendorToken: string;
    let productId: string;

    beforeAll(async () => {
        const res = await request(app).post("/auth/login").send({
            email: "vendor@example.com",
            password: "password123",
        });

        vendorToken = res.body.token;
    });

    it("should create a new product", async () => {
        const res = await request(app)
            .post("/products")
            .set("Authorization", `Bearer ${vendorToken}`)
            .send({
                name: "Test Product",
                price: 100,
                stock: 50,
                category: "Electronics",
            });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("id");

        productId = res.body.id;
    });

    it("should update the product", async () => {
        const res = await request(app)
            .put(`/products/${productId}`)
            .set("Authorization", `Bearer ${vendorToken}`)
            .send({
                price: 120,
                stock: 40,
            });

        expect(res.status).toBe(200);
        expect(res.body.price).toBe(120);
    });

    it("should delete the product", async () => {
        const res = await request(app)
            .delete(`/products/${productId}`)
            .set("Authorization", `Bearer ${vendorToken}`);

        expect(res.status).toBe(200);
    });
});

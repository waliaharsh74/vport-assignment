import request from "supertest";
import app from "../index"; 

describe("Authentication API", () => {
    let token: string;

    it("should register a new user", async () => {
        const res = await request(app).post("/auth/register").send({
            name: "Test User",
            email: "test@example.com",
            password: "password123",
            role: "customer",
        });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("token");
    });

    it("should login a user", async () => {
        const res = await request(app).post("/auth/login").send({
            email: "test@example.com",
            password: "password123",
        });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("token");

        token = res.body.token;
    });
});

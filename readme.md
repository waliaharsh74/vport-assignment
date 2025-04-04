# 🛍️ Multi-Vendor Order Management System

A full-featured backend system for managing a multi-vendor e-commerce platform. Built with **Node.js**, **Express**, **MongoDB**, and **TypeScript**.

## 🔧 Features

- User Authentication (JWT) with role-based access (admin, vendor, customer)
- Product management for vendors
- Order placement across multiple vendors
- Automatic order splitting and stock validation
- Revenue and sales analytics for admin and vendors
- Clean modular architecture with TypeScript

## 🚀 Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- TypeScript
- JWT + Bcrypt for auth
- Docker + Docker Compose
- Jest + Supertest for testing

## 📦 Project Structure

```
├── controllers
├── models
├── middlewares
├── routes
├── utils
├── tests
├── docker-compose.yml
├── Dockerfile
├── .env
├── tsconfig.json
└── README.md
```

## 🐳 Run with Docker

Make sure Docker and Docker Compose are installed.

```bash
docker-compose up --build
```

The app will be running on `http://localhost:5000`

## 🔑 Environment Variables

- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — Secret key for signing JWT tokens
- `PORT` — Port number

## 🧪 Run Tests

```bash
npm run test
```

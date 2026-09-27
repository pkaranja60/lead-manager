# Lead Manager

A full-stack Lead Management application built with Next.js (App Router, Tailwind CSS) on the frontend and Node.js/Express + MongoDB (Mongoose) on the backend.

---

## 🔗 Live Link (Deployed)

- **Production App**: [https://frontend-pink-psi-58.vercel.app/]
- **API Health Check**: [https://lead-manager-01u8.onrender.com]

---

## Features

- **Lead Creation**: `POST /leads` — Add a lead with `name`, `email`, and `status`.
- **Lead Listing**: `GET /leads` — Retrieve all leads sorted by most recent first.
- **Validation**: Enforces unique email, required fields, and valid enum statuses (`New`, `Engaged`, `Proposal Sent`, `Closed-Won`, `Closed-Lost`).
- **Interactive UI**: Responsive side-by-side layout with status badges, error notifications, and real-time state updates.

---

## How to Run Your Project Locally

### Prerequisites

- **Package Manager**: [Bun](https://bun.sh/) (recommended) or **Node.js 18+**
- **Database**: A MongoDB instance:
  - Local MongoDB instance (`mongodb://127.0.0.1:27017/lead-manager`), or
  - Free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) cluster

---

### Step 1: Clone and Configure Environment Files

1. **Backend Environment**:
   ```bash
   cp backend/.env.example backend/.env
   ```
   Open `backend/.env` and configure your database URI:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/lead-manager
   CLIENT_ORIGIN=http://localhost:3000
   ```

2. **Frontend Environment**:
   ```bash
   cp frontend/.env.example frontend/.env.local
   ```
   Ensure the API endpoint points to your backend:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

---

### Step 2: Install Dependencies

From the repository root, install dependencies for all workspaces:

```bash
bun install
```

*(If using npm: `npm install` at root, followed by `cd backend && npm install` and `cd ../frontend && npm install`)*

---

### Step 3: Start Frontend and Backend Concurrently

Run both services simultaneously from the repository root:

```bash
bun run start
```

This starts:
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:5000](http://localhost:5000)

---

### Alternative: Running Services Individually

If you prefer separate terminals:

* **Backend Terminal**:
  ```bash
  bun --filter backend dev
  # or: cd backend && bun run dev
  ```

* **Frontend Terminal**:
  ```bash
  bun --filter frontend dev
  # or: cd frontend && bun run dev
  ```

---

## Direct API Testing (Optional)

You can verify the backend directly using `curl`:

```bash
# Create a new lead
curl -X POST http://localhost:5000/leads \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","email":"jane@example.com","status":"New"}'

# Fetch all leads
curl http://localhost:5000/leads
```

---

## Deployment Guide

- **Database (MongoDB Atlas)**:
  - Create a free cluster, configure network access (whitelist IP `0.0.0.0/0`), and copy the connection string.
- **Backend (Render / Railway)**:
  - Root directory: `backend`
  - Build command: `bun install` (or `npm install`)
  - Start command: `node server.js`
  - Environment variables: `MONGODB_URI`, `PORT`, `CLIENT_ORIGIN` (set to your frontend domain).
- **Frontend (Vercel)**:
  - Root directory: `frontend`
  - Framework preset: `Next.js`
  - Environment variable: `NEXT_PUBLIC_API_URL` (set to your deployed backend URL).

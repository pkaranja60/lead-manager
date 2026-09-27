# Lead Manager

A simple Lead Management app: Node.js/Express + MongoDB (Mongoose) backend, Next.js frontend.

## Project structure

```
lead-manager/
├── backend/     # Express API
└── frontend/    # Next.js UI
```

## Features

- `POST /leads` — create a lead (`name`, `email`, `status`)
- `GET /leads` — list all leads
- Email is unique; `status` is one of `New`, `Engaged`, `Proposal Sent`, `Closed-Won`, `Closed-Lost`
- Next.js UI to list leads and add a new one via a form

## Prerequisites

- Node.js 18+
- A MongoDB instance — either:
  - Local MongoDB running on `mongodb://127.0.0.1:27017`, **or**
  - A free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) cluster (recommended if you don't want to install MongoDB locally)

## 1. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` and set `MONGODB_URI` (local or Atlas connection string).

```bash
npm run dev
```

The API runs on `http://localhost:5000` by default. Visit `http://localhost:5000/` to confirm it's up.

### Test the API directly (optional)

```bash
curl -X POST http://localhost:5000/leads \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","email":"jane@example.com","status":"New"}'

curl http://localhost:5000/leads
```

## 2. Frontend setup

In a new terminal:

```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

Visit `http://localhost:3000`. The form posts to the backend, and the list refreshes with the new lead.

## Deployment (optional / bonus)

- **Database:** create a free MongoDB Atlas cluster, whitelist all IPs (0.0.0.0/0) for simplicity, and copy the connection string into your backend's `MONGODB_URI`.
- **Backend:** deploy the `backend` folder to Render or Railway.
  - Build command: `npm install`
  - Start command: `npm start`
  - Env vars: `MONGODB_URI`, `CLIENT_ORIGIN` (set to your deployed frontend URL)
- **Frontend:** deploy the `frontend` folder to Vercel.
  - Env var: `NEXT_PUBLIC_API_URL` set to your deployed backend URL

## Notes on design choices

- Used Mongoose over Prisma since MongoDB pairs naturally with a schema-flexible `status` enum and this stack matches typical Next.js/Node.js projects.
- Kept the frontend UI framework-free (plain inline styles) to keep the codebase small and easy to review quickly.
- Basic validation and duplicate-email handling (`409` response) are implemented on the backend; the frontend surfaces API errors inline.

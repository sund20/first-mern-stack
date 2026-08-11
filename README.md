# first-mern-stack

Short description of your project.

## Installation

Instructions on how to install dependencies.

```bash
npm install
npm start


## Deployment URLs

- **Client (frontend):** https://first-mern-stack.onrender.com
- **Server (backend):** https://first-mern-stack.onrender.com
# First MERN Stack

A full-stack CRUD application built with MongoDB, Express, React (Vite), and Node.js. Users can be created, viewed, updated, and deleted through a simple web interface.

**Live app:** https://first-mern-stack.vercel.app
**Backend API:** https://first-mern-stack.onrender.com

---

## Tech Stack

- **Frontend:** React 19 + Vite, React Router, React-Bootstrap, Axios
- **Backend:** Node.js, Express, Mongoose
- **Database:** MongoDB Atlas
- **Hosting:** Vercel (frontend), Render (backend)

---

## Project Structure

```
first-mern-stack/
├── client/          # React frontend (Vite)
│   ├── src/
│   └── .env         # VITE_API_URL (not committed)
└── server/          # Express backend
    ├── routes/
    ├── index.js
    └── .env         # MONGO_URI, PORT, etc. (not committed)
```

---

## Local Setup

### 1. Clone the repo
```bash
git clone https://github.com/sund20/first-mern-stack.git
cd first-mern-stack
```

### 2. Backend setup
```bash
cd server
npm install
```
Create a `.env` file in `server/` using `server.env.example` as a reference, and add your own MongoDB connection string.

```bash
node index.js
```
Server runs at `http://localhost:8000`.

### 3. Frontend setup
Open a new terminal:
```bash
cd client
npm install
```
Create a `.env` file in `client/` using `client.env.example` as a reference.

```bash
npm run dev
```
App runs at `http://localhost:5173`.

---

## Environment Variables

### Server (`server/.env`)
| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB Atlas connection string |
| `PORT` | Port for the Express server (default: 8000) |
| `NODE_ENV` | Set to `production` only on the deployed server |
| `CLIENT_URL` | Comma-separated extra allowed origins for CORS |

### Client (`client/.env`)
| Variable | Description |
|---|---|
| `VITE_API_URL` | Base URL of the backend API (no trailing slash) |

See `server.env.example` and `client.env.example` for templates.

---

## Deployment

- **Frontend (Vercel):** deploys automatically on push to `main`. Set `VITE_API_URL` in Vercel's Environment Variables to the live backend URL, then redeploy (env vars are baked in at build time).
- **Backend (Render):**
  - Root Directory: `server`
  - Build Command: `npm install && npm install --prefix ../client --include=dev && npm run build --prefix ../client`
  - Start Command: `npm start`
  - Set `MONGO_URI`, `NODE_ENV=production`, and `CLIENT_URL` in Render's Environment tab.

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/users` | Get all users |
| POST | `/api/users` | Create a new user |
| PUT | `/api/users/:id` | Update a user |
| DELETE | `/api/user/:id` | Delete a user |

---

## License

This project is open source and available for personal or educational use.

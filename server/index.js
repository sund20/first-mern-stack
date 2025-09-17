import 'dotenv/config'; // Loads .env automatically

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import route from './routes/user.Route.js';

const app = express();
const PORT = process.env.PORT || 7000;
const MONGO_URI = process.env.MONGO_URI; // Make sure this matches your .env key!

app.use(express.json());
app.use(cors());

// API routes/
app.use("/api", route);
// Example API route

// Serve static files from React build (Vite = dist)
const __dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
  });
}

// Connect to MongoDB and start the server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ DB connected successfully");
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server is running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Database connection error:", error);
    process.exit(1);
  });

// Basic route (for dev mode)
//app.get('/', (req, res) => {
  //res.send('Hello, Render!');
//});

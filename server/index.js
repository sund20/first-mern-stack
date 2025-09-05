import 'dotenv/config'; // ✅ Loads .env automatically

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import route from './routes/user.Route.js';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 7000;
const MONGO_URI = process.env.MONGODB_URI;

const __dirname = path.resolve();

app.use("/api/server", route);
app.use(express.json());

if(process.env.MONGODB_URI === "server"){
  app.use(express.static(path.join(__dirname, "/client/dist")));

  app.get("*", (req, res)=>{
    res.sendFile(path.resolve(__dirname, "client", "dist", "indext.html"));
  });
}
// Connect to MongoDB and start the server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ DB connected successfully");

    // Start the server after DB connection
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server is running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Database connection error:", error);
    process.exit(1); // Exit if DB connection fails
  });

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, Render!');
});

// API routes
app.use("/api", route);


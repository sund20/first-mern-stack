import 'dotenv/config'; // ✅ Loads .env automatically

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import route from './routes/user.Route.js';
import connectDB from './config/db.js';

connectDB(); // Connect to MongoDB

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 7000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("DB connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((error) => console.error("Database connection error:", error));

app.use("/api", route);
//import route from './routes/user.Route.js';


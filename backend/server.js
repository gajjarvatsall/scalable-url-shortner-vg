import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import urlRoutes from "./routes/url.routes.js";
import authRoutes from "./routes/auth.routes.js";
import cors from "cors";


dotenv.config();
const app = express();
app.use(express.json());

// Log BASE_URL for debugging
console.log("CORS BASE_URL:", process.env.BASE_URL);

// For development, allow all origins (remove or restrict in production)
app.use(cors({ origin: true, credentials: true }));


connectDB();

app.use("/api/url", urlRoutes);
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);


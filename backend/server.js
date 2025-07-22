import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import urlRoutes from "./routes/url.routes.js";
import authRoutes from "./routes/auth.routes.js";
import cors from "cors";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Connect to database
connectDB();

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "URL Shortener API is running" });
});

// Routes
app.use("/api/url", urlRoutes);
app.use("/api/auth", authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 2004;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(
    `📍 Frontend URL: ${process.env.FRONTEND_URL || "http://localhost:3000"}`
  );
});

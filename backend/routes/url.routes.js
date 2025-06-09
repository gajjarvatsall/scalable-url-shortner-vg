import express from "express";
import { shortenUrl, resolveUrl } from "../controllers/url.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/shorten", authMiddleware, shortenUrl);
router.get("/:shortId", resolveUrl);

export default router;

// User submits long URL → /shorten → Creates short URL
// Someone clicks short URL → /:shortId → Redirects to original URL
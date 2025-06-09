import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    shortId: { type: String, required: true, unique: true },
    originalUrl: { type: String, required: true },
    clickCount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date },
  },
  { timestamps: true }
);

export const URL = mongoose.model("URL", urlSchema);

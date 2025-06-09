import { URL } from "../models/url.model.js";
import { nanoid } from "nanoid";
import redis from "redis";

const redisClient = redis.createClient({ url: process.env.REDIS_URL });
await redisClient.connect();

export const shortenUrl = async (req, res) => {
  const { originalUrl } = req.body;
  const shortId = nanoid(6);
  const newUrl = await URL.create({ shortId, originalUrl });
  await redisClient.set(shortId, originalUrl);
  res.json({ shortUrl: `${process.env.BASE_URL}/api/url/${shortId}` });
};

export const resolveUrl = async (req, res) => {
  const { shortId } = req.params;

  let originalUrl = await redisClient.get(shortId);
  if (!originalUrl) {
    const url = await URL.findOne({ shortId });
    if (!url) return res.status(404).send("URL not found");
    originalUrl = url.originalUrl;
    await redisClient.set(shortId, originalUrl);
  }

  res.redirect(originalUrl);
};

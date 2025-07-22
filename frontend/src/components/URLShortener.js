import React, { useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";

const URLShortener = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!url.trim()) {
      toast.error("Please enter a URL");
      return;
    }

    if (!isValidUrl(url)) {
      toast.error("Please enter a valid URL");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/api/url", { originalUrl: url });
      setShortUrl(response.data.shortUrl);
      toast.success("URL shortened successfully!");
    } catch (error) {
      const message = error.response?.data?.message || "Failed to shorten URL";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy to clipboard");
    }
  };

  const handleReset = () => {
    setUrl("");
    setShortUrl("");
    setCopied(false);
  };

  return (
    <div className="url-shortener">
      <form onSubmit={handleSubmit} className="url-form">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter your long URL here..."
          className="url-input"
          disabled={loading}
        />
        <button type="submit" className="shorten-btn" disabled={loading}>
          {loading ? <span className="loading"></span> : "Shorten"}
        </button>
      </form>

      {shortUrl && (
        <div className="result">
          <div className="result-label">Your shortened URL:</div>
          <div className="result-content">
            <div className="result-url">{shortUrl}</div>
            <button
              onClick={copyToClipboard}
              className={`copy-btn ${copied ? "copied" : ""}`}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <button
            onClick={handleReset}
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1rem",
              background: "transparent",
              border: "1px solid var(--border-color)",
              borderRadius: "0.5rem",
              cursor: "pointer",
              fontSize: "0.875rem",
              color: "var(--text-secondary)",
            }}
          >
            Shorten Another URL
          </button>
        </div>
      )}
    </div>
  );
};

export default URLShortener;

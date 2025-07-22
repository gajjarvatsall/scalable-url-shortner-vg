import React from "react";
import URLShortener from "../components/URLShortener";

const Home = () => {
  return (
    <div className="container">
      <div className="hero">
        <h1>Shorten Your Links</h1>
        <p>
          Transform long, unwieldy URLs into short, shareable links in seconds.
          Fast, secure, and reliable URL shortening service.
        </p>

        <URLShortener />

        <div
          style={{
            marginTop: "3rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "2rem",
            textAlign: "left",
          }}
        >
          <div
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              padding: "1.5rem",
              borderRadius: "1rem",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>⚡</div>
            <h3 style={{ color: "white", marginBottom: "0.5rem" }}>
              Lightning Fast
            </h3>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.8)",
                fontSize: "0.875rem",
              }}
            >
              Generate short URLs instantly with our optimized system and Redis
              caching.
            </p>
          </div>

          <div
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              padding: "1.5rem",
              borderRadius: "1rem",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🔒</div>
            <h3 style={{ color: "white", marginBottom: "0.5rem" }}>
              Secure & Private
            </h3>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.8)",
                fontSize: "0.875rem",
              }}
            >
              Your URLs are protected with enterprise-grade security and
              encryption.
            </p>
          </div>

          <div
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              padding: "1.5rem",
              borderRadius: "1rem",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>📊</div>
            <h3 style={{ color: "white", marginBottom: "0.5rem" }}>
              Reliable Service
            </h3>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.8)",
                fontSize: "0.875rem",
              }}
            >
              99.9% uptime with scalable infrastructure built for performance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

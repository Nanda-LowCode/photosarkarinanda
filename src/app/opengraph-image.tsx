import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#1e3a8a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          padding: "60px",
        }}
      >
        {/* Top badge */}
        <div
          style={{
            background: "#f59e0b",
            color: "white",
            fontSize: 20,
            fontWeight: 700,
            padding: "6px 20px",
            borderRadius: 20,
            letterSpacing: 1,
            marginBottom: 28,
            textTransform: "uppercase",
          }}
        >
          Made in India 🇮🇳
        </div>

        {/* Site name */}
        <div
          style={{
            fontSize: 88,
            fontWeight: 800,
            color: "white",
            letterSpacing: -2,
            lineHeight: 1,
          }}
        >
          PhotoSarkari
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 34,
            color: "#93c5fd",
            marginTop: 20,
            fontWeight: 400,
          }}
        >
          Free Indian ID Photo Resizer
        </div>

        {/* Supported IDs */}
        <div
          style={{
            display: "flex",
            gap: 12,
            marginTop: 36,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {["Aadhaar", "PAN Card", "Passport", "Voter ID", "SSC", "UPSC", "Railway"].map(
            (label) => (
              <div
                key={label}
                style={{
                  background: "rgba(255,255,255,0.12)",
                  color: "#e0f2fe",
                  fontSize: 22,
                  padding: "8px 18px",
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                {label}
              </div>
            )
          )}
        </div>

        {/* Footer strip */}
        <div
          style={{
            display: "flex",
            gap: 32,
            marginTop: 48,
            color: "#bfdbfe",
            fontSize: 20,
          }}
        >
          <span>✓ 100% Free</span>
          <span>✓ No Upload</span>
          <span>✓ Works Offline</span>
          <span>✓ AI Background Removal</span>
        </div>
      </div>
    ),
    { ...size }
  );
}

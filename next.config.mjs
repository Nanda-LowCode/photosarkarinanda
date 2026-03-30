/** @type {import('next').NextConfig} */
const nextConfig = {
  // Prevent Next.js from bundling these WASM/native packages server-side
  serverExternalPackages: ["@imgly/background-removal", "onnxruntime-web"],

  // Required for @imgly/background-removal: enables SharedArrayBuffer
  // (used by onnxruntime-web for WASM multi-threading)
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  webpack: (config, { isServer }) => {
    // face-api.js depends on `canvas` for Node.js — exclude it in browser builds
    if (!isServer) {
      config.resolve.fallback = { ...config.resolve.fallback, canvas: false, fs: false, encoding: false };
      // Enable async WebAssembly so onnxruntime-web can use import.meta.url
      config.experiments = { ...config.experiments, asyncWebAssembly: true };
    }
    return config;
  },
};

export default nextConfig;

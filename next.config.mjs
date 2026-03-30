/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Correct key for Next.js 14.2 — prevents bundling WASM packages server-side
    serverComponentsExternalPackages: ["@imgly/background-removal", "onnxruntime-web"],
  },

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
      config.resolve.fallback = {
        ...config.resolve.fallback,
        canvas: false,
        fs: false,
        encoding: false,
      };
      config.experiments = { ...config.experiments, asyncWebAssembly: true };
    }

    // onnxruntime-web ships .js files that use import.meta.url to locate WASM.
    // Webpack treats them as CommonJS (no import.meta allowed) by default.
    // Fix: mark as javascript/auto + explicitly enable importMeta parsing.
    config.module.rules.push({
      test: /\.js$/,
      include: /node_modules[/\\]onnxruntime-web/,
      type: "javascript/auto",
      parser: { importMeta: true },
      resolve: { fullySpecified: false },
    });

    return config;
  },
};

export default nextConfig;

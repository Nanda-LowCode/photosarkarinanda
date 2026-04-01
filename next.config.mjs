import { createRequire } from "module";
const require = createRequire(import.meta.url);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Prevents bundling WASM packages server-side (moved from experimental in Next.js 15)
  serverExternalPackages: ["@imgly/background-removal", "onnxruntime-web"],

  // Required for @imgly/background-removal: enables SharedArrayBuffer
  // (used by onnxruntime-web for WASM multi-threading)
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Embedder-Policy", value: "credentialless" },
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

      // onnxruntime-web .mjs files (e.g. ort.webgpu.bundle.min.mjs) contain
      // import.meta.url to locate WASM at runtime. Webpack correctly emits them
      // as ESM chunks, but Next.js's Terser minifier does not know to treat those
      // chunks as module code — so it throws on import.meta. Setting module:true
      // tells Terser the output is ESM and import.meta is valid.
      config.optimization.minimizer.forEach((plugin) => {
        if (plugin.constructor.name === "TerserPlugin") {
          plugin.options.terserOptions = {
            ...(plugin.options.terserOptions ?? {}),
            module: true,
          };
        }
      });
    }

    // onnxruntime-web's ort.bundle.min.mjs uses new URL("ort.bundle.min.mjs", import.meta.url)
    // to self-locate for pthread worker spawning. Webpack resolves this as a circular reference
    // (module exports ≠ URL string), so new URL(moduleObject) throws "e.replace is not a function".
    // Since @imgly always overrides ort.env.wasm.wasmPaths with CDN blob URLs, we patch the
    // self-referential new URL(...) to (void 0) so the broken code path is never reached.
    config.module.rules.push({
      test: /ort\.bundle\.min\.mjs$/,
      include: /node_modules[\\/]onnxruntime-web/,
      use: [
        {
          loader: require("path").resolve("./loaders/ort-patch-loader.js"),
        },
      ],
    });

    // Force ESM type so import.meta.url is available in onnxruntime-web / @imgly.
    config.module.rules.push({
      test: /\.(js|mjs)$/,
      include: /node_modules[\\/](onnxruntime-web|@imgly)/,
      type: "javascript/esm",
      resolve: { fullySpecified: false },
    });

    return config;
  },
};

export default nextConfig;

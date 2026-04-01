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

    // onnxruntime-web ships .js files that also use import.meta.url.
    // They have no top-level import/export so webpack auto-detects them as
    // CommonJS where import.meta is forbidden. Force javascript/esm so webpack
    // transforms import.meta.url into a proper runtime chunk URL.
    // parser.javascript.url:false stops webpack from intercepting new URL("resources.json", ...)
    // calls inside @imgly and replacing string args with chunk objects (causing e.replace errors).
    config.module.rules.push({
      test: /\.(js|mjs)$/,
      include: /node_modules[/\\](onnxruntime-web|@imgly)/,
      type: "javascript/esm",
      resolve: { fullySpecified: false },
      parser: { javascript: { url: false } },
    });

    return config;
  },
};

export default nextConfig;

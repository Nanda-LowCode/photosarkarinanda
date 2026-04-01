/**
 * Webpack loader that patches onnxruntime-web's ort.bundle.min.mjs.
 *
 * The bundle uses:
 *   new URL("ort.bundle.min.mjs", import.meta.url)
 * to self-locate for pthread worker spawning. Webpack resolves this as a
 * circular asset reference (module 4932 → itself), then passes the module
 * exports object to new URL(), causing "e.replace is not a function".
 *
 * Since @imgly/background-removal always overrides ort.env.wasm.wasmPaths
 * with CDN blob URLs anyway, we replace the broken self-location with a
 * safe no-op that returns undefined (which makes Ve falsy, so Cs() is never
 * called with a broken value).
 */
module.exports = function ortPatchLoader(source) {
  // Patch: replace the unsafe self-referential URL construction.
  // Original: new URL("ort.bundle.min.mjs",import.meta.url)
  // Replacement: (void 0) — evaluates to undefined, making Ve=undefined
  // so the pathname computation is skipped, and wasmPaths from @imgly takes over.
  // Replace the broken self-referential URL with globalThis.location.
  // - Avoids "e.replace is not a function" (no module object passed to new URL)
  // - Avoids "Cannot read properties of undefined (reading 'href')" (location has .href)
  // - Safe because @imgly always overrides ort.env.wasm.wasmPaths with CDN URLs,
  //   so the self-URL is never actually used for WASM path resolution.
  const patched = source
    .replace(
      /new URL\("ort\.bundle\.min\.mjs",import\.meta\.url\)/g,
      '(globalThis.location||{href:""})'
    )
    .replace(
      /new URL\('ort\.bundle\.min\.mjs',import\.meta\.url\)/g,
      '(globalThis.location||{href:""})'
    );

  return patched;
};

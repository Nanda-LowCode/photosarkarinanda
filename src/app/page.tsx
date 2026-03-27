import DocumentCard from "@/components/DocumentCard";
import { presets } from "@/lib/presets";

export default function Home() {
  const photoPresets = presets.filter((p) => p.category === "photo");
  const signaturePresets = presets.filter((p) => p.category === "signature");

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-800 text-white py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold tracking-tight">PhotoSarkari</h1>
          <p className="mt-2 text-blue-200 text-base">
            Free Indian ID Photo Tool &nbsp;·&nbsp;{" "}
            <span className="font-devanagari">मुफ्त • सुरक्षित • तेज़</span>
          </p>
          <p className="mt-3 text-sm text-blue-300 max-w-xl mx-auto">
            Resize photos to exact government specifications for Aadhaar, PAN
            Card, Passport, Voter ID, and exam forms — free, instant, no upload.
          </p>
        </div>
      </header>

      {/* Trust bar */}
      <div className="bg-blue-900 text-blue-100 py-2 px-4">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-x-6 gap-y-1 text-xs text-center">
          <span>✓ 100% Free</span>
          <span>✓ No Upload to Server</span>
          <span>✓ Works Offline</span>
          <span>✓ Made in India 🇮🇳</span>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        {/* Photo section */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-blue-800 rounded-full inline-block"></span>
            ID Card & Exam Photos
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {photoPresets.map((preset) => (
              <DocumentCard key={preset.slug} preset={preset} />
            ))}
          </div>
        </section>

        {/* Signature section */}
        <section>
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-amber-500 rounded-full inline-block"></span>
            Signature Crops
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {signaturePresets.map((preset) => (
              <DocumentCard key={preset.slug} preset={preset} />
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="mt-12 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-base font-bold text-gray-800 mb-4">
            How It Works
          </h2>
          <ol className="space-y-3">
            {[
              "Select the document type above",
              "Upload or drag your photo",
              "Adjust the crop area by dragging",
              "Click Process & Download — done!",
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-800 text-white text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
          <p className="mt-4 text-xs text-gray-400">
            All processing happens in your browser — your photos are never
            uploaded to any server.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 px-4 text-center">
        <p className="text-sm text-gray-500">
          100% Free &nbsp;•&nbsp; No Upload to Server &nbsp;•&nbsp; Works
          Offline &nbsp;•&nbsp; Made in India 🇮🇳
        </p>
        <p className="text-xs text-gray-400 mt-1">
          PhotoSarkari — Your trusted free tool for Indian government photo
          requirements
        </p>
      </footer>
    </div>
  );
}

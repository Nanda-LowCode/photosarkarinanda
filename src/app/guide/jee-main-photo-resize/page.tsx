import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import PhotoProcessor from "@/components/PhotoProcessor";
import { getPresetBySlug } from "@/lib/presets";

export const metadata: Metadata = {
  title: "JEE Main Photo Size 2026 — Exact Specs & Free Resize Tool | PhotoSarkari",
  description:
    "JEE Main photo size is 200×230 pixels, max 200KB, JPEG with white background. Free tool to resize and compress your JEE Main NTA photo instantly.",
  alternates: { canonical: "https://photosarkari.vercel.app/guide/jee-main-photo-resize" },
  openGraph: {
    title: "JEE Main Photo Size 2026 — Exact Specs & Free Resize Tool",
    description: "JEE Main photo size is 200×230 pixels, max 200KB, JPEG. Free tool to resize and compress instantly.",
    url: "https://photosarkari.vercel.app/guide/jee-main-photo-resize",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "JEE Main Photo Size 2026 — Exact Specs & Free Resize Tool",
    description: "JEE Main photo is 200×230 px, max 200KB JPEG. Free instant resize tool.",
  },
};

const jeePreset = getPresetBySlug("jee-main");

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the JEE Main photo size in pixels?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The JEE Main photo must be 200 x 230 pixels (Width x Height), in JPEG format, with a file size between 10KB and 200KB.",
      },
    },
    {
      "@type": "Question",
      name: "What is the JEE Main signature size?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The JEE Main signature must be 200 x 80 pixels, in JPEG format, with a file size between 4KB and 30KB.",
      },
    },
    {
      "@type": "Question",
      name: "What background is required for JEE Main photo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A plain white background is mandatory for the JEE Main passport-size photograph. Coloured, patterned or studio-gradient backgrounds are rejected.",
      },
    },
    {
      "@type": "Question",
      name: "Can I wear spectacles in the JEE Main photo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "NTA recommends removing spectacles for JEE Main photographs. If medical necessity requires them, ensure there is no glare or tint. Sunglasses are strictly prohibited.",
      },
    },
    {
      "@type": "Question",
      name: "Will the same photo work for both JEE Main and JEE Advanced?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, the photo specifications for JEE Main and JEE Advanced are identical (200×230 px, max 200KB, white background, JPEG). You can use the same processed photo for both applications.",
      },
    },
  ],
};

export default function JeeMainGuidePage() {
  if (!jeePreset) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <header className="bg-blue-800 text-white py-5 px-4 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center">
          <Link href="/" className="text-blue-200 hover:text-white flex items-center gap-2 transition-colors font-semibold">
            ← Back to PhotoSarkari
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 flex flex-col gap-10">

        <section className="text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            JEE Main Photo Size Requirements 2026
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Filling your JEE Main application? Get your photo resized to exact NTA specifications
            in seconds — free, private, no upload to any server.
          </p>
        </section>

        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-center">
            <h2 className="text-xl font-bold text-white">Free JEE Main Photo Resizer Tool</h2>
            <p className="text-blue-100 text-sm mt-1">Upload any photo — auto-resized to 200×230 px and compressed under 200KB.</p>
          </div>
          <div className="p-4 md:p-8 bg-gray-50/50">
            <PhotoProcessor preset={jeePreset} />
          </div>
        </section>

        <article className="prose prose-blue prose-lg max-w-none bg-white p-8 rounded-2xl shadow-sm border border-gray-200">

          <h2>JEE Main Photo Requirements 2026</h2>
          <p>
            The National Testing Agency (NTA) specifies exact photo and signature dimensions for the JEE Main online registration form. An incorrect photo is a common reason for form rejection — fix it in one click with the tool above.
          </p>

          <div className="not-prose bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg my-8">
            <h3 className="text-lg font-bold text-blue-900 mb-4">JEE Main Photo Quick Specs</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <li className="flex items-center gap-2"><span className="text-blue-600">✓</span> <strong>Dimensions:</strong> 3.5 cm × 4.5 cm</li>
              <li className="flex items-center gap-2"><span className="text-blue-600">✓</span> <strong>Pixels:</strong> 200 × 230 px</li>
              <li className="flex items-center gap-2"><span className="text-blue-600">✓</span> <strong>File Size:</strong> 10KB – 200KB</li>
              <li className="flex items-center gap-2"><span className="text-blue-600">✓</span> <strong>Background:</strong> Plain White</li>
              <li className="flex items-center gap-2"><span className="text-blue-600">✓</span> <strong>Format:</strong> JPEG / JPG</li>
              <li className="flex items-center gap-2"><span className="text-blue-600">✓</span> <strong>Recent:</strong> Within 6 months</li>
            </ul>
          </div>

          <div className="not-prose bg-purple-50 border-l-4 border-purple-600 p-6 rounded-r-lg my-8">
            <h3 className="text-lg font-bold text-purple-900 mb-4">JEE Main Signature Specs</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <li className="flex items-center gap-2"><span className="text-purple-600">✓</span> <strong>Pixels:</strong> 200 × 80 px</li>
              <li className="flex items-center gap-2"><span className="text-purple-600">✓</span> <strong>File Size:</strong> 4KB – 30KB</li>
              <li className="flex items-center gap-2"><span className="text-purple-600">✓</span> <strong>Background:</strong> Plain White</li>
              <li className="flex items-center gap-2"><span className="text-purple-600">✓</span> <strong>Format:</strong> JPEG / JPG</li>
            </ul>
          </div>

          <h2>Common JEE Main Photo Rejection Reasons</h2>
          <ul>
            <li><strong>File size out of range:</strong> Must be between 10KB and 200KB. Camera files are typically 2–5 MB — way too large.</li>
            <li><strong>Coloured background:</strong> The NTA portal rejects any non-white background. Our AI removes it automatically.</li>
            <li><strong>Wrong aspect ratio:</strong> The portal strictly validates 200×230 px. A standard passport photo is a different size.</li>
            <li><strong>Sunglasses or tinted lenses:</strong> Strictly prohibited. Clear, prescription glasses may be worn but no glare allowed.</li>
            <li><strong>Caps or hats:</strong> Not permitted unless for religious reasons, in which case the full face must be visible.</li>
          </ul>

          <h2>JEE Main vs Other Exam Photo Sizes</h2>
          <div className="overflow-x-auto not-prose my-6">
            <table className="min-w-full border-collapse border border-gray-200 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-3 text-left font-semibold text-gray-700">Exam</th>
                  <th className="border p-3 text-left font-semibold text-gray-700">Photo Size</th>
                  <th className="border p-3 text-left font-semibold text-gray-700">Max File Size</th>
                  <th className="border p-3 text-left font-semibold text-gray-700">Background</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-blue-50">
                  <td className="border p-3 font-medium">JEE Main</td>
                  <td className="border p-3">200 × 230 px</td>
                  <td className="border p-3">200 KB</td>
                  <td className="border p-3">White</td>
                </tr>
                <tr>
                  <td className="border p-3 font-medium"><Link href="/guide/neet-photo-resize" className="text-blue-600 hover:underline">NEET UG</Link></td>
                  <td className="border p-3">200 × 230 px</td>
                  <td className="border p-3">200 KB</td>
                  <td className="border p-3">White</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border p-3 font-medium"><Link href="/guide/ssc-photo-resize" className="text-blue-600 hover:underline">SSC Exams</Link></td>
                  <td className="border p-3">200 × 230 px</td>
                  <td className="border p-3">50 KB</td>
                  <td className="border p-3">White</td>
                </tr>
                <tr>
                  <td className="border p-3 font-medium"><Link href="/guide/ibps-bank-photo-resize" className="text-blue-600 hover:underline">IBPS / Bank</Link></td>
                  <td className="border p-3">200 × 230 px</td>
                  <td className="border p-3">100 KB</td>
                  <td className="border p-3">White</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Frequently Asked Questions</h2>
          <div className="space-y-4 not-prose">
            {faqSchema.mainEntity.map((faq, idx) => (
              <details key={idx} className="group border border-gray-200 rounded-lg bg-gray-50 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-4 text-gray-900 font-medium">
                  {faq.name}
                  <span className="shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3 group-open:-rotate-180 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </summary>
                <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg text-gray-700">
                  {faq.acceptedAnswer.text}
                </div>
              </details>
            ))}
          </div>
        </article>

        <section className="bg-amber-50 border border-amber-200 p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-bold text-amber-900 mb-3">JEE Main फोटो साइज (JEE Main Photo Size in Hindi)</h2>
          <p className="text-amber-800 leading-relaxed text-sm md:text-base">
            JEE Main आवेदन फॉर्म के लिए फोटो 200×230 पिक्सल, 10KB से 200KB के बीच और JPEG फॉर्मेट में होनी चाहिए।
            सिग्नेचर 200×80 पिक्सल और 30 KB से कम होना चाहिए। बैकग्राउंड सफेद होना अनिवार्य है।
            ऊपर दिए गए <strong>मुफ्त टूल</strong> से अपनी फोटो तुरंत सही साइज में बनाएं।
          </p>
        </section>
      </main>

      <footer className="bg-gray-900 text-gray-400 py-12 px-4 mt-8">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider">PhotoSarkari</h4>
            <p>100% Client-side. Fast, private, zero-upload tool for Indian standard document photo sizing.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider">Top Guides</h4>
            <ul className="space-y-2">
              <li><Link href="/guide/jee-main-photo-resize" className="hover:text-white transition-colors">JEE Main Photo Size</Link></li>
              <li><Link href="/guide/neet-photo-resize" className="hover:text-white transition-colors">NEET Photo Size</Link></li>
              <li><Link href="/guide/ssc-photo-resize" className="hover:text-white transition-colors">SSC Photo Resize</Link></li>
              <li><Link href="/guide/passport-photo-size-india" className="hover:text-white transition-colors">Passport Photo Size</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider">Tools</h4>
            <ul className="space-y-2">
              <li><Link href="/tool/jee-main" className="hover:text-white transition-colors">JEE Main Photo Resizer</Link></li>
              <li><Link href="/tool/neet" className="hover:text-white transition-colors">NEET Photo Resizer</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">All Tools</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

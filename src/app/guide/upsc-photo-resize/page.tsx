import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import PhotoProcessor from "@/components/PhotoProcessor";
import { getPresetBySlug } from "@/lib/presets";

export const metadata: Metadata = {
  title: "UPSC Photo Size 2026 — Civil Services Exam Specs & Free Resize | PhotoSarkari",
  description:
    "UPSC Civil Services (IAS/IPS) photo size is 200×230 pixels, max 40KB, JPEG with white background. Free tool to resize and compress your UPSC photo instantly.",
  alternates: { canonical: "https://photosarkari.vercel.app/guide/upsc-photo-resize" },
  openGraph: {
    title: "UPSC Photo Size 2026 — Civil Services Exam Specs & Free Resize",
    description: "UPSC Civil Services photo is 200×230 px, max 40KB JPEG. Free instant resize tool.",
    url: "https://photosarkari.vercel.app/guide/upsc-photo-resize",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "UPSC Photo Size 2026 — Civil Services Exam Specs & Free Resize",
    description: "UPSC Civil Services photo is 200×230 px, max 40KB JPEG. Free instant resize tool.",
  },
};

const upscPreset = getPresetBySlug("upsc");

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the UPSC photo size in pixels?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The UPSC Civil Services photo must be 200 x 230 pixels (Width x Height), in JPEG format, with a maximum file size of 40KB and minimum of 3KB.",
      },
    },
    {
      "@type": "Question",
      name: "What is the UPSC signature size?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The UPSC signature must be 200 x 80 pixels, in JPEG format, with a file size between 1KB and 12KB.",
      },
    },
    {
      "@type": "Question",
      name: "What background is required for UPSC photo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A plain white background is mandatory for all UPSC examination photographs. No coloured, patterned or gradient backgrounds are accepted.",
      },
    },
    {
      "@type": "Question",
      name: "Does the same photo spec apply to UPSC Prelims and Mains?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The UPSC photo specifications (200×230 px, max 40KB, white background, JPEG) apply for both the Preliminary and Main examination online applications.",
      },
    },
    {
      "@type": "Question",
      name: "What other UPSC exams use the same photo spec?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The same specifications apply to UPSC CDS (Combined Defence Services), CAPF, NDA, SCRA, and other UPSC recruitment examinations.",
      },
    },
  ],
};

export default function UpscGuidePage() {
  if (!upscPreset) return null;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--cream)" }}>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <header className="hero-pattern relative" style={{ background: "linear-gradient(170deg, var(--navy) 0%, var(--navy-mid) 100%)" }}><div className="saffron-line absolute bottom-0 left-0 right-0" />
        <div className="max-w-4xl mx-auto flex items-center">
          <Link href="/" className="text-sm flex items-center gap-2 transition-colors font-medium py-4" style={{ color: "rgba(255,255,255,0.5)" }}>
            ← Back to PhotoSarkari
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 flex flex-col gap-10">

        <section className="text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
            UPSC Exam Photo Size Requirements 2026
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Applying for UPSC Civil Services (IAS/IPS), CDS, or CAPF? Get your photo resized
            to exact specifications in seconds — free and private.
          </p>
        </section>

        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-rose-600 to-red-700 p-4 text-center">
            <h2 className="text-xl font-bold text-white">Free UPSC Photo Resizer Tool</h2>
            <p className="text-rose-100 text-sm mt-1">Upload any photo — auto-resized to 200×230 px and compressed under 40KB.</p>
          </div>
          <div className="p-4 md:p-8 bg-gray-50/50">
            <PhotoProcessor preset={upscPreset} />
          </div>
        </section>

        <article className="prose prose-lg max-w-none p-8 rounded-[var(--radius)]" style={{ background: "var(--surface)", boxShadow: "var(--shadow-card)", border: "1px solid var(--border)" }}>

          <h2>UPSC Photo Requirements 2026</h2>
          <p>
            The Union Public Service Commission (UPSC) requires a specific digital photograph for all its online applications, including the Civil Services Examination (CSE), CDS, NDA, CAPF, and others. The UPSC portal has strict file size limits — particularly the very low 40KB maximum — which is why most applicants need a dedicated tool to compress their photo correctly.
          </p>

          <div className="not-prose bg-rose-50 border-l-4 border-rose-600 p-6 rounded-r-lg my-8">
            <h3 className="text-lg font-bold text-rose-900 mb-4">UPSC Photo Quick Specs</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <li className="flex items-center gap-2"><span className="text-rose-600">✓</span> <strong>Dimensions:</strong> 25 mm × 29 mm</li>
              <li className="flex items-center gap-2"><span className="text-rose-600">✓</span> <strong>Pixels:</strong> 200 × 230 px</li>
              <li className="flex items-center gap-2"><span className="text-rose-600">✓</span> <strong>File Size:</strong> 3KB – 40KB</li>
              <li className="flex items-center gap-2"><span className="text-rose-600">✓</span> <strong>Background:</strong> Plain White</li>
              <li className="flex items-center gap-2"><span className="text-rose-600">✓</span> <strong>Format:</strong> JPEG / JPG</li>
              <li className="flex items-center gap-2"><span className="text-rose-600">✓</span> <strong>Recent:</strong> Within 6 months</li>
            </ul>
          </div>

          <div className="not-prose bg-purple-50 border-l-4 border-purple-600 p-6 rounded-r-lg my-8">
            <h3 className="text-lg font-bold text-purple-900 mb-4">UPSC Signature Specs</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <li className="flex items-center gap-2"><span className="text-purple-600">✓</span> <strong>Pixels:</strong> 200 × 80 px</li>
              <li className="flex items-center gap-2"><span className="text-purple-600">✓</span> <strong>File Size:</strong> 1KB – 12KB</li>
              <li className="flex items-center gap-2"><span className="text-purple-600">✓</span> <strong>Background:</strong> Plain White</li>
              <li className="flex items-center gap-2"><span className="text-purple-600">✓</span> <strong>Format:</strong> JPEG / JPG</li>
            </ul>
          </div>

          <h2>Common UPSC Photo Rejection Reasons</h2>
          <ul>
            <li><strong>File size above 40KB:</strong> This is the strictest limit of any major Indian exam. A standard passport photo is way above this. Our tool compresses to the exact target.</li>
            <li><strong>Coloured or studio background:</strong> Only plain white is accepted. Our AI removes any background automatically.</li>
            <li><strong>Sunglasses or tinted lenses:</strong> Not permitted. Both eyes must be clearly visible.</li>
            <li><strong>Photo not recent:</strong> UPSC recommends a photo taken within the last 6 months.</li>
            <li><strong>File minimum not met:</strong> The file must be at least 3KB — a heavily compressed file can fall below this.</li>
          </ul>

          <h2>UPSC vs Other Exam Photo Sizes</h2>
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
                <tr className="bg-rose-50">
                  <td className="border p-3 font-medium">UPSC CSE / CDS / CAPF</td>
                  <td className="border p-3">200 × 230 px</td>
                  <td className="border p-3">40 KB</td>
                  <td className="border p-3">White</td>
                </tr>
                <tr>
                  <td className="border p-3 font-medium"><Link href="/guide/ssc-photo-resize" className="text-blue-600 hover:underline">SSC Exams</Link></td>
                  <td className="border p-3">200 × 230 px</td>
                  <td className="border p-3">50 KB</td>
                  <td className="border p-3">White</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border p-3 font-medium"><Link href="/guide/ibps-bank-photo-resize" className="text-blue-600 hover:underline">IBPS / Bank</Link></td>
                  <td className="border p-3">200 × 230 px</td>
                  <td className="border p-3">100 KB</td>
                  <td className="border p-3">White</td>
                </tr>
                <tr>
                  <td className="border p-3 font-medium"><Link href="/guide/neet-photo-resize" className="text-blue-600 hover:underline">NEET / JEE</Link></td>
                  <td className="border p-3">200 × 230 px</td>
                  <td className="border p-3">200 KB</td>
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
          <h2 className="text-xl font-bold text-amber-900 mb-3">UPSC फोटो साइज (UPSC Photo Size in Hindi)</h2>
          <p className="text-amber-800 leading-relaxed text-sm md:text-base">
            UPSC सिविल सेवा परीक्षा (IAS/IPS) आवेदन के लिए फोटो 200×230 पिक्सल, 3KB से 40KB के बीच और JPEG फॉर्मेट में होनी चाहिए।
            सिग्नेचर 200×80 पिक्सल और 12 KB से कम होना चाहिए। बैकग्राउंड सफेद होना अनिवार्य है।
            ऊपर दिए गए <strong>मुफ्त टूल</strong> से अपनी फोटो तुरंत सही साइज में बनाएं।
          </p>
        </section>
      </main>

      <footer className="py-10 px-4 mt-8" style={{ background: "var(--navy)", color: "rgba(255,255,255,0.45)" }}>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div>
            <h4 className="font-bold mb-4 uppercase tracking-wider text-sm" style={{ color: "var(--saffron-light)" }}>PhotoSarkari</h4>
            <p>100% Client-side. Fast, private, zero-upload tool for Indian standard document photo sizing.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase tracking-wider text-sm" style={{ color: "var(--saffron-light)" }}>Top Guides</h4>
            <ul className="space-y-2">
              <li><Link href="/guide/upsc-photo-resize" className="transition-colors" style={{ color: "rgba(255,255,255,0.45)" }}>UPSC Photo Size</Link></li>
              <li><Link href="/guide/ssc-photo-resize" className="transition-colors" style={{ color: "rgba(255,255,255,0.45)" }}>SSC Photo Size</Link></li>
              <li><Link href="/guide/ibps-bank-photo-resize" className="transition-colors" style={{ color: "rgba(255,255,255,0.45)" }}>IBPS Bank Photo Size</Link></li>
              <li><Link href="/guide/passport-photo-size-india" className="transition-colors" style={{ color: "rgba(255,255,255,0.45)" }}>Passport Photo Size</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase tracking-wider text-sm" style={{ color: "var(--saffron-light)" }}>Tools</h4>
            <ul className="space-y-2">
              <li><Link href="/tool/upsc" className="transition-colors" style={{ color: "rgba(255,255,255,0.45)" }}>UPSC Photo Resizer</Link></li>
              <li><Link href="/tool/upsc-signature" className="transition-colors" style={{ color: "rgba(255,255,255,0.45)" }}>UPSC Signature Resizer</Link></li>
              <li><Link href="/" className="transition-colors" style={{ color: "rgba(255,255,255,0.45)" }}>All Tools</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

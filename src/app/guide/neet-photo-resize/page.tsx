import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import PhotoProcessor from "@/components/PhotoProcessor";
import { getPresetBySlug } from "@/lib/presets";

export const metadata: Metadata = {
  title: "NEET Photo Size 2026 — Exact Specs & Free Resize Tool | PhotoSarkari",
  description:
    "NEET UG photo size is 200×230 pixels, max 200KB, JPEG. Signature is 200×80 px, max 30KB. Free tool to resize and compress your NEET NTA photo instantly.",
  alternates: { canonical: "https://photosarkari.vercel.app/guide/neet-photo-resize" },
  openGraph: {
    title: "NEET Photo Size 2026 — Exact Specs & Free Resize Tool",
    description: "NEET UG photo size is 200×230 pixels, max 200KB, JPEG. Free tool to resize and compress instantly.",
    url: "https://photosarkari.vercel.app/guide/neet-photo-resize",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "NEET Photo Size 2026 — Exact Specs & Free Resize Tool",
    description: "NEET photo is 200×230 px, max 200KB JPEG. Free instant resize tool.",
  },
};

const neetPreset = getPresetBySlug("neet");

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the NEET photo size in pixels?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The NEET UG photo size is 200 x 230 pixels (Width x Height), in JPEG format, with a maximum file size of 200KB and minimum of 10KB.",
      },
    },
    {
      "@type": "Question",
      name: "What is the NEET signature size?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The NEET signature must be 200 x 80 pixels (landscape), in JPEG format, between 4KB and 30KB file size.",
      },
    },
    {
      "@type": "Question",
      name: "What background colour is required for NEET photo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The NEET NTA requires a plain white background for the passport-size photograph. No patterns, shadows or coloured backgrounds are allowed.",
      },
    },
    {
      "@type": "Question",
      name: "Can I wear spectacles in my NEET photo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. NTA strictly prohibits spectacles in the NEET UG photograph. The face must be clearly visible without any eyewear.",
      },
    },
    {
      "@type": "Question",
      name: "How recent should the NEET photo be?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The photograph must be taken recently — within the last 6 months. An outdated photo may lead to rejection of your application.",
      },
    },
  ],
};

export default function NeetGuidePage() {
  if (!neetPreset) return null;

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
            NEET Photo Size Requirements 2026
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don&apos;t let a wrong photo size hold back your NEET UG application. Use our free tool
            to resize your photo to exact NTA specifications instantly.
          </p>
        </section>

        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 text-center" style={{ background: "linear-gradient(135deg, var(--navy) 0%, var(--navy-mid) 100%)" }}>
            <h2 className="text-xl font-bold text-white">Free NEET Photo Resizer Tool</h2>
            <p className="text-green-100 text-sm mt-1">Upload any photo — auto-resized to 200×230 px and compressed under 200KB.</p>
          </div>
          <div className="p-4 md:p-8 bg-gray-50/50">
            <PhotoProcessor preset={neetPreset} />
          </div>
        </section>

        <article className="prose prose-lg max-w-none p-8 rounded-[var(--radius)]" style={{ background: "var(--surface)", boxShadow: "var(--shadow-card)", border: "1px solid var(--border)" }}>

          <h2>NEET UG Photo Requirements 2026</h2>
          <p>
            The National Testing Agency (NTA) has strict photo and signature specifications for the NEET UG online application form. Uploading the wrong size or format is one of the most common reasons for application rejection — and it can be prevented in seconds using the tool above.
          </p>

          <div className="not-prose bg-green-50 border-l-4 border-green-600 p-6 rounded-r-lg my-8">
            <h3 className="text-lg font-bold text-green-900 mb-4">NEET Photo Quick Specs</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <li className="flex items-center gap-2"><span className="text-green-600">✓</span> <strong>Dimensions:</strong> 3.5 cm × 4.5 cm</li>
              <li className="flex items-center gap-2"><span className="text-green-600">✓</span> <strong>Pixels:</strong> 200 × 230 px</li>
              <li className="flex items-center gap-2"><span className="text-green-600">✓</span> <strong>File Size:</strong> 10KB – 200KB</li>
              <li className="flex items-center gap-2"><span className="text-green-600">✓</span> <strong>Background:</strong> Plain White</li>
              <li className="flex items-center gap-2"><span className="text-green-600">✓</span> <strong>Format:</strong> JPEG / JPG</li>
              <li className="flex items-center gap-2"><span className="text-green-600">✓</span> <strong>No Spectacles</strong></li>
            </ul>
          </div>

          <div className="not-prose bg-purple-50 border-l-4 border-purple-600 p-6 rounded-r-lg my-8">
            <h3 className="text-lg font-bold text-purple-900 mb-4">NEET Signature Specs</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <li className="flex items-center gap-2"><span className="text-purple-600">✓</span> <strong>Pixels:</strong> 200 × 80 px</li>
              <li className="flex items-center gap-2"><span className="text-purple-600">✓</span> <strong>File Size:</strong> 4KB – 30KB</li>
              <li className="flex items-center gap-2"><span className="text-purple-600">✓</span> <strong>Background:</strong> Plain White</li>
              <li className="flex items-center gap-2"><span className="text-purple-600">✓</span> <strong>Format:</strong> JPEG / JPG</li>
            </ul>
          </div>

          <h2>Common NEET Photo Rejection Reasons</h2>
          <ul>
            <li><strong>Spectacles in photo:</strong> NTA strictly bans glasses. Remove them before taking your photo.</li>
            <li><strong>Coloured background:</strong> Only plain white is accepted. Our AI removes and replaces any background automatically.</li>
            <li><strong>File too large or too small:</strong> The photo must be between 10KB and 200KB. Our tool compresses to the exact target.</li>
            <li><strong>Wrong dimensions:</strong> The portal validates pixel dimensions. 200×230 px is mandatory.</li>
            <li><strong>Old photograph:</strong> NTA requires a recent photo (within 6 months). Use a recent click.</li>
          </ul>

          <h2>NEET vs Other Exam Photo Sizes</h2>
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
                <tr className="bg-green-50">
                  <td className="border p-3 font-medium">NEET UG</td>
                  <td className="border p-3">200 × 230 px</td>
                  <td className="border p-3">200 KB</td>
                  <td className="border p-3">White</td>
                </tr>
                <tr>
                  <td className="border p-3 font-medium"><Link href="/guide/jee-main-photo-resize" className="text-blue-600 hover:underline">JEE Main</Link></td>
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
          <h2 className="text-xl font-bold text-amber-900 mb-3">NEET फोटो साइज (NEET Photo Size in Hindi)</h2>
          <p className="text-amber-800 leading-relaxed text-sm md:text-base">
            NEET UG आवेदन फॉर्म के लिए फोटो 200×230 पिक्सल, अधिकतम 200 KB और JPEG फॉर्मेट में होनी चाहिए।
            सिग्नेचर 200×80 पिक्सल और 30 KB से कम होना चाहिए। फोटो में चश्मा नहीं होना चाहिए और बैकग्राउंड सफेद होना अनिवार्य है।
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
              <li><Link href="/guide/neet-photo-resize" className="transition-colors" style={{ color: "rgba(255,255,255,0.45)" }}>NEET Photo Size</Link></li>
              <li><Link href="/guide/jee-main-photo-resize" className="transition-colors" style={{ color: "rgba(255,255,255,0.45)" }}>JEE Main Photo Size</Link></li>
              <li><Link href="/guide/ssc-photo-resize" className="transition-colors" style={{ color: "rgba(255,255,255,0.45)" }}>SSC Photo Resize</Link></li>
              <li><Link href="/guide/passport-photo-size-india" className="transition-colors" style={{ color: "rgba(255,255,255,0.45)" }}>Passport Photo Size</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase tracking-wider text-sm" style={{ color: "var(--saffron-light)" }}>Tools</h4>
            <ul className="space-y-2">
              <li><Link href="/tool/neet" className="transition-colors" style={{ color: "rgba(255,255,255,0.45)" }}>NEET Photo Resizer</Link></li>
              <li><Link href="/tool/jee-main" className="transition-colors" style={{ color: "rgba(255,255,255,0.45)" }}>JEE Main Photo Resizer</Link></li>
              <li><Link href="/" className="transition-colors" style={{ color: "rgba(255,255,255,0.45)" }}>All Tools</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

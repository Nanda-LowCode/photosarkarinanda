import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import PhotoProcessor from "@/components/PhotoProcessor";
import { getPresetBySlug } from "@/lib/presets";

export const metadata: Metadata = {
  title: "Railway RRB Photo Size 2026 — NTPC, Group D, ALP Specs & Free Resize | PhotoSarkari",
  description:
    "Railway RRB exam photo size is 200×230 pixels, max 50KB, JPEG with white background. Free tool to resize and compress your Railway exam photo for RRB NTPC, Group D, ALP instantly.",
  alternates: { canonical: "https://photosarkarinanda.vercel.app/guide/railway-rrb-photo-resize" },
  openGraph: {
    title: "Railway RRB Photo Size 2026 — NTPC, Group D, ALP Specs & Free Resize",
    description: "Railway RRB photo is 200×230 px, max 50KB JPEG. Free instant resize tool for RRB NTPC, Group D, ALP.",
    url: "https://photosarkarinanda.vercel.app/guide/railway-rrb-photo-resize",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Railway RRB Photo Size 2026 — NTPC, Group D, ALP Specs & Free Resize",
    description: "Railway RRB photo is 200×230 px, max 50KB JPEG. Free instant resize tool.",
  },
};

const railwayPreset = getPresetBySlug("railway-exam");

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the Railway RRB photo size in pixels?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Railway RRB exam photo must be 200 x 230 pixels (Width x Height), in JPEG format, with a file size between 20KB and 50KB.",
      },
    },
    {
      "@type": "Question",
      name: "What is the RRB signature size?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The RRB signature image must be 200 x 80 pixels, in JPEG format, with a file size between 10KB and 40KB.",
      },
    },
    {
      "@type": "Question",
      name: "Does the same photo spec apply to RRB NTPC, Group D, and ALP?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All Railway Recruitment Board exams — RRB NTPC, Group D, ALP (Assistant Loco Pilot), JE (Junior Engineer), and RPF — use the same photo specification: 200×230 px, JPEG, white background, max 50KB.",
      },
    },
    {
      "@type": "Question",
      name: "What background is required for Railway RRB photo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A plain white background is mandatory for all Railway RRB online application photos. Coloured, gradient, or studio backgrounds are rejected by the portal.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if my RRB photo is rejected?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If your photo is rejected, you typically get a correction window to re-upload. However, this can delay your application and in some cases lead to disqualification. Use PhotoSarkari to get the photo right the first time.",
      },
    },
  ],
};

export default function RailwayRrbGuidePage() {
  if (!railwayPreset) return null;

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
            Railway RRB Photo Size Requirements 2026
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Applying for RRB NTPC, Group D, ALP, or JE? Get your photo resized to exact
            Railway Recruitment Board specifications in seconds — free and private.
          </p>
        </section>

        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-orange-600 to-amber-700 p-4 text-center">
            <h2 className="text-xl font-bold text-white">Free Railway RRB Photo Resizer Tool</h2>
            <p className="text-orange-100 text-sm mt-1">Upload any photo — auto-resized to 200×230 px and compressed under 50KB.</p>
          </div>
          <div className="p-4 md:p-8 bg-gray-50/50">
            <PhotoProcessor preset={railwayPreset} />
          </div>
        </section>

        <article className="prose prose-blue prose-lg max-w-none bg-white p-8 rounded-2xl shadow-sm border border-gray-200">

          <h2>Railway RRB Photo Requirements — All Exams</h2>
          <p>
            The Railway Recruitment Board (RRB) conducts some of India&apos;s largest recruitment drives — RRB NTPC, Group D, ALP (Assistant Loco Pilot), JE (Junior Engineer), and RPF Constable. All of them use the same photo and signature specification. Lakhs of applications are rejected each year due to incorrect photo sizes — avoid this easily with the tool above.
          </p>

          <div className="not-prose bg-orange-50 border-l-4 border-orange-600 p-6 rounded-r-lg my-8">
            <h3 className="text-lg font-bold text-orange-900 mb-4">RRB Photo Quick Specs</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <li className="flex items-center gap-2"><span className="text-orange-600">✓</span> <strong>Dimensions:</strong> 25 mm × 29 mm</li>
              <li className="flex items-center gap-2"><span className="text-orange-600">✓</span> <strong>Pixels:</strong> 200 × 230 px</li>
              <li className="flex items-center gap-2"><span className="text-orange-600">✓</span> <strong>File Size:</strong> 20KB – 50KB</li>
              <li className="flex items-center gap-2"><span className="text-orange-600">✓</span> <strong>Background:</strong> Plain White</li>
              <li className="flex items-center gap-2"><span className="text-orange-600">✓</span> <strong>Format:</strong> JPEG / JPG</li>
              <li className="flex items-center gap-2"><span className="text-orange-600">✓</span> <strong>Recent:</strong> Within 3 months</li>
            </ul>
          </div>

          <div className="not-prose bg-purple-50 border-l-4 border-purple-600 p-6 rounded-r-lg my-8">
            <h3 className="text-lg font-bold text-purple-900 mb-4">RRB Signature Specs</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <li className="flex items-center gap-2"><span className="text-purple-600">✓</span> <strong>Pixels:</strong> 200 × 80 px</li>
              <li className="flex items-center gap-2"><span className="text-purple-600">✓</span> <strong>File Size:</strong> 10KB – 40KB</li>
              <li className="flex items-center gap-2"><span className="text-purple-600">✓</span> <strong>Background:</strong> Plain White</li>
              <li className="flex items-center gap-2"><span className="text-purple-600">✓</span> <strong>Format:</strong> JPEG / JPG</li>
            </ul>
          </div>

          <h2>Railway Exam Photo Size Quick Reference</h2>
          <div className="overflow-x-auto not-prose my-6">
            <table className="min-w-full border-collapse border border-gray-200 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-3 text-left font-semibold text-gray-700">RRB Exam</th>
                  <th className="border p-3 text-left font-semibold text-gray-700">Photo Size</th>
                  <th className="border p-3 text-left font-semibold text-gray-700">Photo Max KB</th>
                  <th className="border p-3 text-left font-semibold text-gray-700">Background</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-orange-50"><td className="border p-3">RRB NTPC</td><td className="border p-3">200×230 px</td><td className="border p-3">50 KB</td><td className="border p-3">White</td></tr>
                <tr><td className="border p-3">RRB Group D</td><td className="border p-3">200×230 px</td><td className="border p-3">50 KB</td><td className="border p-3">White</td></tr>
                <tr className="bg-orange-50"><td className="border p-3">RRB ALP</td><td className="border p-3">200×230 px</td><td className="border p-3">50 KB</td><td className="border p-3">White</td></tr>
                <tr><td className="border p-3">RRB JE</td><td className="border p-3">200×230 px</td><td className="border p-3">50 KB</td><td className="border p-3">White</td></tr>
                <tr className="bg-orange-50"><td className="border p-3">RPF Constable</td><td className="border p-3">200×230 px</td><td className="border p-3">50 KB</td><td className="border p-3">White</td></tr>
              </tbody>
            </table>
          </div>

          <h2>Common RRB Photo Rejection Reasons</h2>
          <ul>
            <li><strong>File size too large:</strong> Camera photos are 2–5 MB — way above the 50KB limit. Our tool compresses automatically.</li>
            <li><strong>File size too small:</strong> Must be at least 20KB. Over-compressed photos are also rejected.</li>
            <li><strong>Coloured background:</strong> Only plain white. Our AI removes any background in one click.</li>
            <li><strong>Old photograph:</strong> RRB requires a photo taken within the last 3 months.</li>
            <li><strong>Sunglasses, cap, or covering:</strong> Face must be fully visible and unobstructed.</li>
          </ul>

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
          <h2 className="text-xl font-bold text-amber-900 mb-3">रेलवे RRB फोटो साइज (Railway Photo Size in Hindi)</h2>
          <p className="text-amber-800 leading-relaxed text-sm md:text-base">
            RRB NTPC, ग्रुप D, ALP परीक्षा फॉर्म के लिए फोटो 200×230 पिक्सल, 20KB से 50KB के बीच और JPEG फॉर्मेट में होनी चाहिए।
            सिग्नेचर 200×80 पिक्सल और 40 KB से कम होना चाहिए। बैकग्राउंड सफेद होना अनिवार्य है।
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
              <li><Link href="/guide/railway-rrb-photo-resize" className="hover:text-white transition-colors">Railway RRB Photo Size</Link></li>
              <li><Link href="/guide/ssc-photo-resize" className="hover:text-white transition-colors">SSC Photo Size</Link></li>
              <li><Link href="/guide/upsc-photo-resize" className="hover:text-white transition-colors">UPSC Photo Size</Link></li>
              <li><Link href="/guide/ibps-bank-photo-resize" className="hover:text-white transition-colors">IBPS Bank Photo Size</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider">Tools</h4>
            <ul className="space-y-2">
              <li><Link href="/tool/railway-exam" className="hover:text-white transition-colors">Railway Photo Resizer</Link></li>
              <li><Link href="/tool/ssc-exam" className="hover:text-white transition-colors">SSC Photo Resizer</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">All Tools</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

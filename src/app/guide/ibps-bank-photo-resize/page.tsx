import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import PhotoProcessor from "@/components/PhotoProcessor";
import { getPresetBySlug } from "@/lib/presets";

export const metadata: Metadata = {
  title: "IBPS & Bank Exam Photo Size 2026 — Exact Specs & Free Resize | PhotoSarkari",
  description:
    "IBPS PO, Clerk & Bank exam photo size is 200×230 pixels, max 100KB, JPEG. Free tool to resize and compress your bank exam photo instantly.",
  alternates: { canonical: "https://photosarkari.vercel.app/guide/ibps-bank-photo-resize" },
  openGraph: {
    title: "IBPS & Bank Exam Photo Size 2026 — Exact Specs & Free Resize",
    description: "IBPS PO, Clerk & Bank exam photo size is 200×230 pixels, max 100KB, JPEG. Free tool to resize instantly.",
    url: "https://photosarkari.vercel.app/guide/ibps-bank-photo-resize",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "IBPS & Bank Exam Photo Size 2026 — Exact Specs & Free Resize",
    description: "IBPS bank exam photo is 200×230 px, max 100KB JPEG. Free instant resize tool.",
  },
};

const ibpsPreset = getPresetBySlug("ibps-bank");

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the IBPS photo size in pixels?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The IBPS photo size is 200 x 230 pixels (Width x Height), in JPEG format, with a file size between 20KB and 100KB.",
      },
    },
    {
      "@type": "Question",
      name: "What is the IBPS signature size?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The IBPS signature must be 200 x 80 pixels, in JPEG format, with a file size between 10KB and 100KB.",
      },
    },
    {
      "@type": "Question",
      name: "Does the same photo spec apply to SBI, RBI, and other bank exams?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most bank exams follow similar specifications: 200×230 px photo, JPEG format, white background, max 100KB. Always verify on the specific bank's official notification before submitting.",
      },
    },
    {
      "@type": "Question",
      name: "What background is needed for IBPS photo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A plain white background is mandatory for the IBPS online application photo. Coloured backgrounds, gradients, or any patterns will result in rejection.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use a selfie for my IBPS application photo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "IBPS recommends against selfies as front-facing cameras can distort facial proportions. Have someone take your photo from a distance using the rear camera for best results.",
      },
    },
  ],
};

export default function IbpsBankGuidePage() {
  if (!ibpsPreset) return null;

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
            IBPS &amp; Bank Exam Photo Size Requirements 2026
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Applying for IBPS PO, Clerk, RRB, SO or any bank exam? Resize your photo
            to exact specifications in seconds — free, private, no server upload.
          </p>
        </section>

        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-sky-600 to-blue-700 p-4 text-center">
            <h2 className="text-xl font-bold text-white">Free IBPS / Bank Exam Photo Resizer</h2>
            <p className="text-sky-100 text-sm mt-1">Upload any photo — auto-resized to 200×230 px and compressed under 100KB.</p>
          </div>
          <div className="p-4 md:p-8 bg-gray-50/50">
            <PhotoProcessor preset={ibpsPreset} />
          </div>
        </section>

        <article className="prose prose-blue prose-lg max-w-none bg-white p-8 rounded-2xl shadow-sm border border-gray-200">

          <h2>IBPS Photo Requirements — All Exams</h2>
          <p>
            The Institute of Banking Personnel Selection (IBPS) conducts exams for PO, Clerk, RRB Officer, RRB Office Assistant, and SO posts. All these exams use the same photo and signature specification for the online application form. Getting the photo wrong can result in your form being rejected even after you&apos;ve paid the fee.
          </p>

          <div className="not-prose bg-sky-50 border-l-4 border-sky-600 p-6 rounded-r-lg my-8">
            <h3 className="text-lg font-bold text-sky-900 mb-4">IBPS Photo Quick Specs</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <li className="flex items-center gap-2"><span className="text-sky-600">✓</span> <strong>Dimensions:</strong> 25 mm × 29 mm</li>
              <li className="flex items-center gap-2"><span className="text-sky-600">✓</span> <strong>Pixels:</strong> 200 × 230 px</li>
              <li className="flex items-center gap-2"><span className="text-sky-600">✓</span> <strong>File Size:</strong> 20KB – 100KB</li>
              <li className="flex items-center gap-2"><span className="text-sky-600">✓</span> <strong>Background:</strong> Plain White</li>
              <li className="flex items-center gap-2"><span className="text-sky-600">✓</span> <strong>Format:</strong> JPEG / JPG</li>
              <li className="flex items-center gap-2"><span className="text-sky-600">✓</span> <strong>Recent:</strong> Within 3 months</li>
            </ul>
          </div>

          <div className="not-prose bg-purple-50 border-l-4 border-purple-600 p-6 rounded-r-lg my-8">
            <h3 className="text-lg font-bold text-purple-900 mb-4">IBPS Signature Specs</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <li className="flex items-center gap-2"><span className="text-purple-600">✓</span> <strong>Pixels:</strong> 200 × 80 px</li>
              <li className="flex items-center gap-2"><span className="text-purple-600">✓</span> <strong>File Size:</strong> 10KB – 100KB</li>
              <li className="flex items-center gap-2"><span className="text-purple-600">✓</span> <strong>Background:</strong> Plain White</li>
              <li className="flex items-center gap-2"><span className="text-purple-600">✓</span> <strong>Format:</strong> JPEG / JPG</li>
            </ul>
          </div>

          <h2>Bank Exam Photo Size Quick Reference</h2>
          <div className="overflow-x-auto not-prose my-6">
            <table className="min-w-full border-collapse border border-gray-200 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-3 text-left font-semibold text-gray-700">Exam</th>
                  <th className="border p-3 text-left font-semibold text-gray-700">Photo Size</th>
                  <th className="border p-3 text-left font-semibold text-gray-700">Photo Max KB</th>
                  <th className="border p-3 text-left font-semibold text-gray-700">Signature Size</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-sky-50">
                  <td className="border p-3 font-medium">IBPS PO</td>
                  <td className="border p-3">200×230 px</td>
                  <td className="border p-3">100 KB</td>
                  <td className="border p-3">200×80 px</td>
                </tr>
                <tr>
                  <td className="border p-3 font-medium">IBPS Clerk</td>
                  <td className="border p-3">200×230 px</td>
                  <td className="border p-3">100 KB</td>
                  <td className="border p-3">200×80 px</td>
                </tr>
                <tr className="bg-sky-50">
                  <td className="border p-3 font-medium">IBPS RRB</td>
                  <td className="border p-3">200×230 px</td>
                  <td className="border p-3">100 KB</td>
                  <td className="border p-3">200×80 px</td>
                </tr>
                <tr>
                  <td className="border p-3 font-medium">SBI PO / Clerk</td>
                  <td className="border p-3">200×230 px</td>
                  <td className="border p-3">100 KB</td>
                  <td className="border p-3">200×80 px</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Common IBPS Photo Rejection Reasons</h2>
          <ul>
            <li><strong>Photo too large or too small:</strong> Must be between 20KB and 100KB. Use our tool to hit the sweet spot automatically.</li>
            <li><strong>Coloured background:</strong> Only plain white. Our AI removes any background in one click.</li>
            <li><strong>Old photograph:</strong> IBPS requires a photo taken within the last 3 months.</li>
            <li><strong>Sunglasses or accessories:</strong> No sunglasses, caps, or anything obscuring the face.</li>
            <li><strong>Wrong format:</strong> Only JPEG accepted — not PNG, HEIC, or WebP.</li>
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
          <h2 className="text-xl font-bold text-amber-900 mb-3">IBPS फोटो साइज (IBPS Photo Size in Hindi)</h2>
          <p className="text-amber-800 leading-relaxed text-sm md:text-base">
            IBPS PO, Clerk, RRB परीक्षा फॉर्म के लिए फोटो 200×230 पिक्सल, 20KB से 100KB के बीच और JPEG फॉर्मेट में होनी चाहिए।
            सिग्नेचर 200×80 पिक्सल और 100 KB से कम होना चाहिए। बैकग्राउंड सफेद होना अनिवार्य है।
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
              <li><Link href="/guide/ibps-bank-photo-resize" className="hover:text-white transition-colors">IBPS Bank Photo Size</Link></li>
              <li><Link href="/guide/ssc-photo-resize" className="hover:text-white transition-colors">SSC Photo Resize</Link></li>
              <li><Link href="/guide/neet-photo-resize" className="hover:text-white transition-colors">NEET Photo Size</Link></li>
              <li><Link href="/guide/passport-photo-size-india" className="hover:text-white transition-colors">Passport Photo Size</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider">Tools</h4>
            <ul className="space-y-2">
              <li><Link href="/tool/ibps-bank" className="hover:text-white transition-colors">IBPS Photo Resizer</Link></li>
              <li><Link href="/tool/ibps-signature" className="hover:text-white transition-colors">IBPS Signature Resizer</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">All Tools</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

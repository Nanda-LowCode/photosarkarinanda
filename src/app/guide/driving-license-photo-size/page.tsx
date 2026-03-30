import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import PhotoProcessor from "@/components/PhotoProcessor";
import { getPresetBySlug } from "@/lib/presets";

export const metadata: Metadata = {
  title: "Driving Licence Photo Size 2026 — Sarathi Portal Specs & Free Resize | PhotoSarkari",
  description:
    "Driving Licence photo size for Sarathi portal is 200×230 pixels, max 100KB, JPEG. Free tool to resize and compress your driving licence photo instantly.",
  alternates: { canonical: "https://photosarkarinanda.vercel.app/guide/driving-license-photo-size" },
  openGraph: {
    title: "Driving Licence Photo Size 2026 — Sarathi Portal Specs & Free Resize",
    description: "Driving Licence photo size is 200×230 pixels, max 100KB, JPEG. Free tool to resize instantly.",
    url: "https://photosarkarinanda.vercel.app/guide/driving-license-photo-size",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Driving Licence Photo Size 2026 — Sarathi Portal Specs & Free Resize",
    description: "Driving Licence photo is 200×230 px, max 100KB JPEG. Free instant resize tool.",
  },
};

const dlPreset = getPresetBySlug("driving-license");

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the driving licence photo size in pixels?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The driving licence photo for the Sarathi portal must be 200 x 230 pixels, in JPEG format, with a maximum file size of 100KB.",
      },
    },
    {
      "@type": "Question",
      name: "What background colour is needed for driving licence photo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A plain white background is required for the Sarathi portal driving licence photograph. The face must be fully visible and centred against the white background.",
      },
    },
    {
      "@type": "Question",
      name: "Can I apply for a driving licence online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can apply for a Learner's Licence and Driving Licence online through the Sarathi Parivahan portal (sarathi.parivahan.gov.in). You need to upload a digital photo and signature.",
      },
    },
    {
      "@type": "Question",
      name: "What is the driving licence signature size?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Sarathi portal typically accepts a signature image of around 200×80 pixels, in JPEG format, under 100KB. Use PhotoSarkari to resize your signature to the correct dimensions.",
      },
    },
    {
      "@type": "Question",
      name: "What documents are needed for driving licence?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You need proof of age (Aadhaar, birth certificate, Class 10 certificate), proof of address (Aadhaar, utility bill), your passport-size photograph (200×230 px, max 100KB), and signature image.",
      },
    },
  ],
};

export default function DrivingLicenseGuidePage() {
  if (!dlPreset) return null;

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
            Driving Licence Photo Size Requirements 2026
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Applying for a Learner&apos;s or Permanent Driving Licence online? Get your photo resized
            to exact Sarathi portal specifications in seconds — free and private.
          </p>
        </section>

        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-teal-600 to-cyan-700 p-4 text-center">
            <h2 className="text-xl font-bold text-white">Free Driving Licence Photo Resizer Tool</h2>
            <p className="text-teal-100 text-sm mt-1">Upload any photo — auto-resized to 200×230 px and compressed under 100KB.</p>
          </div>
          <div className="p-4 md:p-8 bg-gray-50/50">
            <PhotoProcessor preset={dlPreset} />
          </div>
        </section>

        <article className="prose prose-blue prose-lg max-w-none bg-white p-8 rounded-2xl shadow-sm border border-gray-200">

          <h2>Driving Licence Photo Requirements (Sarathi Portal)</h2>
          <p>
            The Ministry of Road Transport &amp; Highways (MoRTH) Sarathi Parivahan portal requires a specific digital photograph when applying for a Learner&apos;s Licence (LL) or Permanent Driving Licence (DL) online. Incorrect photo dimensions or file size are the most common reasons for online application rejection.
          </p>

          <div className="not-prose bg-teal-50 border-l-4 border-teal-600 p-6 rounded-r-lg my-8">
            <h3 className="text-lg font-bold text-teal-900 mb-4">Driving Licence Photo Quick Specs</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <li className="flex items-center gap-2"><span className="text-teal-600">✓</span> <strong>Dimensions:</strong> 25 mm × 29 mm</li>
              <li className="flex items-center gap-2"><span className="text-teal-600">✓</span> <strong>Pixels:</strong> 200 × 230 px</li>
              <li className="flex items-center gap-2"><span className="text-teal-600">✓</span> <strong>File Size:</strong> Max 100 KB</li>
              <li className="flex items-center gap-2"><span className="text-teal-600">✓</span> <strong>Background:</strong> Plain White</li>
              <li className="flex items-center gap-2"><span className="text-teal-600">✓</span> <strong>Format:</strong> JPEG / JPG</li>
              <li className="flex items-center gap-2"><span className="text-teal-600">✓</span> <strong>DPI:</strong> 200 DPI</li>
            </ul>
          </div>

          <h2>Common Driving Licence Photo Rejection Reasons</h2>
          <ul>
            <li><strong>File size too large:</strong> Smartphone photos are typically 2–5 MB. The Sarathi portal accepts a maximum of 100KB. Our tool compresses automatically.</li>
            <li><strong>Coloured or cluttered background:</strong> Only plain white is accepted. Our AI removes any background in one click.</li>
            <li><strong>Sunglasses or tinted lenses:</strong> Not permitted. Eyes must be clearly visible.</li>
            <li><strong>Face not centred or partially cropped:</strong> Ensure your full face from chin to the top of your head is visible.</li>
            <li><strong>Wrong file format:</strong> Only JPEG/JPG is accepted. PNG and HEIC files are rejected.</li>
          </ul>

          <h2>Indian ID Card Photo Size Comparison</h2>
          <div className="overflow-x-auto not-prose my-6">
            <table className="min-w-full border-collapse border border-gray-200 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-3 text-left font-semibold text-gray-700">Document</th>
                  <th className="border p-3 text-left font-semibold text-gray-700">Dimensions (Pixels)</th>
                  <th className="border p-3 text-left font-semibold text-gray-700">Max File Size</th>
                  <th className="border p-3 text-left font-semibold text-gray-700">Background</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-teal-50">
                  <td className="border p-3 font-medium">Driving Licence</td>
                  <td className="border p-3">200 × 230 px</td>
                  <td className="border p-3">100 KB</td>
                  <td className="border p-3">White</td>
                </tr>
                <tr>
                  <td className="border p-3 font-medium"><Link href="/guide/voter-id-photo-size" className="text-blue-600 hover:underline">Voter ID (EPIC)</Link></td>
                  <td className="border p-3">200 × 230 px</td>
                  <td className="border p-3">50 KB</td>
                  <td className="border p-3">White</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border p-3 font-medium"><Link href="/guide/aadhaar-photo-size" className="text-blue-600 hover:underline">Aadhaar Card</Link></td>
                  <td className="border p-3">350 × 450 px</td>
                  <td className="border p-3">50 KB</td>
                  <td className="border p-3">White</td>
                </tr>
                <tr>
                  <td className="border p-3 font-medium"><Link href="/guide/passport-photo-size-india" className="text-blue-600 hover:underline">Indian Passport</Link></td>
                  <td className="border p-3">600 × 600 px</td>
                  <td className="border p-3">300 KB</td>
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
          <h2 className="text-xl font-bold text-amber-900 mb-3">ड्राइविंग लाइसेंस फोटो साइज (Driving Licence Photo Size in Hindi)</h2>
          <p className="text-amber-800 leading-relaxed text-sm md:text-base">
            सारथी पोर्टल पर ड्राइविंग लाइसेंस आवेदन के लिए फोटो 200×230 पिक्सल और अधिकतम 100 KB होनी चाहिए।
            फोटो का बैकग्राउंड सफेद होना चाहिए और फॉर्मेट JPEG होना चाहिए।
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
              <li><Link href="/guide/driving-license-photo-size" className="hover:text-white transition-colors">Driving Licence Photo Size</Link></li>
              <li><Link href="/guide/voter-id-photo-size" className="hover:text-white transition-colors">Voter ID Photo Size</Link></li>
              <li><Link href="/guide/aadhaar-photo-size" className="hover:text-white transition-colors">Aadhaar Photo Size</Link></li>
              <li><Link href="/guide/passport-photo-size-india" className="hover:text-white transition-colors">Passport Photo Size</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider">Tools</h4>
            <ul className="space-y-2">
              <li><Link href="/tool/driving-license" className="hover:text-white transition-colors">Driving Licence Photo Resizer</Link></li>
              <li><Link href="/tool/voter-id" className="hover:text-white transition-colors">Voter ID Photo Resizer</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">All Tools</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

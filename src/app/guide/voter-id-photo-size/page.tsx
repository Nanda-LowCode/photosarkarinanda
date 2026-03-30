import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import PhotoProcessor from "@/components/PhotoProcessor";
import { getPresetBySlug } from "@/lib/presets";

export const metadata: Metadata = {
  title: "Voter ID Photo Size 2026 — EPIC Card Specs & Free Resize | PhotoSarkari",
  description:
    "Voter ID (EPIC) photo size is 200×230 pixels, max 50KB, JPEG. Free tool to resize and compress your Voter ID photo for NVSP registration instantly.",
  alternates: { canonical: "https://photosarkarinanda.vercel.app/guide/voter-id-photo-size" },
  openGraph: {
    title: "Voter ID Photo Size 2026 — EPIC Card Specs & Free Resize",
    description: "Voter ID (EPIC) photo size is 200×230 pixels, max 50KB, JPEG. Free tool to resize instantly.",
    url: "https://photosarkarinanda.vercel.app/guide/voter-id-photo-size",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Voter ID Photo Size 2026 — EPIC Card Specs & Free Resize",
    description: "Voter ID photo is 200×230 px, max 50KB JPEG. Free instant resize tool.",
  },
};

const voterPreset = getPresetBySlug("voter-id");

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the Voter ID photo size in pixels?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Voter ID (EPIC) photo for the NVSP/Voter portal must be 200 x 230 pixels, in JPEG format, and under 50KB file size.",
      },
    },
    {
      "@type": "Question",
      name: "What background is needed for Voter ID photo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A plain white background is required for the Voter ID online application photo. The face must be clearly visible against the white background.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use my Aadhaar photo for Voter ID?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can take the same physical photograph, but the digital file sizes are different. Aadhaar needs 350×450 px (50KB), while Voter ID needs 200×230 px (50KB). Use PhotoSarkari to convert the same photo to each size.",
      },
    },
    {
      "@type": "Question",
      name: "Is Voter ID registration done on NVSP or Voter Helpline app?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "New voter registration (Form 6) can be done on the NVSP portal (nvsp.in) or the Voter Helpline App. Both require the same 200×230 px, max 50KB JPEG photo.",
      },
    },
    {
      "@type": "Question",
      name: "What documents are needed with the Voter ID photo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Along with your photo, you typically need a proof of age (Aadhaar, birth certificate, Class 10 certificate) and proof of address (Aadhaar, utility bill, bank passbook). The photo must match your current appearance.",
      },
    },
  ],
};

export default function VoterIdGuidePage() {
  if (!voterPreset) return null;

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
            Voter ID (EPIC) Photo Size Requirements 2026
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Registering as a new voter or updating your EPIC card? Get your photo resized
            to exact Election Commission specifications — free and instant.
          </p>
        </section>

        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-violet-600 to-purple-700 p-4 text-center">
            <h2 className="text-xl font-bold text-white">Free Voter ID Photo Resizer Tool</h2>
            <p className="text-violet-100 text-sm mt-1">Upload any photo — auto-resized to 200×230 px and compressed under 50KB.</p>
          </div>
          <div className="p-4 md:p-8 bg-gray-50/50">
            <PhotoProcessor preset={voterPreset} />
          </div>
        </section>

        <article className="prose prose-blue prose-lg max-w-none bg-white p-8 rounded-2xl shadow-sm border border-gray-200">

          <h2>Voter ID Photo Requirements</h2>
          <p>
            The Election Commission of India requires a specific digital photograph when you apply for a new Voter ID card (EPIC) or update your details on the NVSP portal or the Voter Helpline App. Getting this wrong is one of the top reasons for form rejection or delays.
          </p>

          <div className="not-prose bg-violet-50 border-l-4 border-violet-600 p-6 rounded-r-lg my-8">
            <h3 className="text-lg font-bold text-violet-900 mb-4">Voter ID Photo Quick Specs</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <li className="flex items-center gap-2"><span className="text-violet-600">✓</span> <strong>Dimensions:</strong> 25 mm × 29 mm</li>
              <li className="flex items-center gap-2"><span className="text-violet-600">✓</span> <strong>Pixels:</strong> 200 × 230 px</li>
              <li className="flex items-center gap-2"><span className="text-violet-600">✓</span> <strong>File Size:</strong> Max 50 KB</li>
              <li className="flex items-center gap-2"><span className="text-violet-600">✓</span> <strong>Background:</strong> Plain White</li>
              <li className="flex items-center gap-2"><span className="text-violet-600">✓</span> <strong>Format:</strong> JPEG / JPG</li>
              <li className="flex items-center gap-2"><span className="text-violet-600">✓</span> <strong>DPI:</strong> 200 DPI</li>
            </ul>
          </div>

          <h2>Common Voter ID Photo Rejection Reasons</h2>
          <ul>
            <li><strong>File too large:</strong> Smartphone photos are 2–5 MB — way above the 50KB limit. Our tool compresses to the exact size.</li>
            <li><strong>Non-white background:</strong> Only plain white is accepted. Our AI removes any background automatically.</li>
            <li><strong>Blurry or pixelated image:</strong> Use a recent clear photo taken in good lighting.</li>
            <li><strong>Face not clearly visible:</strong> The face should be centred, fully visible, and occupy at least 70% of the frame height.</li>
            <li><strong>Photo too old:</strong> The photo should be recent and match your current appearance.</li>
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
                <tr className="bg-violet-50">
                  <td className="border p-3 font-medium">Voter ID (EPIC)</td>
                  <td className="border p-3">200 × 230 px</td>
                  <td className="border p-3">50 KB</td>
                  <td className="border p-3">White</td>
                </tr>
                <tr>
                  <td className="border p-3 font-medium"><Link href="/guide/aadhaar-photo-size" className="text-blue-600 hover:underline">Aadhaar Card</Link></td>
                  <td className="border p-3">350 × 450 px</td>
                  <td className="border p-3">50 KB</td>
                  <td className="border p-3">White</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border p-3 font-medium"><Link href="/guide/pan-card-photo-resize" className="text-blue-600 hover:underline">PAN Card</Link></td>
                  <td className="border p-3">197 × 276 px</td>
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
          <h2 className="text-xl font-bold text-amber-900 mb-3">वोटर आईडी फोटो साइज (Voter ID Photo Size in Hindi)</h2>
          <p className="text-amber-800 leading-relaxed text-sm md:text-base">
            वोटर आईडी (EPIC) कार्ड के लिए ऑनलाइन आवेदन में फोटो 200×230 पिक्सल और अधिकतम 50 KB होनी चाहिए।
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
              <li><Link href="/guide/voter-id-photo-size" className="hover:text-white transition-colors">Voter ID Photo Size</Link></li>
              <li><Link href="/guide/aadhaar-photo-size" className="hover:text-white transition-colors">Aadhaar Photo Size</Link></li>
              <li><Link href="/guide/pan-card-photo-resize" className="hover:text-white transition-colors">PAN Card Photo Resizer</Link></li>
              <li><Link href="/guide/passport-photo-size-india" className="hover:text-white transition-colors">Passport Photo Size</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider">Tools</h4>
            <ul className="space-y-2">
              <li><Link href="/tool/voter-id" className="hover:text-white transition-colors">Voter ID Photo Resizer</Link></li>
              <li><Link href="/tool/aadhaar" className="hover:text-white transition-colors">Aadhaar Photo Resizer</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">All Tools</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

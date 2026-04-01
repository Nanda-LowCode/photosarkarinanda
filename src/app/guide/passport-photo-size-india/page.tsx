import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import PhotoProcessor from "@/components/PhotoProcessor";
import { getPresetBySlug } from "@/lib/presets";

export const metadata: Metadata = {
  title: "Indian Passport Photo Size 2026 — Exact Specs & Free Resize Tool | PhotoSarkari",
  description:
    "Indian passport photo size is 51×51 mm (600×600 pixels), max 300KB in JPEG. Free online tool to resize and compress your passport photo instantly.",
  alternates: { canonical: "https://photosarkari.vercel.app/guide/passport-photo-size-india" },
  openGraph: {
    title: "Indian Passport Photo Size 2026 — Exact Specs & Free Resize Tool",
    description: "Indian passport photo size is 51×51 mm (600×600 pixels), max 300KB in JPEG. Free online tool to resize and compress your passport photo instantly.",
    url: "https://photosarkari.vercel.app/guide/passport-photo-size-india",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Indian Passport Photo Size 2026 — Exact Specs & Free Resize Tool",
    description: "Indian passport photo is 600×600 px (51×51 mm), max 300KB JPEG. Free instant resize tool.",
  },
};

const passportPreset = getPresetBySlug("passport");

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the Indian passport photo size in pixels?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Indian passport photo must be 600 x 600 pixels (51mm x 51mm square), in JPEG format, with a maximum file size of 300KB.",
      },
    },
    {
      "@type": "Question",
      name: "Is India's passport photo square or rectangular?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "India's digital passport photo for the Passport Seva portal is square (51mm x 51mm / 600x600 px). This is different from the printed passport photo which is rectangular (35mm x 45mm).",
      },
    },
    {
      "@type": "Question",
      name: "What background colour is required for Indian passport?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A plain white or off-white/light grey background is required. No patterns, textures, or coloured backgrounds are accepted.",
      },
    },
    {
      "@type": "Question",
      name: "Can I wear spectacles in my passport photo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "As of 2023, the MEA recommends removing glasses for passport photos. If you must keep them, there should be no glare or reflection. Sunglasses and tinted lenses are strictly not allowed.",
      },
    },
    {
      "@type": "Question",
      name: "What DPI should my passport photo be?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The recommended DPI for an Indian passport photo is 300 DPI. Our tool processes your image at 300 DPI by default.",
      },
    },
  ],
};

export default function PassportGuidePage() {
  if (!passportPreset) return null;

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
            Indian Passport Photo Size Requirements 2026
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don&apos;t let your passport application get rejected over a photo. Use our free tool
            to resize your image to exact MEA & Passport Seva specifications.
          </p>
        </section>

        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-red-600 to-rose-700 p-4 text-center">
            <h2 className="text-xl font-bold text-white">Free Passport Photo Resizer</h2>
            <p className="text-red-100 text-sm mt-1">Upload any photo — automatically resized to 600×600 px and compressed under 300KB.</p>
          </div>
          <div className="p-4 md:p-8 bg-gray-50/50">
            <PhotoProcessor preset={passportPreset} />
          </div>
        </section>

        <article className="prose prose-blue prose-lg max-w-none bg-white p-8 rounded-2xl shadow-sm border border-gray-200">

          <h2>Complete Passport Photo Specification</h2>
          <p>
            The Ministry of External Affairs (MEA) requires specific photo dimensions when applying for a new passport, renewing an existing one, or making corrections through the Passport Seva portal. These specs changed slightly in recent years — here are the exact, up-to-date requirements for 2026.
          </p>

          <div className="not-prose bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg my-8">
            <h3 className="text-lg font-bold text-red-900 mb-4">Passport Photo Quick Specs</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <li className="flex items-center gap-2"><span className="text-red-600">✓</span> <strong>Dimensions:</strong> 51 mm × 51 mm (Square)</li>
              <li className="flex items-center gap-2"><span className="text-red-600">✓</span> <strong>Pixels:</strong> 600 × 600 px</li>
              <li className="flex items-center gap-2"><span className="text-red-600">✓</span> <strong>File Size:</strong> Max 300 KB</li>
              <li className="flex items-center gap-2"><span className="text-red-600">✓</span> <strong>Background:</strong> White / Off-White</li>
              <li className="flex items-center gap-2"><span className="text-red-600">✓</span> <strong>Format:</strong> JPEG / JPG</li>
              <li className="flex items-center gap-2"><span className="text-red-600">✓</span> <strong>DPI:</strong> 300 DPI</li>
            </ul>
          </div>

          <h2>Digital vs Printed Passport Photo — Key Difference</h2>
          <p>
            This is the #1 source of confusion. The <strong>printed</strong> passport photo that you physically carry to the Passport Seva Kendra is the standard 35mm × 45mm rectangle. But the <strong>digital</strong> photo you upload on the Passport Seva website is <strong>51mm × 51mm (square)</strong>. Our tool processes the digital format (600×600 px).
          </p>
          <div className="overflow-x-auto not-prose my-6">
            <table className="min-w-full border-collapse border border-gray-200 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-3 text-left font-semibold text-gray-700">Type</th>
                  <th className="border p-3 text-left font-semibold text-gray-700">Dimensions</th>
                  <th className="border p-3 text-left font-semibold text-gray-700">Ratio</th>
                  <th className="border p-3 text-left font-semibold text-gray-700">Use Case</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-red-50">
                  <td className="border p-3 font-medium">Digital (Online)</td>
                  <td className="border p-3">51 × 51 mm / 600×600 px</td>
                  <td className="border p-3">1:1 Square</td>
                  <td className="border p-3">Passport Seva Portal Upload</td>
                </tr>
                <tr>
                  <td className="border p-3 font-medium">Printed (Physical)</td>
                  <td className="border p-3">35 × 45 mm</td>
                  <td className="border p-3">~3:4 Portrait</td>
                  <td className="border p-3">Physical copy at PSK</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Common Passport Photo Rejection Reasons</h2>
          <ul>
            <li><strong>Non-white background:</strong> Studio photos with blue/grey backgrounds get rejected instantly. Our AI removes backgrounds automatically.</li>
            <li><strong>Face too small in frame:</strong> Your face should occupy 70-80% of the photo height, from chin to top of head.</li>
            <li><strong>Shadows on face:</strong> Uneven lighting creates shadows. Use natural daylight facing a window.</li>
            <li><strong>Eyes not open or looking away:</strong> You must look directly at the camera with both eyes clearly visible.</li>
            <li><strong>Wearing caps or hats:</strong> Religious headwear is allowed, but the full face from forehead to chin must be visible.</li>
          </ul>

          <h2>How to Take a Perfect Passport Photo at Home</h2>
          <ol>
            <li><strong>Lighting:</strong> Stand facing a window during daytime for even, shadow-free lighting on your face.</li>
            <li><strong>Background:</strong> Stand against any wall — you don&apos;t need white! Our AI will remove the background.</li>
            <li><strong>Pose:</strong> Look straight at the camera with a neutral expression. Keep your mouth closed.</li>
            <li><strong>Framing:</strong> Have someone take a chest-up photo. Avoid selfies (front cameras distort faces).</li>
            <li><strong>Upload:</strong> Use the PhotoSarkari tool above. It crops to 1:1 square, removes the background, and compresses under 300KB.</li>
          </ol>

          <h2>Photo Size Comparison Chart</h2>
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
                <tr className="bg-red-50">
                  <td className="border p-3 font-medium">Indian Passport</td>
                  <td className="border p-3">600 × 600 px</td>
                  <td className="border p-3">300 KB</td>
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
          <h2 className="text-xl font-bold text-amber-900 mb-3">पासपोर्ट फोटो साइज (Passport Photo Size in Hindi)</h2>
          <p className="text-amber-800 leading-relaxed text-sm md:text-base">
            भारतीय पासपोर्ट के लिए ऑनलाइन अपलोड होने वाली फोटो 51×51 मिमी (600×600 पिक्सल) और अधिकतम 300 KB होनी चाहिए।
            फोटो का बैकग्राउंड सफेद या हल्का होना अनिवार्य है। फॉर्मेट JPEG होना चाहिए।
            ऊपर दिए गए <strong>मुफ्त टूल</strong> से आप अपनी फोटो को तुरंत सही साइज में बदल सकते हैं।
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
              <li><Link href="/guide/aadhaar-photo-size" className="hover:text-white transition-colors">Aadhaar Photo Size</Link></li>
              <li><Link href="/guide/pan-card-photo-resize" className="hover:text-white transition-colors">PAN Card Photo Resizer</Link></li>
              <li><Link href="/guide/passport-photo-size-india" className="hover:text-white transition-colors">Indian Passport Specs</Link></li>
              <li><Link href="/guide/ssc-photo-resize" className="hover:text-white transition-colors">SSC Photo Resize</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider">Tools</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-white transition-colors">Main Resize Tool</Link></li>
              <li><Link href="/tool/pan-signature" className="hover:text-white transition-colors">PAN Signature Resizer</Link></li>
              <li><Link href="/tool/ssc-signature" className="hover:text-white transition-colors">SSC Signature Resizer</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

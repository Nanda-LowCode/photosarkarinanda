import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import PhotoProcessor from "@/components/PhotoProcessor";
import { getPresetBySlug } from "@/lib/presets";

export const metadata: Metadata = {
  title: "SSC Photo & Signature Size 2026 — Resize to 20KB Free | PhotoSarkari",
  description:
    "SSC exam photo size is 200×230 pixels, max 50KB. SSC signature is 400×180 px, max 30KB. Free online tool to resize and compress instantly.",
  alternates: { canonical: "https://photosarkari.vercel.app/guide/ssc-photo-resize" },
  openGraph: {
    title: "SSC Photo & Signature Size 2026 — Resize to 20KB Free",
    description: "SSC exam photo size is 200×230 pixels, max 50KB. SSC signature is 400×180 px, max 30KB. Free online tool to resize and compress instantly.",
    url: "https://photosarkari.vercel.app/guide/ssc-photo-resize",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "SSC Photo & Signature Size 2026 — Resize to 20KB Free",
    description: "SSC photo is 200×230 px (max 50KB), signature is 400×180 px (max 30KB). Free instant resize.",
  },
};

const sscPreset = getPresetBySlug("ssc-exam");

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the SSC exam photo size in pixels?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The SSC exam photo size is 200 pixels (Width) x 230 pixels (Height), JPEG format, and must be under 50KB.",
      },
    },
    {
      "@type": "Question",
      name: "What is the SSC signature size?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The SSC signature must be 400 x 180 pixels (landscape), in JPEG format, and under 30KB file size.",
      },
    },
    {
      "@type": "Question",
      name: "Does the same photo spec apply to SSC CGL, CHSL, MTS, and GD?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All SSC exams (CGL, CHSL, MTS, GD Constable, Stenographer, JE, etc.) use the same photo and signature specifications for online application forms.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use a mobile photo for SSC form?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, a mobile phone photo works perfectly. Just take a clear, well-lit portrait and use PhotoSarkari to resize, crop, and compress it to the exact SSC requirements.",
      },
    },
    {
      "@type": "Question",
      name: "My SSC photo is getting rejected. What should I do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Common reasons include: file size over 50KB, wrong dimensions, colored background instead of white, and blurry images. Upload your photo to PhotoSarkari above — it auto-fixes all of these issues.",
      },
    },
  ],
};

export default function SscGuidePage() {
  if (!sscPreset) return null;

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
            SSC Exam Photo & Signature Size 2026
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Applying for SSC CGL, CHSL, MTS, or GD? Get your photo and signature resized to exact
            SSC portal specifications — free and instant, no upload to any server.
          </p>
        </section>

        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-amber-600 p-4 text-center">
            <h2 className="text-xl font-bold text-white">Free SSC Photo Resizer Tool</h2>
            <p className="text-orange-100 text-sm mt-1">Upload any photo — auto-resized to 200×230 px and compressed under 50KB.</p>
          </div>
          <div className="p-4 md:p-8 bg-gray-50/50">
            <PhotoProcessor preset={sscPreset} />
          </div>
        </section>

        <article className="prose prose-blue prose-lg max-w-none bg-white p-8 rounded-2xl shadow-sm border border-gray-200">

          <h2>SSC Photo Requirements — All Exams</h2>
          <p>
            The Staff Selection Commission (SSC) uses a unified specification for all its recruitment examinations, including CGL (Combined Graduate Level), CHSL (Combined Higher Secondary Level), MTS (Multi Tasking Staff), GD Constable, Stenographer, and JE (Junior Engineer). Whether you&apos;re filling the form for any of these, your photo and signature requirements are identical.
          </p>

          <div className="not-prose bg-orange-50 border-l-4 border-orange-600 p-6 rounded-r-lg my-8">
            <h3 className="text-lg font-bold text-orange-900 mb-4">SSC Photo Quick Specs</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <li className="flex items-center gap-2"><span className="text-orange-600">✓</span> <strong>Dimensions:</strong> 25 mm × 29 mm</li>
              <li className="flex items-center gap-2"><span className="text-orange-600">✓</span> <strong>Pixels:</strong> 200 × 230 px</li>
              <li className="flex items-center gap-2"><span className="text-orange-600">✓</span> <strong>File Size:</strong> Max 50 KB</li>
              <li className="flex items-center gap-2"><span className="text-orange-600">✓</span> <strong>Background:</strong> Plain White</li>
              <li className="flex items-center gap-2"><span className="text-orange-600">✓</span> <strong>Format:</strong> JPEG / JPG</li>
              <li className="flex items-center gap-2"><span className="text-orange-600">✓</span> <strong>DPI:</strong> 200 DPI</li>
            </ul>
          </div>

          <div className="not-prose bg-purple-50 border-l-4 border-purple-600 p-6 rounded-r-lg my-8">
            <h3 className="text-lg font-bold text-purple-900 mb-4">SSC Signature Quick Specs</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <li className="flex items-center gap-2"><span className="text-purple-600">✓</span> <strong>Dimensions:</strong> 50 mm × 23 mm</li>
              <li className="flex items-center gap-2"><span className="text-purple-600">✓</span> <strong>Pixels:</strong> 400 × 180 px</li>
              <li className="flex items-center gap-2"><span className="text-purple-600">✓</span> <strong>File Size:</strong> Max 30 KB</li>
              <li className="flex items-center gap-2"><span className="text-purple-600">✓</span> <strong>Background:</strong> Plain White</li>
              <li className="flex items-center gap-2"><span className="text-purple-600">✓</span> <strong>Format:</strong> JPEG / JPG</li>
            </ul>
          </div>

          <h2>Common SSC Photo Rejection Reasons</h2>
          <ul>
            <li><strong>File size exceeding 50KB:</strong> Camera photos are typically 2-5 MB. You must compress dramatically. Our tool does this automatically.</li>
            <li><strong>Wrong aspect ratio:</strong> The SSC portal is strict about the exact 200×230 pixel size. A generic passport photo won&apos;t work.</li>
            <li><strong>Colored/cluttered background:</strong> Only pure white backgrounds are accepted.</li>
            <li><strong>Face not centred:</strong> Your face should be clearly centred and fill 70-80% of the frame height.</li>
            <li><strong>Photo is old:</strong> SSC requires a recent photograph (taken within the last 3 months is recommended).</li>
          </ul>

          <h2>SSC Exams Quick Reference Table</h2>
          <div className="overflow-x-auto not-prose my-6">
            <table className="min-w-full border-collapse border border-gray-200 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-3 text-left font-semibold text-gray-700">SSC Exam</th>
                  <th className="border p-3 text-left font-semibold text-gray-700">Photo Size</th>
                  <th className="border p-3 text-left font-semibold text-gray-700">Signature Size</th>
                  <th className="border p-3 text-left font-semibold text-gray-700">Photo Max KB</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border p-3">SSC CGL</td><td className="border p-3">200×230 px</td><td className="border p-3">400×180 px</td><td className="border p-3">50 KB</td></tr>
                <tr className="bg-gray-50"><td className="border p-3">SSC CHSL</td><td className="border p-3">200×230 px</td><td className="border p-3">400×180 px</td><td className="border p-3">50 KB</td></tr>
                <tr><td className="border p-3">SSC MTS</td><td className="border p-3">200×230 px</td><td className="border p-3">400×180 px</td><td className="border p-3">50 KB</td></tr>
                <tr className="bg-gray-50"><td className="border p-3">SSC GD</td><td className="border p-3">200×230 px</td><td className="border p-3">400×180 px</td><td className="border p-3">50 KB</td></tr>
                <tr><td className="border p-3">SSC JE</td><td className="border p-3">200×230 px</td><td className="border p-3">400×180 px</td><td className="border p-3">50 KB</td></tr>
                <tr className="bg-gray-50"><td className="border p-3">SSC Steno</td><td className="border p-3">200×230 px</td><td className="border p-3">400×180 px</td><td className="border p-3">50 KB</td></tr>
              </tbody>
            </table>
          </div>

          <h2>How to Prepare Your SSC Signature</h2>
          <ol>
            <li>Sign with a <strong>black ball-point pen</strong> on plain white paper.</li>
            <li>Keep the signature within a compact area — no wider than 5 cm.</li>
            <li>Take a close-up photo in bright light. Avoid shadows.</li>
            <li>Upload to <Link href="/tool/ssc-signature">PhotoSarkari&apos;s Signature Tool</Link> — the Clean Signature filter will automatically enhance contrast and make the ink crisp.</li>
          </ol>

          <h2>SSC vs Other Exam Photo Sizes</h2>
          <div className="overflow-x-auto not-prose my-6">
            <table className="min-w-full border-collapse border border-gray-200 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-3 text-left font-semibold text-gray-700">Document / Exam</th>
                  <th className="border p-3 text-left font-semibold text-gray-700">Dimensions (Pixels)</th>
                  <th className="border p-3 text-left font-semibold text-gray-700">Max File Size</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-orange-50">
                  <td className="border p-3 font-medium">SSC Exams</td>
                  <td className="border p-3">200 × 230 px</td>
                  <td className="border p-3">50 KB</td>
                </tr>
                <tr>
                  <td className="border p-3 font-medium"><Link href="/guide/aadhaar-photo-size" className="text-blue-600 hover:underline">Aadhaar Card</Link></td>
                  <td className="border p-3">350 × 450 px</td>
                  <td className="border p-3">50 KB</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border p-3 font-medium"><Link href="/guide/pan-card-photo-resize" className="text-blue-600 hover:underline">PAN Card</Link></td>
                  <td className="border p-3">197 × 276 px</td>
                  <td className="border p-3">50 KB</td>
                </tr>
                <tr>
                  <td className="border p-3 font-medium"><Link href="/guide/passport-photo-size-india" className="text-blue-600 hover:underline">Indian Passport</Link></td>
                  <td className="border p-3">600 × 600 px</td>
                  <td className="border p-3">300 KB</td>
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
          <h2 className="text-xl font-bold text-amber-900 mb-3">एसएससी फोटो साइज (SSC Photo Size in Hindi)</h2>
          <p className="text-amber-800 leading-relaxed text-sm md:text-base">
            एसएससी (SSC) परीक्षा फॉर्म भरते समय फोटो का साइज 200×230 पिक्सल और अधिकतम 50 KB होना चाहिए।
            सिग्नेचर 400×180 पिक्सल और 30 KB से कम होना चाहिए। दोनों JPEG फॉर्मेट में सफेद बैकग्राउंड पर होने चाहिए।
            यह नियम SSC CGL, CHSL, MTS, GD, JE सभी परीक्षाओं के लिए समान हैं।
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
              <li><Link href="/tool/ssc-signature" className="hover:text-white transition-colors">SSC Signature Resizer</Link></li>
              <li><Link href="/tool/pan-signature" className="hover:text-white transition-colors">PAN Signature Resizer</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

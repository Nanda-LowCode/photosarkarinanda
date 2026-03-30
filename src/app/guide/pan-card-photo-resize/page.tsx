import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import PhotoProcessor from "@/components/PhotoProcessor";
import { getPresetBySlug } from "@/lib/presets";

export const metadata: Metadata = {
  title: "PAN Card Photo & Signature Size 2026 — Free Resize Tool | PhotoSarkari",
  description:
    "PAN card photo size is 25×35 mm (197×276 pixels), max 50KB JPEG. PAN signature is 45×20 mm (354×157 px), max 50KB. Free instant resize tool.",
  alternates: { canonical: "https://photosarkari.com/guide/pan-card-photo-resize" },
  openGraph: {
    title: "PAN Card Photo & Signature Size 2026 — Free Resize Tool",
    description: "PAN card photo size is 25×35 mm (197×276 pixels), max 50KB JPEG. PAN signature is 45×20 mm (354×157 px), max 50KB. Free instant resize tool.",
    url: "https://photosarkari.com/guide/pan-card-photo-resize",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PAN Card Photo & Signature Size 2026 — Free Resize Tool",
    description: "PAN card photo size is 197×276 px, signature 354×157 px, both max 50KB. Free instant resize.",
  },
};

const panPreset = getPresetBySlug("pan-nsdl");

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the PAN card photo size in pixels?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The PAN card photo size is 197 pixels (Width) x 276 pixels (Height), which corresponds to 25mm x 35mm at 200 DPI.",
      },
    },
    {
      "@type": "Question",
      name: "What is the PAN card signature size?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The PAN card signature must be 354 x 157 pixels (45mm x 20mm), under 50KB in JPEG format, with a white background.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a difference between NSDL and UTI PAN photo requirements?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Both NSDL and UTI (now Protean and UTIITSL) require the same photo dimensions: 197x276 px, max 50KB. The portal upload interfaces look different but the specs are identical.",
      },
    },
    {
      "@type": "Question",
      name: "Why is my PAN photo getting rejected?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Common reasons include: file size exceeding 50KB, incorrect dimensions, non-white background, blurry image, and wearing sunglasses or caps. Use PhotoSarkari to auto-fix all of these issues.",
      },
    },
    {
      "@type": "Question",
      name: "How do I sign on white paper for PAN digital signature?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sign with a black or dark blue pen on clean white paper. Take a close-up photo in good lighting, then use PhotoSarkari's Clean Signature tool to enhance the contrast and remove paper shadows.",
      },
    },
  ],
};

export default function PanCardGuidePage() {
  if (!panPreset) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header */}
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
            PAN Card Photo & Signature Size 2026
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Whether applying via NSDL (Protean) or UTIITSL, get your PAN photo and signature
            resized to exact Income Tax Department specs — free and instant.
          </p>
        </section>

        {/* Tool */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-emerald-700 p-4 text-center">
            <h2 className="text-xl font-bold text-white">Free PAN Card Photo Resizer</h2>
            <p className="text-green-100 text-sm mt-1">Paste any photo — we auto-resize to 197×276 px and compress to 50KB.</p>
          </div>
          <div className="p-4 md:p-8 bg-gray-50/50">
            <PhotoProcessor preset={panPreset} />
          </div>
        </section>

        {/* Article */}
        <article className="prose prose-blue prose-lg max-w-none bg-white p-8 rounded-2xl shadow-sm border border-gray-200">

          <h2>Complete PAN Photo Specification</h2>
          <p>
            When you apply for a new PAN card or request corrections online, you need to upload a recent passport-size photograph. The requirements are strict — incorrect file dimensions or an oversized file are the most common reasons for rejection at both NSDL (now Protean) and UTIITSL portals.
          </p>

          <div className="not-prose bg-green-50 border-l-4 border-green-600 p-6 rounded-r-lg my-8">
            <h3 className="text-lg font-bold text-green-900 mb-4">PAN Photo Quick Specs</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <li className="flex items-center gap-2"><span className="text-green-600">✓</span> <strong>Dimensions:</strong> 25 mm × 35 mm</li>
              <li className="flex items-center gap-2"><span className="text-green-600">✓</span> <strong>Pixels:</strong> 197 × 276 px</li>
              <li className="flex items-center gap-2"><span className="text-green-600">✓</span> <strong>File Size:</strong> Max 50 KB</li>
              <li className="flex items-center gap-2"><span className="text-green-600">✓</span> <strong>Background:</strong> Plain White</li>
              <li className="flex items-center gap-2"><span className="text-green-600">✓</span> <strong>Format:</strong> JPEG / JPG</li>
              <li className="flex items-center gap-2"><span className="text-green-600">✓</span> <strong>DPI:</strong> 200 DPI</li>
            </ul>
          </div>

          <div className="not-prose bg-purple-50 border-l-4 border-purple-600 p-6 rounded-r-lg my-8">
            <h3 className="text-lg font-bold text-purple-900 mb-4">PAN Signature Quick Specs</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <li className="flex items-center gap-2"><span className="text-purple-600">✓</span> <strong>Dimensions:</strong> 45 mm × 20 mm</li>
              <li className="flex items-center gap-2"><span className="text-purple-600">✓</span> <strong>Pixels:</strong> 354 × 157 px</li>
              <li className="flex items-center gap-2"><span className="text-purple-600">✓</span> <strong>File Size:</strong> Max 50 KB</li>
              <li className="flex items-center gap-2"><span className="text-purple-600">✓</span> <strong>Background:</strong> Plain White</li>
              <li className="flex items-center gap-2"><span className="text-purple-600">✓</span> <strong>Format:</strong> JPEG / JPG</li>
            </ul>
          </div>

          <h2>NSDL vs UTI — Any Difference?</h2>
          <p>
            Short answer: <strong>No.</strong> Both portals accept the exact same photo and signature specifications. The only difference is the user interface of the portal itself. Whether you file through the NSDL (Protean) portal or the UTIITSL portal, your image must be 197×276 px, JPEG, under 50KB with a white background.
          </p>

          <h2>Common PAN Photo Rejection Reasons</h2>
          <ul>
            <li><strong>File too large:</strong> Most smartphone photos are 2-5 MB. You must compress down to 50KB. Our tool does this automatically.</li>
            <li><strong>Wrong dimensions:</strong> Uploading a full-frame photo without cropping to the standard portrait ratio will be rejected.</li>
            <li><strong>Colored background:</strong> Studio photos sometimes have blue or red backdrops. PAN requires pure white.</li>
            <li><strong>Face too small:</strong> Your face should occupy 70-80% of the photo frame.</li>
            <li><strong>Wearing headwear:</strong> Religious headwear is permitted, but the full face from forehead to chin must be visible.</li>
          </ul>

          <h2>PAN Signature Tips</h2>
          <ol>
            <li>Sign with a <strong>black or dark blue ball-point pen</strong> on clean white A4 paper.</li>
            <li>Take a close-up photo in bright, even lighting. No shadows across the paper.</li>
            <li>Upload to <Link href="/tool/pan-signature">PhotoSarkari&apos;s Signature Resizer</Link> — it will auto-crop, enhance contrast, and compress to 50KB.</li>
            <li>The signature must match your signature on any existing ID documents.</li>
          </ol>

          <h2>Document Size Quick Comparison</h2>
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
                <tr className="bg-green-50">
                  <td className="border p-3 font-medium">PAN Card (NSDL/UTI)</td>
                  <td className="border p-3">197 × 276 px</td>
                  <td className="border p-3">50 KB</td>
                  <td className="border p-3">White</td>
                </tr>
                <tr>
                  <td className="border p-3 font-medium">PAN Signature</td>
                  <td className="border p-3">354 × 157 px</td>
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
                  <td className="border p-3">250 KB</td>
                  <td className="border p-3">White / Light</td>
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

        {/* Hindi Summary */}
        <section className="bg-amber-50 border border-amber-200 p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-bold text-amber-900 mb-3">पैन कार्ड फोटो साइज (PAN Card Photo Size in Hindi)</h2>
          <p className="text-amber-800 leading-relaxed text-sm md:text-base">
            पैन कार्ड के लिए फोटो का साइज 25×35 मिमी (197×276 पिक्सल) होना चाहिए और फाइल 50 KB से कम होनी चाहिए।
            सिग्नेचर का साइज 45×20 मिमी (354×157 पिक्सल) होना चाहिए। दोनों JPEG फॉर्मेट में और सफेद बैकग्राउंड पर होने चाहिए।
            ऊपर दिए गए हमारे <strong>मुफ्त टूल</strong> से आप सेकंडों में अपनी फोटो और सिग्नेचर को सही साइज में बदल सकते हैं।
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

import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import PhotoProcessor from "@/components/PhotoProcessor";
import { getPresetBySlug } from "@/lib/presets";

export const metadata: Metadata = {
  title: "Aadhaar Card Photo Size 2026 — Exact Pixels, KB & Free Resize Tool | PhotoSarkari",
  description:
    "Aadhaar card photo size is 3.5×4.5 cm (350×450 pixels) at 200 DPI, max 50KB in JPEG. Free online tool to resize your Aadhaar photo instantly.",
  alternates: { canonical: "https://photosarkari.vercel.app/guide/aadhaar-photo-size" },
  openGraph: {
    title: "Aadhaar Card Photo Size 2026 — Exact Pixels, KB & Free Resize Tool",
    description: "Aadhaar card photo size is 3.5×4.5 cm (350×450 pixels) at 200 DPI, max 50KB in JPEG. Free online tool to resize your Aadhaar photo instantly.",
    url: "https://photosarkari.vercel.app/guide/aadhaar-photo-size",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aadhaar Card Photo Size 2026 — Exact Pixels, KB & Free Resize Tool",
    description: "Aadhaar card photo size is 350×450 px, max 50KB JPEG. Free instant resize tool.",
  },
};

const aadhaarPreset = getPresetBySlug("aadhaar");

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the Aadhaar card photo size in pixels?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The exact Aadhaar card photo size in pixels is 350 pixels (Width) x 450 pixels (Height).",
      },
    },
    {
      "@type": "Question",
      name: "How many KB should an Aadhaar photo be?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Your Aadhaar photo must be compressed to be under 50 KB. The ideal range is between 20 KB and 50 KB.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use a red background for Aadhaar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The UIDAI strict guidelines require a plain white or very light background for the Aadhaar photo.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to show my ears?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, both ears must be clearly visible, and your face should cover 70-80% of the entire photo.",
      },
    },
  ],
};

export default function AadhaarGuidePage() {
  if (!aadhaarPreset) return null;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--cream)" }}>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      {/* Header */}
      <header className="hero-pattern relative" style={{ background: "linear-gradient(170deg, var(--navy) 0%, var(--navy-mid) 100%)" }}><div className="saffron-line absolute bottom-0 left-0 right-0" />
        <div className="max-w-4xl mx-auto flex items-center">
          <Link
            href="/"
            className="text-sm flex items-center gap-2 transition-colors font-medium py-4" style={{ color: "rgba(255,255,255,0.5)" }}
          >
            ← Back to PhotoSarkari
          </Link>
        </div>
      </header>

      {/* Main Content Workspace */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 flex flex-col gap-10">
        
        {/* Intro Section */}
        <section className="text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
            Aadhaar Card Photo Size Requirements 2026
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ensure your Aadhaar enrollment or update isn&apos;t rejected. Use our free,
            instant, private tool to resize your image to exact UIDAI specifications.
          </p>
        </section>

        {/* The Processor Component */}
        <section className="rounded-[var(--radius)] overflow-hidden transition-all" style={{ background: "var(--surface)", boxShadow: "var(--shadow-card)", border: "1px solid var(--border)" }}>
          <div className="p-4 text-center" style={{ background: "linear-gradient(135deg, var(--navy) 0%, var(--navy-mid) 100%)" }}>
            <h2 className="text-xl font-bold text-white">Free Aadhaar Photo Resizer Tool</h2>
            <p className="text-blue-100 text-sm mt-1">Upload any photo below to auto-resize and compress to 50KB.</p>
          </div>
          <div className="p-4 md:p-8 bg-gray-50/50">
             <PhotoProcessor preset={aadhaarPreset} />
          </div>
        </section>

        {/* Content Body - Markdown styled */}
        <article className="prose prose-lg max-w-none p-8 rounded-[var(--radius)]" style={{ background: "var(--surface)", boxShadow: "var(--shadow-card)", border: "1px solid var(--border)" }}>
          
          <h2>Complete Specification Guide</h2>
          <p>
            When applying for a new Aadhaar card or updating your existing biometric data at an Aadhaar Seva Kendra or online portal, your photograph must meet strict UIDAI (Unique Identification Authority of India) guidelines. Failure to comply is the #1 reason for application rejection.
          </p>
          
          <div className="not-prose bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg my-8">
            <h3 className="text-lg font-bold text-blue-900 mb-4">Quick Specs Checklist</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <li className="flex items-center gap-2"><span className="text-blue-600">✓</span> <strong>Dimensions:</strong> 3.5 cm x 4.5 cm</li>
              <li className="flex items-center gap-2"><span className="text-blue-600">✓</span> <strong>Pixels:</strong> 350 x 450 px</li>
              <li className="flex items-center gap-2"><span className="text-blue-600">✓</span> <strong>File Size:</strong> Max 50 KB</li>
              <li className="flex items-center gap-2"><span className="text-blue-600">✓</span> <strong>Background:</strong> Plain White</li>
              <li className="flex items-center gap-2"><span className="text-blue-600">✓</span> <strong>Format:</strong> JPEG / JPG</li>
              <li className="flex items-center gap-2"><span className="text-blue-600">✓</span> <strong>DPI:</strong> 200 DPI</li>
            </ul>
          </div>

          <h2>Common Rejection Reasons</h2>
          <ul>
            <li><strong>Dark or busy backgrounds:</strong> The UIDAI requires a totally plain, clean background. (Our tool&apos;s AI background removal fixes this instantly!).</li>
            <li><strong>File size too large:</strong> The portal will spit back a hard error if your image is over 50 KB.</li>
            <li><strong>Blurry face:</strong> Your face should cover 70-80% of the entire frame frame, with both ears clearly visible.</li>
            <li><strong>Wearing glasses with glare:</strong> If you must wear glasses, ensure there are no reflections blinding your eyes. Tinted lenses and sunglasses are strictly prohibited.</li>
          </ul>

          <h2>Aadhaar vs PAN vs Passport — Size Comparison</h2>
          <p>It&apos;s easy to get confused between India&apos;s different document requirements. Here is a quick cheat sheet:</p>
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
                <tr>
                  <td className="border p-3 font-medium">Aadhaar Card</td>
                  <td className="border p-3">350 x 450 px</td>
                  <td className="border p-3">50 KB</td>
                  <td className="border p-3">White</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border p-3 font-medium"><Link href="/guide/pan-card-photo-resize" className="text-blue-600 hover:underline">PAN Card</Link></td>
                  <td className="border p-3">213 x 213 px</td>
                  <td className="border p-3">30 KB</td>
                  <td className="border p-3">White</td>
                </tr>
                <tr>
                  <td className="border p-3 font-medium"><Link href="/guide/passport-photo-size-india" className="text-blue-600 hover:underline">Indian Passport</Link></td>
                  <td className="border p-3">600 x 600 px</td>
                  <td className="border p-3">250 KB</td>
                  <td className="border p-3">White / Light</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>How to Take an Aadhaar Photo at Home</h2>
          <ol>
            <li>Find a room with good, even, natural lighting (facing a window is best).</li>
            <li>Have a friend or family member take the photo from chest up using a smartphone. Do not take a selfie to avoid lens distortion.</li>
            <li>Don&apos;t worry about the background! You can stand anywhere.</li>
            <li>Upload the photo to the <strong>PhotoSarkari tool above</strong>. Our system will automatically remove the background, replace it with pure white, and crop you to the perfect 3.5x4.5cm ratio.</li>
          </ol>

          <h2 className="mb-6">Frequently Asked Questions</h2>
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

        {/* Hindi Summary Section */}
        <section className="bg-amber-50 border border-amber-200 p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-bold text-amber-900 mb-3 block">आधार कार्ड फोटो साइज (Aadhaar Photo Size in Hindi)</h2>
          <p className="text-amber-800 leading-relaxed text-sm md:text-base">
            आधार कार्ड के लिए फोटो अपलोड करते समय ध्यान दें कि फोटो का बैकग्राउंड सफेद (White) होना चाहिए और फाइल का साइज 50 KB से कम होना चाहिए। फोटो का डाइमेंशन 3.5×4.5 cm (350×450 पिक्सल) होना अनिवार्य है। आप ऊपर दिए गए हमारे निःशुल्क टूल <strong>(Free Tool)</strong> का उपयोग करके अपने मोबाइल से ही फोटो को सही साइज और KB में सेकंडों में सेट कर सकते हैं।
          </p>
        </section>

      </main>

      {/* Footer / Internal Links Base */}
      <footer className="py-10 px-4 mt-8" style={{ background: "var(--navy)", color: "rgba(255,255,255,0.45)" }}>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div>
            <h4 className="font-bold mb-4 uppercase tracking-wider text-sm" style={{ color: "var(--saffron-light)" }}>PhotoSarkari</h4>
            <p>100% Client-side. Fast, private, zero-upload tool for Indian standard document photo sizing.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase tracking-wider text-sm" style={{ color: "var(--saffron-light)" }}>Top Guides</h4>
            <ul className="space-y-2">
              <li><Link href="/guide/aadhaar-photo-size" className="transition-colors" style={{ color: "rgba(255,255,255,0.45)" }}>Aadhaar Photo Size</Link></li>
              <li><Link href="/guide/pan-card-photo-resize" className="transition-colors" style={{ color: "rgba(255,255,255,0.45)" }}>PAN Card Photo Resizer</Link></li>
              <li><Link href="/guide/passport-photo-size-india" className="transition-colors" style={{ color: "rgba(255,255,255,0.45)" }}>Indian Passport Specs</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase tracking-wider text-sm" style={{ color: "var(--saffron-light)" }}>Tools</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="transition-colors" style={{ color: "rgba(255,255,255,0.45)" }}>Main Resize Tool</Link></li>
              <li><Link href="/utilities" className="transition-colors" style={{ color: "rgba(255,255,255,0.45)" }}>Aadhaar PDF Merger</Link></li>
              <li><Link href="/signature" className="transition-colors" style={{ color: "rgba(255,255,255,0.45)" }}>Clean Signature Tool</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

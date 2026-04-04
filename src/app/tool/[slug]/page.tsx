import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getPresetBySlug, presets } from "@/lib/presets";
import PhotoProcessor from "@/components/PhotoProcessor";
import PresetSelector from "@/components/PresetSelector";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return presets.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const preset = getPresetBySlug(slug);
  if (!preset) return {};
  const title = `${preset.name} Photo Size | PhotoSarkari`;
  const description = `Resize your photo for ${preset.name} — ${preset.description}, max ${preset.maxKB}KB. Free, instant, no upload required.`;
  const url = `https://photosarkari.vercel.app/tool/${preset.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const preset = getPresetBySlug(slug);
  if (!preset) notFound();

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--cream)" }}>
      {/* Header */}
      <header className="hero-pattern relative" style={{ background: "linear-gradient(170deg, var(--navy) 0%, var(--navy-mid) 100%)" }}>
        <div className="max-w-2xl mx-auto px-4 pt-4 pb-5">
          <Link
            href="/"
            className="text-sm flex items-center gap-1.5 mb-4 transition-colors"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All Tools
          </Link>
          <div className="mb-2">
            <PresetSelector currentSlug={preset.slug} presets={presets} />
          </div>
          <h1 className="sr-only">{preset.name} Photo Size — Free Resize Tool</h1>
          <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>{preset.description}</p>
        </div>
        <div className="saffron-line" />
      </header>

      {/* Main */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-8">
        <PhotoProcessor preset={preset} />

        {/* Tips */}
        <div className="mt-8 rounded-[var(--radius)] p-5"
             style={{ background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}>
          <h2 className="text-sm font-bold mb-2.5"
              style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
            Tips for a good {preset.category === "photo" ? "photo" : "signature"}
          </h2>
          {preset.category === "photo" ? (
            <ul className="text-sm space-y-1.5 list-none" style={{ color: "var(--text-secondary)" }}>
              {[
                "Use a plain white or light background",
                "Face should be clearly visible and centered",
                "No sunglasses, caps, or head covers (unless religious)",
                "Eyes open and looking at camera",
                "Neutral expression with mouth closed",
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span style={{ color: "var(--saffron)" }} className="flex-shrink-0 mt-0.5">&#x2713;</span>
                  {tip}
                </li>
              ))}
            </ul>
          ) : (
            <ul className="text-sm space-y-1.5 list-none" style={{ color: "var(--text-secondary)" }}>
              {[
                "Sign on plain white paper with black/blue pen",
                "Scan or photograph on a flat, well-lit surface",
                "Avoid shadows or creases in the paper",
                "Crop tightly around the signature",
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span style={{ color: "var(--saffron)" }} className="flex-shrink-0 mt-0.5">&#x2713;</span>
                  {tip}
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-4 px-4 text-center" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          100% Free &nbsp;&middot;&nbsp; No Upload to Server &nbsp;&middot;&nbsp; Made in India
        </p>
      </footer>
    </div>
  );
}

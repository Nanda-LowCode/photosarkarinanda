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
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-800 text-white py-5 px-4">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/"
            className="text-blue-300 hover:text-white text-sm flex items-center gap-1 mb-3 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            All Tools
          </Link>
          <div className="mb-2">
            <PresetSelector currentSlug={preset.slug} presets={presets} />
          </div>
          <h1 className="sr-only">{preset.name} Photo Size — Free Resize Tool</h1>
          <p className="text-blue-200 text-sm mt-1">{preset.description}</p>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-8">
        <PhotoProcessor preset={preset} />

        {/* Tips */}
        <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-blue-900 mb-2">
            Tips for a good {preset.category === "photo" ? "photo" : "signature"}
          </h2>
          {preset.category === "photo" ? (
            <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
              <li>Use a plain white or light background</li>
              <li>Face should be clearly visible and centered</li>
              <li>No sunglasses, caps, or head covers (unless religious)</li>
              <li>Eyes open and looking at camera</li>
              <li>Neutral expression with mouth closed</li>
            </ul>
          ) : (
            <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
              <li>Sign on plain white paper with black/blue pen</li>
              <li>Scan or photograph on a flat, well-lit surface</li>
              <li>Avoid shadows or creases in the paper</li>
              <li>Crop tightly around the signature</li>
            </ul>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4 px-4 text-center">
        <p className="text-xs text-gray-400">
          100% Free &nbsp;•&nbsp; No Upload to Server &nbsp;•&nbsp; Made in
          India 🇮🇳
        </p>
      </footer>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import AadhaarMerger from "@/components/AadhaarMerger";

export const metadata: Metadata = {
  title: "Merge Aadhaar Card Front & Back PDF | PhotoSarkari",
  description: "Securely combine the front and back scans of your Aadhaar Card into a single A4 PDF, perfectly formatted for PAN card application uploads. Free and 100% private.",
  alternates: { canonical: "https://photosarkari.vercel.app/tool/aadhaar-merger" },
  openGraph: {
    title: "Merge Aadhaar Card Front & Back PDF | PhotoSarkari",
    description: "Securely combine the front and back scans of your Aadhaar Card into a single A4 PDF. Free and 100% private — no server upload.",
    url: "https://photosarkari.vercel.app/tool/aadhaar-merger",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Merge Aadhaar Card Front & Back PDF | PhotoSarkari",
    description: "Combine Aadhaar front & back into one A4 PDF for PAN card applications. Free and 100% private.",
  },
};

export default function AadhaarMergerPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--cream)" }}>
      {/* Header */}
      <header className="hero-pattern relative" style={{ background: "linear-gradient(170deg, var(--navy) 0%, var(--navy-mid) 100%)" }}>
        <div className="max-w-5xl mx-auto px-4 pt-4 pb-5">
          <Link
            href="/"
            className="text-sm flex items-center gap-1.5 mb-3 transition-colors"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All Tools
          </Link>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
            Document Utilities
          </h1>
          <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
            Free tools for managing government document uploads securely.
          </p>
        </div>
        <div className="saffron-line" />
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full">
        <AadhaarMerger />
      </main>

      {/* Footer */}
      <footer className="border-t py-5 px-4" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>PhotoSarkari Document Utilities</p>
          <p className="text-[11px] mt-1" style={{ color: "var(--text-muted)" }}>
            100% Free &middot; No Server Uploads &middot; Data stays on your device
          </p>
        </div>
      </footer>
    </div>
  );
}

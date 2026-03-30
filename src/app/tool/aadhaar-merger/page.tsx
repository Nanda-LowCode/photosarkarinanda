import type { Metadata } from "next";
import Link from "next/link";
import AadhaarMerger from "@/components/AadhaarMerger";

export const metadata: Metadata = {
  title: "Merge Aadhaar Card Front & Back PDF | PhotoSarkari",
  description: "Securely combine the front and back scans of your Aadhaar Card into a single A4 PDF, perfectly formatted for PAN card application uploads. Free and 100% private.",
  alternates: { canonical: "https://photosarkari.com/tool/aadhaar-merger" },
  openGraph: {
    title: "Merge Aadhaar Card Front & Back PDF | PhotoSarkari",
    description: "Securely combine the front and back scans of your Aadhaar Card into a single A4 PDF. Free and 100% private — no server upload.",
    url: "https://photosarkari.com/tool/aadhaar-merger",
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
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-blue-800 text-white py-5 px-4 shadow-sm">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/"
            className="text-blue-300 hover:text-white text-sm flex items-center gap-1 mb-2 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All Tools
          </Link>
          <h1 className="text-2xl font-bold">Document Utilities</h1>
          <p className="text-blue-200 text-sm mt-1">Free tools for managing government document uploads securely.</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full">
        <AadhaarMerger />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 px-4">
        <div className="max-w-5xl mx-auto text-center text-sm text-gray-500">
          <p className="font-semibold text-gray-700">PhotoSarkari Document Utilities</p>
          <p className="mt-1">
            100% Free &nbsp;•&nbsp; No Server Uploads &nbsp;•&nbsp; Data stays on your device
          </p>
        </div>
      </footer>
    </div>
  );
}

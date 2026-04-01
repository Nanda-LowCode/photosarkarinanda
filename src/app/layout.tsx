import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://photosarkari.com"),
  title: "PhotoSarkari — Free Indian ID Photo Resizer | Aadhaar, PAN, Passport",
  description:
    "Resize your photo for Aadhaar, PAN Card, Passport, Voter ID, Driving License, SSC, UPSC, Railway exams — free, instant, no upload. Works offline on any device.",
  keywords:
    "aadhaar photo resize, pan card photo size, passport photo india, voter id photo, government id photo tool, free photo resizer india",
  openGraph: {
    title: "PhotoSarkari — Free Indian ID Photo Resizer",
    description:
      "Free tool to resize photos for all Indian government IDs and exam forms. No upload, works offline.",
    type: "website",
    url: "https://photosarkari.com",
    siteName: "PhotoSarkari",
  },
  twitter: {
    card: "summary_large_image",
    title: "PhotoSarkari — Free Indian ID Photo Resizer",
    description:
      "Free tool to resize photos for Aadhaar, PAN, Passport, Voter ID, SSC, UPSC and more. No upload, works offline.",
  },
  alternates: {
    canonical: "https://photosarkari.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9229787243154059"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.className} bg-gray-50 text-gray-900 antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

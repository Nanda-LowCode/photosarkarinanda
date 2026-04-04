import type { Metadata } from "next";
import { DM_Sans, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const heading = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://photosarkari.vercel.app"),
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
    url: "https://photosarkari.vercel.app",
    siteName: "PhotoSarkari",
  },
  twitter: {
    card: "summary_large_image",
    title: "PhotoSarkari — Free Indian ID Photo Resizer",
    description:
      "Free tool to resize photos for Aadhaar, PAN, Passport, Voter ID, SSC, UPSC and more. No upload, works offline.",
  },
  alternates: {
    canonical: "https://photosarkari.vercel.app",
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
      <body className={`${body.variable} ${heading.variable} font-sans antialiased`}
            style={{ fontFamily: "var(--font-body)" }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

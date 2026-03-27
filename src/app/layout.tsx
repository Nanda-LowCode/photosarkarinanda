import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
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
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}

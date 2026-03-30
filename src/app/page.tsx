"use client";

import DocumentCard from "@/components/DocumentCard";
import { presets } from "@/lib/presets";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Home() {
  const { t } = useI18n();
  const photoPresets = presets.filter((p) => p.category === "photo");
  const signaturePresets = presets.filter((p) => p.category === "signature");

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-800 text-white py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-end mb-3">
            <LanguageSwitcher />
          </div>
          <h1 className="flex justify-center mb-1">
            <img src="/logo.svg" alt="PhotoSarkari" className="h-11" />
          </h1>
          <p className="mt-2 text-blue-200 text-base">
            {t("siteTagline")} &nbsp;·&nbsp;{" "}
            <span className="font-devanagari">{t("siteSubtag")}</span>
          </p>
          <p className="mt-3 text-sm text-blue-300 max-w-xl mx-auto">
            {t("siteDescription")}
          </p>
        </div>
      </header>

      {/* Trust bar */}
      <div className="bg-blue-900 text-blue-100 py-2 px-4">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-x-6 gap-y-1 text-xs text-center">
          <span>✓ {t("trustFree")}</span>
          <span>✓ {t("trustNoUpload")}</span>
          <span>✓ {t("trustOffline")}</span>
          <span>✓ {t("trustMadeIn")}</span>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        {/* Photo section */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-blue-800 rounded-full inline-block"></span>
            {t("sectionPhotos")}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {photoPresets.map((preset) => (
              <DocumentCard key={preset.slug} preset={preset} />
            ))}
          </div>
        </section>

        {/* Signature section */}
        <section>
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-amber-500 rounded-full inline-block"></span>
            {t("sectionSignatures")}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {signaturePresets.map((preset) => (
              <DocumentCard key={preset.slug} preset={preset} />
            ))}
          </div>
        </section>

        {/* Utilities section */}
        <section className="mt-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-purple-500 rounded-full inline-block"></span>
            {t("sectionUtilities")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link href="/tool/aadhaar-merger" className="group block h-full">
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl p-5 hover:shadow-md transition-all h-full flex flex-col items-start cursor-pointer hover:-translate-y-1">
                <span className="bg-purple-600 text-white text-xs font-bold px-2 py-0.5 rounded-full mb-3 uppercase tracking-wide">
                  {t("newTool")}
                </span>
                <h3 className="font-bold text-gray-900 group-hover:text-purple-700 transition-colors text-lg">
                  {t("aadhaarMergerTitle")}
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  {t("aadhaarMergerDesc")}
                </p>
              </div>
            </Link>
          </div>
        </section>

        {/* How it works */}
        <section className="mt-12 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-base font-bold text-gray-800 mb-4">
            {t("howItWorks")}
          </h2>
          <ol className="space-y-3">
            {([t("step1"), t("step2"), t("step3"), t("step4")] as string[]).map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-800 text-white text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
          <p className="mt-4 text-xs text-gray-400">
            {t("howFootnote")}
          </p>
        </section>

        {/* Guides section */}
        <section className="mt-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-green-600 rounded-full inline-block"></span>
            {t("sectionGuides")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: "/guide/aadhaar-photo-size", title: "Aadhaar Photo Size", desc: "350×450 px, max 50KB — complete UIDAI specs & free tool" },
              { href: "/guide/pan-card-photo-resize", title: "PAN Card Photo & Signature", desc: "197×276 px photo + 354×157 px signature — NSDL/UTI specs" },
              { href: "/guide/passport-photo-size-india", title: "Indian Passport Photo", desc: "600×600 px square, max 300KB — MEA & Passport Seva specs" },
              { href: "/guide/ssc-photo-resize", title: "SSC Exam Photo & Signature", desc: "200×230 px photo + 400×180 px sig — CGL, CHSL, MTS, GD" },
              { href: "/guide/neet-photo-resize", title: "NEET Photo Size", desc: "200×230 px, max 200KB — NTA specs, no spectacles allowed" },
              { href: "/guide/jee-main-photo-resize", title: "JEE Main Photo Size", desc: "200×230 px, max 200KB — NTA specs for JEE Main & Advanced" },
              { href: "/guide/voter-id-photo-size", title: "Voter ID (EPIC) Photo Size", desc: "200×230 px, max 50KB — NVSP portal specs" },
              { href: "/guide/driving-license-photo-size", title: "Driving Licence Photo Size", desc: "200×230 px, max 100KB — Sarathi portal specs" },
              { href: "/guide/ibps-bank-photo-resize", title: "IBPS & Bank Exam Photo", desc: "200×230 px, max 100KB — IBPS PO, Clerk, RRB, SBI specs" },
              { href: "/guide/upsc-photo-resize", title: "UPSC Exam Photo Size", desc: "200×230 px, max 40KB — IAS, IPS, Civil Services specs" },
              { href: "/guide/railway-rrb-photo-resize", title: "Railway (RRB) Photo Size", desc: "200×230 px, max 50KB — RRB NTPC, Group D, ALP specs" },
            ].map((guide) => (
              <Link key={guide.href} href={guide.href} className="group block">
                <div className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-all hover:-translate-y-1 h-full">
                  <h3 className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{guide.desc}</p>
                  <span className="text-xs text-blue-600 font-medium mt-3 inline-block">{t("readGuide")}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 px-4 text-center">
        <p className="text-sm text-gray-500">
          {t("footerPrivacy")}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          {t("footerTagline")}
        </p>
      </footer>
    </div>
  );
}

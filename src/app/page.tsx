"use client";

import DocumentCard from "@/components/DocumentCard";
import { presets } from "@/lib/presets";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
    <path d="M4.5 7L6.2 8.7L9.5 5.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Home() {
  const { t } = useI18n();
  const photoPresets = presets.filter((p) => p.category === "photo");
  const signaturePresets = presets.filter((p) => p.category === "signature");

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--cream)" }}>
      {/* Hero */}
      <header className="hero-pattern relative" style={{ background: "linear-gradient(170deg, var(--navy) 0%, var(--navy-mid) 100%)" }}>
        <div className="max-w-3xl mx-auto px-4 pt-5 pb-8 sm:pt-6 sm:pb-10">
          <div className="flex justify-end mb-5">
            <LanguageSwitcher />
          </div>

          <div className="animate-fade-up">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="PhotoSarkari" className="h-10 sm:h-11 mb-4" />
          </div>

          <p className="animate-fade-up delay-1 text-white/90 text-base sm:text-lg font-medium leading-relaxed max-w-lg"
             style={{ fontFamily: "var(--font-heading)" }}>
            {t("siteTagline")}
          </p>
          <p className="animate-fade-up delay-2 text-white/40 text-sm mt-1.5 max-w-md">
            {t("siteDescription")}
          </p>
        </div>

        {/* Trust bar */}
        <div className="border-t border-white/5" style={{ background: "rgba(0,0,0,0.15)" }}>
          <div className="max-w-3xl mx-auto px-4 py-2.5 flex flex-wrap justify-center sm:justify-start gap-x-5 gap-y-1.5">
            {[t("trustFree"), t("trustNoUpload"), t("trustOffline"), t("trustMadeIn")].map((item, i) => (
              <span key={i} className="trust-pill"><CheckIcon />{item}</span>
            ))}
          </div>
        </div>

        {/* Saffron accent */}
        <div className="saffron-line" />
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8">
        {/* Photo section */}
        <section className="mb-10 animate-fade-up delay-3">
          <h2 className="text-base font-bold mb-4 flex items-center gap-2.5"
              style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
            <span className="section-bar" style={{ background: "var(--saffron)" }} />
            {t("sectionPhotos")}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {photoPresets.map((preset) => (
              <DocumentCard key={preset.slug} preset={preset} />
            ))}
          </div>
        </section>

        {/* Signature section */}
        <section className="mb-10 animate-fade-up delay-4">
          <h2 className="text-base font-bold mb-4 flex items-center gap-2.5"
              style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
            <span className="section-bar" style={{ background: "#7c3aed" }} />
            {t("sectionSignatures")}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {signaturePresets.map((preset) => (
              <DocumentCard key={preset.slug} preset={preset} />
            ))}
          </div>
        </section>

        {/* Utilities section */}
        <section className="mb-10 animate-fade-up delay-5">
          <h2 className="text-base font-bold mb-4 flex items-center gap-2.5"
              style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
            <span className="section-bar" style={{ background: "var(--green)" }} />
            {t("sectionUtilities")}
          </h2>
          <Link href="/tool/aadhaar-merger" className="group block">
            <div className="bg-white rounded-[var(--radius)] p-5 transition-all group-hover:-translate-y-0.5"
                 style={{ boxShadow: "var(--shadow-card)", border: "1px solid var(--border)" }}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                     style={{ background: "linear-gradient(135deg, var(--green), #0d7d5a)" }}>
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-[15px] group-hover:text-[var(--green)] transition-colors"
                        style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
                      {t("aadhaarMergerTitle")}
                    </h3>
                    <span className="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-full text-white"
                          style={{ background: "var(--green)" }}>
                      {t("newTool")}
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                    {t("aadhaarMergerDesc")}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </section>

        {/* How it works */}
        <section className="mb-10 animate-fade-up delay-6">
          <div className="bg-white rounded-[var(--radius)] p-5 sm:p-6"
               style={{ boxShadow: "var(--shadow-card)", border: "1px solid var(--border)" }}>
            <h2 className="text-base font-bold mb-5"
                style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
              {t("howItWorks")}
            </h2>
            <ol className="space-y-3.5">
              {([t("step1"), t("step2"), t("step3"), t("step4")] as string[]).map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "var(--text-secondary)" }}>
                  <span className="step-num">{i + 1}</span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-5 text-[11px] pl-10" style={{ color: "var(--text-muted)" }}>
              {t("howFootnote")}
            </p>
          </div>
        </section>

        {/* Guides section */}
        <section className="mb-8">
          <h2 className="text-base font-bold mb-4 flex items-center gap-2.5"
              style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
            <span className="section-bar" style={{ background: "var(--blue-link)" }} />
            {t("sectionGuides")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: "/guide/aadhaar-photo-size", title: "Aadhaar Photo Size", desc: "350x450 px, max 50KB — complete UIDAI specs & free tool" },
              { href: "/guide/pan-card-photo-resize", title: "PAN Card Photo & Signature", desc: "197x276 px photo + 354x157 px signature — NSDL/UTI specs" },
              { href: "/guide/passport-photo-size-india", title: "Indian Passport Photo", desc: "600x600 px square, max 300KB — MEA & Passport Seva specs" },
              { href: "/guide/ssc-photo-resize", title: "SSC Exam Photo & Signature", desc: "200x230 px photo + 400x180 px sig — CGL, CHSL, MTS, GD" },
              { href: "/guide/neet-photo-resize", title: "NEET Photo Size", desc: "200x230 px, max 200KB — NTA specs, no spectacles allowed" },
              { href: "/guide/jee-main-photo-resize", title: "JEE Main Photo Size", desc: "200x230 px, max 200KB — NTA specs for JEE Main & Advanced" },
              { href: "/guide/voter-id-photo-size", title: "Voter ID (EPIC) Photo Size", desc: "200x230 px, max 50KB — NVSP portal specs" },
              { href: "/guide/driving-license-photo-size", title: "Driving Licence Photo Size", desc: "200x230 px, max 100KB — Sarathi portal specs" },
              { href: "/guide/ibps-bank-photo-resize", title: "IBPS & Bank Exam Photo", desc: "200x230 px, max 100KB — IBPS PO, Clerk, RRB, SBI specs" },
              { href: "/guide/upsc-photo-resize", title: "UPSC Exam Photo Size", desc: "200x230 px, max 40KB — IAS, IPS, Civil Services specs" },
              { href: "/guide/railway-rrb-photo-resize", title: "Railway (RRB) Photo Size", desc: "200x230 px, max 50KB — RRB NTPC, Group D, ALP specs" },
            ].map((guide) => (
              <Link key={guide.href} href={guide.href} className="group block">
                <div className="guide-card bg-white rounded-[var(--radius)] p-4 sm:p-5 h-full"
                     style={{ boxShadow: "var(--shadow-card)", border: "1px solid var(--border)" }}>
                  <h3 className="font-semibold text-sm group-hover:text-[var(--saffron)] transition-colors"
                      style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
                    {guide.title}
                  </h3>
                  <p className="text-xs mt-1 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {guide.desc}
                  </p>
                  <span className="text-[11px] font-semibold mt-2.5 inline-block" style={{ color: "var(--saffron)" }}>
                    {t("readGuide")}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 px-4 text-center" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        <p className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
          {t("footerPrivacy")}
        </p>
        <p className="text-[11px] mt-1.5" style={{ color: "var(--text-muted)" }}>
          {t("footerTagline")}
        </p>
      </footer>
    </div>
  );
}

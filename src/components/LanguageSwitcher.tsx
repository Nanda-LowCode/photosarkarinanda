"use client";

import { useI18n, Locale } from "@/lib/i18n";

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();

  return (
    <div className="flex items-center gap-2">
      <span className="text-[11px] opacity-50">{t("langLabel")}</span>
      <div className="flex rounded-full p-0.5" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}>
        {(["en", "hi"] as Locale[]).map((lang) => (
          <button
            key={lang}
            onClick={() => setLocale(lang)}
            className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
              locale === lang
                ? "text-white shadow-sm"
                : "text-white/50 hover:text-white/80"
            }`}
            style={locale === lang ? { background: "var(--saffron)" } : undefined}
          >
            {lang === "en" ? "EN" : "HI"}
          </button>
        ))}
      </div>
    </div>
  );
}

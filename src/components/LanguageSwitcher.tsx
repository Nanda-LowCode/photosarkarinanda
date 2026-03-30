"use client";

import { useI18n, Locale } from "@/lib/i18n";

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-400">{t("langLabel")}</span>
      <div className="flex bg-gray-100 rounded-full p-0.5 border border-gray-200">
        {(["en", "hi"] as Locale[]).map((lang) => (
          <button
            key={lang}
            onClick={() => setLocale(lang)}
            className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
              locale === lang
                ? "bg-blue-700 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {lang === "en" ? "English" : "हिन्दी"}
          </button>
        ))}
      </div>
    </div>
  );
}

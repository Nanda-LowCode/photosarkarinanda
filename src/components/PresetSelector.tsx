"use client";

import { useRouter } from "next/navigation";
import { Preset } from "@/lib/presets";

export default function PresetSelector({
  currentSlug,
  presets,
}: {
  currentSlug: string;
  presets: Preset[];
}) {
  const router = useRouter();

  return (
    <div className="relative inline-block">
      <select
        value={currentSlug}
        onChange={(e) => router.push(`/tool/${e.target.value}`)}
        className="appearance-none border text-white font-bold text-xl md:text-2xl rounded-xl px-4 py-2 pr-10 outline-none cursor-pointer transition-colors focus:ring-2 focus:ring-white/30 w-full md:w-auto"
        style={{
          background: "rgba(255,255,255,0.06)",
          borderColor: "rgba(255,255,255,0.1)",
          fontFamily: "var(--font-heading)",
        }}
      >
        <optgroup label="Photos">
          {presets.filter(p => p.category === "photo").map((p) => (
            <option key={p.slug} value={p.slug} className="text-gray-900 bg-white">
              {p.name}
            </option>
          ))}
        </optgroup>
        <optgroup label="Signatures">
          {presets.filter(p => p.category === "signature").map((p) => (
            <option key={p.slug} value={p.slug} className="text-gray-900 bg-white">
              {p.name}
            </option>
          ))}
        </optgroup>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3" style={{ color: "var(--saffron-light)" }}>
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}

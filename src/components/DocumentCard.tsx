import Link from "next/link";
import { Preset } from "@/lib/presets";

type Props = {
  preset: Preset;
};

export default function DocumentCard({ preset }: Props) {
  const isPhoto = preset.category === "photo";

  return (
    <Link href={`/tool/${preset.slug}`} className="block group">
      <div className="card-accent bg-white rounded-[var(--radius)] p-4 sm:p-5 transition-all duration-200 group-hover:-translate-y-0.5"
           style={{ boxShadow: "var(--shadow-card)", border: "1px solid var(--border)" }}>
        <div className="flex items-start justify-between mb-2.5">
          <span
            className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
            style={{
              background: isPhoto ? "var(--saffron-glow)" : "rgba(139, 92, 246, 0.1)",
              color: isPhoto ? "var(--saffron)" : "#7c3aed",
            }}
          >
            {isPhoto ? "Photo" : "Signature"}
          </span>
          <span className="text-[10px] font-medium" style={{ color: "var(--text-muted)" }}>
            {preset.maxKB} KB
          </span>
        </div>

        <h3
          className="font-semibold text-[15px] leading-snug mb-1 group-hover:text-[var(--saffron)] transition-colors"
          style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
        >
          {preset.name}
        </h3>
        <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          {preset.description}
        </p>

        <div className="mt-3 flex items-center text-xs font-semibold group-hover:gap-2 transition-all" style={{ color: "var(--saffron)", gap: "4px" }}>
          <span>Resize</span>
          <svg
            className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}

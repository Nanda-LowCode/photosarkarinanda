import Link from "next/link";
import { Preset } from "@/lib/presets";

type Props = {
  preset: Preset;
};

export default function DocumentCard({ preset }: Props) {
  return (
    <Link href={`/tool/${preset.slug}`} className="block group">
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200 group-hover:-translate-y-0.5">
        <div className="flex items-start justify-between mb-3">
          <div
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              preset.category === "photo"
                ? "bg-blue-50 text-blue-700"
                : "bg-amber-50 text-amber-700"
            }`}
          >
            {preset.category === "photo" ? "Photo" : "Signature"}
          </div>
          <span className="text-xs text-gray-400">max {preset.maxKB} KB</span>
        </div>

        <h3 className="font-semibold text-gray-900 text-base mb-1 group-hover:text-blue-800 transition-colors">
          {preset.name}
        </h3>
        <p className="text-sm text-gray-500">{preset.description}</p>

        <div className="mt-4 flex items-center text-blue-700 text-sm font-medium">
          <span>Resize Photo</span>
          <svg
            className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}

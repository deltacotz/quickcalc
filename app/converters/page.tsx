import type { Metadata } from "next";
import Link from "next/link";
import { DIMENSIONS } from "@/lib/convert";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `Unit Converters — ${SITE_NAME}`,
  description:
    "Free online unit converters for length, weight, temperature, area, volume, speed, data storage and time — with instant conversions and tables.",
};

export default function ConvertersIndex() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Unit converters</h1>
      <p className="mt-3 max-w-2xl text-lg text-zinc-600">
        Convert between metric and imperial units instantly. Choose a category to convert any pair
        of units, with conversion tables for common values.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {DIMENSIONS.map((d) => (
          <Link
            key={d.id}
            href={`/converters/${d.id}`}
            className="block rounded-lg border border-zinc-200 bg-white p-4 transition-colors hover:border-blue-400 hover:bg-blue-50/40"
          >
            <h2 className="font-semibold text-zinc-900">{d.label} Converter</h2>
            <p className="mt-1 text-sm leading-snug text-zinc-600">{d.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

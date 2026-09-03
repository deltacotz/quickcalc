import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPairs, resolvePair, pairSlug, getDimension, convert, getRelatedPairs } from "@/lib/convert";
import { DIMENSION_TOOLS } from "@/lib/crosslinks";
import { formatConverted } from "@/lib/format";
import { ConverterWidget } from "@/components/ConverterWidget";
import { ConversionTable } from "@/components/ConversionTable";
import { AdSlot } from "@/components/AdSlot";
import { AdSenseScript } from "@/components/AdSenseScript";
import { JsonLd } from "@/components/JsonLd";
import { ShareButton } from "@/components/ShareButton";
import { SITE_URL } from "@/lib/site";
import { breadcrumbSchema, openGraph, buildConverterPairDescription } from "@/lib/seo";

interface Props {
  params: Promise<{ category: string; pair: string }>;
}

export function generateStaticParams() {
  return getAllPairs().map((p) => ({
    category: p.dimensionId,
    pair: pairSlug(p.from.id, p.to.id),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, pair } = await params;
  const p = resolvePair(category, pair);
  if (!p) return {};
  const url = `${SITE_URL}/converters/${category}/${pair}`;
  const title = `${p.from.label} to ${p.to.label} Converter`;
  const description = buildConverterPairDescription(p.from.label, p.to.label);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: openGraph({ title, description, url }),
  };
}

export default async function ConverterPairPage({ params }: Props) {
  const { category, pair } = await params;
  const p = resolvePair(category, pair);
  if (!p) notFound();
  const dim = getDimension(category);

  // Related conversions for internal linking: reverse pair + same-unit siblings.
  const relatedPairs = getRelatedPairs(category, p.from.id, p.to.id, 8);

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${p.from.label} to ${p.to.label} Converter`,
    url: `${SITE_URL}/converters/${category}/${pair}`,
    description: `Convert ${p.from.label} (${p.from.symbol}) to ${p.to.label} (${p.to.symbol}).`,
  };

  return (
    <>
      <AdSenseScript />
      <JsonLd data={webPageSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE_URL },
          { name: "Converters", url: `${SITE_URL}/converters` },
          { name: dim?.label ?? category, url: `${SITE_URL}/converters/${category}` },
          { name: `${p.from.label} to ${p.to.label}`, url: `${SITE_URL}/converters/${category}/${pair}` },
        ])}
      />
      <div className="mx-auto max-w-3xl px-4 py-8">
        <nav aria-label="Breadcrumb" className="text-sm text-zinc-500">
          <Link href="/" className="hover:text-zinc-800">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/converters" className="hover:text-zinc-800">
            Converters
          </Link>
          <span className="mx-2">/</span>
          <Link href={`/converters/${dim?.id}`} className="hover:text-zinc-800">
            {dim?.label}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-700">
            {p.from.label} to {p.to.label}
          </span>
        </nav>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900">
          {p.from.label} to {p.to.label} Converter
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-zinc-600">
          Convert {p.from.label} ({p.from.symbol}) to {p.to.label} ({p.to.symbol}) instantly, or use
          the conversion table below to look up common values.
        </p>

        <div className="mt-6">
          <ConverterWidget
            key={`${category}-${pair}`}
            dimensionId={category}
            defaultFrom={p.from.id}
            defaultTo={p.to.id}
          />
        </div>

        <div className="mt-4">
          <ShareButton
            url={`${SITE_URL}/converters/${category}/${pair}`}
            title={`${p.from.label} to ${p.to.label} Converter`}
          />
        </div>

        <AdSlot className="mt-8" />

        <section className="mt-10">
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900">
            {p.from.label} to {p.to.label} conversion table
          </h2>
          <div className="mt-4">
            <ConversionTable from={p.from} to={p.to} />
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900">
            How to convert {p.from.label} to {p.to.label}
          </h2>
          <p className="mt-2 text-zinc-600">
            1 {p.from.symbol} equals {formatConverted(convert(1, p.from, p.to))} {p.to.symbol}. Use
            the converter above for any value, or read the table for common conversions.
          </p>
        </section>

        {relatedPairs.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-semibold tracking-tight text-zinc-900">
              Related conversions
            </h2>
            <p className="mt-2 text-sm text-zinc-600">
              More {dim?.label.toLowerCase()} conversions you can convert instantly.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {relatedPairs.map((rp) => (
                <Link
                  key={`${rp.from.id}-${rp.to.id}`}
                  href={`/converters/${category}/${pairSlug(rp.from.id, rp.to.id)}`}
                  className="rounded-full border border-zinc-200 px-3 py-1.5 text-sm text-zinc-700 hover:border-blue-400 hover:bg-blue-50"
                >
                  {rp.from.label} to {rp.to.label}
                </Link>
              ))}
            </div>
          </section>
        )}

        {(DIMENSION_TOOLS[category]?.length ?? 0) > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-semibold tracking-tight text-zinc-900">
              Related calculators
            </h2>
            <p className="mt-2 text-sm text-zinc-600">
              Try these calculators that use {dim?.label.toLowerCase()} measurements.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {DIMENSION_TOOLS[category]!.map((t) => (
                <Link
                  key={t.slug}
                  href={`/tools/${t.slug}`}
                  className="rounded-full border border-zinc-200 px-3 py-1.5 text-sm text-zinc-700 hover:border-blue-400 hover:bg-blue-50"
                >
                  {t.name}
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}

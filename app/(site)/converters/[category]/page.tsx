import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DIMENSIONS, getDimension, pairSlug } from "@/lib/convert";
import { DIMENSION_TOOLS } from "@/lib/crosslinks";
import { ConverterWidget } from "@/components/ConverterWidget";
import { AdSlot } from "@/components/AdSlot";
import { AdSenseScript } from "@/components/AdSenseScript";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site";
import { breadcrumbSchema, openGraph } from "@/lib/seo";

interface Props {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return DIMENSIONS.map((d) => ({ category: d.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const dim = getDimension(category);
  if (!dim) return {};
  const url = `${SITE_URL}/converters/${dim.id}`;
  const title = `${dim.label} Converter — Free Online Unit Converter`;
  return {
    title,
    description: dim.description,
    alternates: { canonical: url },
    openGraph: openGraph({ title, description: dim.description, url }),
  };
}

export default async function ConverterCategoryPage({ params }: Props) {
  const { category } = await params;
  const dim = getDimension(category);
  if (!dim) notFound();

  // Pick a handful of popular ordered pairs for quick links.
  const popular = dim.units.slice(0, Math.min(4, dim.units.length));
  const pairs: { from: string; to: string; fromLabel: string; toLabel: string }[] = [];
  for (const from of popular) {
    for (const to of dim.units) {
      if (from.id !== to.id && pairs.length < 12) {
        pairs.push({ from: from.id, to: to.id, fromLabel: from.label, toLabel: to.label });
      }
    }
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dim.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <AdSenseScript />
      <JsonLd data={faqSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE_URL },
          { name: "Converters", url: `${SITE_URL}/converters` },
          { name: dim.label, url: `${SITE_URL}/converters/${dim.id}` },
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
          <span className="text-zinc-700">{dim.label}</span>
        </nav>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900">
          {dim.label} Converter
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-zinc-600">{dim.description}</p>

        <div className="mt-6">
          <ConverterWidget key={dim.id} dimensionId={dim.id} />
        </div>

        <AdSlot className="mt-8" />

        <section className="mt-10">
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900">
            Popular conversions
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {pairs.map((p) => (
              <Link
                key={`${p.from}-${p.to}`}
                href={`/converters/${dim.id}/${pairSlug(p.from, p.to)}`}
                className="rounded-full border border-zinc-200 px-3 py-1.5 text-sm text-zinc-700 hover:border-blue-400 hover:bg-blue-50"
              >
                {p.fromLabel} to {p.toLabel}
              </Link>
            ))}
          </div>
        </section>

        <FaqSection faq={dim.faq} />

        {(DIMENSION_TOOLS[dim.id]?.length ?? 0) > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-semibold tracking-tight text-zinc-900">
              Related calculators
            </h2>
            <p className="mt-2 text-sm text-zinc-600">
              Try these calculators that use {dim.label.toLowerCase()} measurements.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {DIMENSION_TOOLS[dim.id]!.map((t) => (
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

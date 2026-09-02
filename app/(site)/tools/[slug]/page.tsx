import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTool, TOOLS, type ToolContent } from "@/content/tools";
import { getToolDimensions } from "@/lib/crosslinks";
import { getDimension } from "@/lib/convert";
import { CalculatorWidget } from "@/components/CalculatorWidget";
import { GpaCalculator } from "@/components/GpaCalculator";
import { CurrencyConverter } from "@/components/CurrencyConverter";
import { TimezoneConverter } from "@/components/TimezoneConverter";
import { HowItWorks } from "@/components/HowItWorks";
import { ExampleSection } from "@/components/ExampleSection";
import { FaqSection } from "@/components/FaqSection";
import { MobileMoneyFees } from "@/components/MobileMoneyFees";
import { UttFunds } from "@/components/UttFunds";
import { Disclaimers } from "@/components/Disclaimers";
import { AdSlot } from "@/components/AdSlot";
import { JsonLd } from "@/components/JsonLd";
import { ToolCard } from "@/components/ToolCard";
import { EmbedCode } from "@/components/EmbedCode";
import { SITE_URL } from "@/lib/site";
import { breadcrumbSchema, openGraph } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) return {};
  const url = `${SITE_URL}/tools/${tool.slug}`;
  const title = `${tool.name} — Free Online Calculator`;
  return {
    title,
    description: tool.metaDescription,
    alternates: { canonical: url },
    openGraph: openGraph({ title, description: tool.metaDescription, url }),
  };
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();

  const related = tool.related
    .map((s) => TOOLS.find((t) => t.slug === s))
    .filter((t): t is ToolContent => Boolean(t));

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tool.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: tool.name,
    url: `${SITE_URL}/tools/${tool.slug}`,
    description: tool.metaDescription,
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={webPageSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE_URL },
          { name: "Calculators", url: `${SITE_URL}/#calculators` },
          { name: tool.name, url: `${SITE_URL}/tools/${tool.slug}` },
        ])}
      />
      <div className="mx-auto max-w-3xl px-4 py-8">
        <nav aria-label="Breadcrumb" className="text-sm text-zinc-500">
          <Link href="/" className="hover:text-zinc-800">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/#calculators" className="hover:text-zinc-800">
            Calculators
          </Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-700">{tool.name}</span>
        </nav>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900">{tool.name}</h1>
        <p className="mt-3 text-lg leading-relaxed text-zinc-600">{tool.intro}</p>

        <div className="mt-6">
          {tool.kind === "gpa" ? (
            <GpaCalculator />
          ) : tool.kind === "currency" ? (
            <CurrencyConverter />
          ) : tool.kind === "timezone" ? (
            <TimezoneConverter />
          ) : (
            <CalculatorWidget slug={tool.slug} />
          )}
        </div>

        <AdSlot className="mt-8" />

        <HowItWorks formula={tool.howItWorks.formula} explanation={tool.howItWorks.explanation} />
        <ExampleSection examples={tool.examples} />
        {tool.slug === "mobile-money-fee-calculator" && <MobileMoneyFees />}
        {tool.slug === "utt-calculator" && <UttFunds />}
        <FaqSection faq={tool.faq} />

        {tool.disclaimers && <Disclaimers kinds={tool.disclaimers} />}

        {related.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-semibold tracking-tight text-zinc-900">
              Related calculators
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {related.map((t) => (
                <ToolCard
                  key={t.slug}
                  slug={t.slug}
                  name={t.name}
                  category={t.category}
                  description={t.metaDescription}
                />
              ))}
            </div>
          </section>
        )}

        {getToolDimensions(slug).length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-semibold tracking-tight text-zinc-900">
              Related unit converters
            </h2>
            <p className="mt-2 text-sm text-zinc-600">
              Convert the units used by this calculator.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {getToolDimensions(slug).map((dimId) => {
                const dim = getDimension(dimId);
                if (!dim) return null;
                return (
                  <Link
                    key={dimId}
                    href={`/converters/${dimId}`}
                    className="rounded-full border border-zinc-200 px-3 py-1.5 text-sm text-zinc-700 hover:border-blue-400 hover:bg-blue-50"
                  >
                    {dim.label} Converter
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        <div className="mt-10">
          <EmbedCode slug={tool.slug} siteUrl={SITE_URL} />
        </div>
      </div>
    </>
  );
}

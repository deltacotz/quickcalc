import type { Metadata } from "next";
import Link from "next/link";
import { TOOLS, type ToolCategory } from "@/content/tools";
import { DIMENSIONS } from "@/lib/convert";
import { SITE_NAME, SITE_TAGLINE, SITE_DESCRIPTION, SITE_URL } from "@/lib/site";
import { openGraph } from "@/lib/seo";
import { ToolCard } from "@/components/ToolCard";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  alternates: { canonical: SITE_URL },
  openGraph: openGraph({
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  }),
};

const CATEGORIES: ToolCategory[] = ["Everyday", "Finance", "Health", "Education", "Home"];

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_TAGLINE,
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/apple-icon.png`,
  sameAs: ["https://x.com/tzcalculator", "https://www.instagram.com/tzcalculator"],
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: SITE_NAME,
  url: SITE_URL,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: SITE_DESCRIPTION,
  featureList:
    "USD to TZS converter, Tanzania PAYE calculator, loan calculator, mortgage calculator, percentage calculator, BMI calculator, and metric/imperial unit converters.",
};

export default function Home() {
  return (
    <>
      <JsonLd data={websiteSchema} />
      <JsonLd data={organizationSchema} />
      <JsonLd data={webAppSchema} />
      <div className="mx-auto max-w-5xl px-4 py-8">
        <section className="rounded-2xl bg-blue-600 px-6 py-10 text-white">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Free calculators &amp; unit converters
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-blue-100">
            Fast, accurate online calculators for percentages, BMI, mortgages, loans, salaries,
            calories and more — plus converters for length, weight, temperature, area, volume,
            speed, data and time.
          </p>
        </section>

        <section id="calculators" className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight">Calculators</h2>
          {CATEGORIES.map((cat) => (
            <div key={cat} className="mt-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">{cat}</h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {TOOLS.filter((t) => t.category === cat).map((t) => (
                  <ToolCard
                    key={t.slug}
                    slug={t.slug}
                    name={t.name}
                    category={t.category}
                    description={t.metaDescription}
                  />
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">Unit converters</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {DIMENSIONS.map((d) => (
              <Link
                key={d.id}
                href={`/converters/${d.id}`}
                className="block rounded-lg border border-zinc-200 bg-white p-4 transition-colors hover:border-blue-400 hover:bg-blue-50/40"
              >
                <h3 className="font-semibold text-zinc-900">{d.label} Converter</h3>
                <p className="mt-1 text-sm leading-snug text-zinc-600">{d.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

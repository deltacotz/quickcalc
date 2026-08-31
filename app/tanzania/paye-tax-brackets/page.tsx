import type { Metadata } from "next";
import Link from "next/link";
import { PAYE_BANDS } from "@/lib/calculators/tanzania";
import { SITE_URL } from "@/lib/site";
import { openGraph, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { FaqSection } from "@/components/FaqSection";

const BANDS = PAYE_BANDS.map((b, i) => {
  const prev = i === 0 ? 0 : PAYE_BANDS[i - 1].upTo;
  const from = prev === 0 ? 0 : prev + 1;
  const label =
    b.upTo === Infinity
      ? `Above ${from.toLocaleString("en-US")}`
      : `${from.toLocaleString("en-US")} – ${b.upTo.toLocaleString("en-US")}`;
  return { label, rate: b.rate };
});

const FAQ = [
  { q: "What is PAYE?", a: "Pay As You Earn is the income tax deducted from employment income each month before you're paid." },
  { q: "What is the tax-free threshold in Tanzania?", a: "The first 270,000 TZS of monthly income is taxed at 0%." },
  { q: "Are these bands monthly or annual?", a: "These are the monthly PAYE bands for resident employees. For annual (non-employment) income, the equivalent annual thresholds apply." },
  { q: "Do these rates change?", a: "Yes — the bands can change in each year's national budget. Always verify with the Tanzania Revenue Authority (TRA)." },
];

export const metadata: Metadata = {
  title: "Tanzania PAYE Tax Brackets (TRA)",
  description:
    "Current Tanzania PAYE income tax bands for resident employees — monthly income thresholds and rates, with examples.",
  alternates: { canonical: `${SITE_URL}/tanzania/paye-tax-brackets` },
  openGraph: openGraph({
    title: "Tanzania PAYE Tax Brackets (TRA)",
    description:
      "Current Tanzania PAYE income tax bands for resident employees — monthly income thresholds and rates, with examples.",
    url: `${SITE_URL}/tanzania/paye-tax-brackets`,
  }),
};

export default function Page() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Tanzania PAYE Tax Brackets",
    url: `${SITE_URL}/tanzania/paye-tax-brackets`,
    description: "Tanzania PAYE income tax bands for resident employees.",
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={webPageSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE_URL },
          { name: "Tanzania", url: `${SITE_URL}/tanzania` },
          { name: "PAYE Tax Brackets", url: `${SITE_URL}/tanzania/paye-tax-brackets` },
        ])}
      />
      <div className="mx-auto max-w-3xl px-4 py-8">
        <nav aria-label="Breadcrumb" className="text-sm text-zinc-500">
          <Link href="/" className="hover:text-zinc-800">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/tanzania" className="hover:text-zinc-800">Tanzania</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-700">PAYE Tax Brackets</span>
        </nav>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900">Tanzania PAYE Tax Brackets</h1>
        <p className="mt-3 text-lg leading-relaxed text-zinc-600">
          The current monthly Pay As You Earn (PAYE) income tax bands for resident employees in
          Tanzania. Tax is progressive — each band&apos;s rate applies only to income within that band.
        </p>

        <div className="mt-6 overflow-x-auto rounded-lg border border-zinc-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50 text-left text-zinc-600">
                <th className="px-4 py-2 font-medium">Monthly income (TZS)</th>
                <th className="px-4 py-2 font-medium">Rate</th>
              </tr>
            </thead>
            <tbody>
              {BANDS.map((b) => (
                <tr key={b.label} className="border-b border-zinc-100 last:border-0">
                  <td className="px-4 py-2 text-zinc-900">{b.label}</td>
                  <td className="px-4 py-2 text-zinc-900">{b.rate === 0 ? "0%" : `${Math.round(b.rate * 100)}%`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-xs text-zinc-400">
          Rates are indicative and may change with the annual budget. Verify with the Tanzania
          Revenue Authority (TRA).
        </p>

        <p className="mt-6 text-zinc-600">
          <strong>Example:</strong> a 1,000,000 TZS gross monthly salary pays 128,000 TZS in PAYE,
          leaving about 872,000 TZS take-home.
        </p>

        <Link
          href="/tools/tanzania-paye-calculator"
          className="mt-6 inline-block rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
        >
          Calculate your take-home pay →
        </Link>

        <FaqSection faq={FAQ} />
      </div>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { openGraph, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { FaqSection } from "@/components/FaqSection";

const FAQ = [
  { q: "What is the currency of Tanzania?", a: "The Tanzanian Shilling (TZS). One shilling is divided into 100 senti, though prices are typically quoted in whole shillings." },
  { q: "How does the USD to TZS exchange rate work?", a: "The rate is the number of Tanzanian Shillings you receive for one US Dollar. It floats with the market and changes daily." },
  { q: "Where can I exchange money in Tanzania?", a: "Banks, bureaux de change (forex bureaus) and mobile-money services. Rates vary slightly between providers." },
  { q: "Is USD accepted in Tanzania?", a: "US Dollars are accepted at some hotels and tourist businesses, but most everyday payments require Tanzanian Shillings." },
];

export const metadata: Metadata = {
  title: "Tanzania Currency & USD↔TZS Guide",
  description:
    "A plain-language guide to the Tanzanian Shilling (TZS), how the USD↔TZS exchange rate works, and where to exchange money in Tanzania.",
  alternates: { canonical: `${SITE_URL}/tanzania/currency` },
  openGraph: openGraph({
    title: "Tanzania Currency & USD↔TZS Guide",
    description:
      "A plain-language guide to the Tanzanian Shilling (TZS), how the USD↔TZS exchange rate works, and where to exchange money in Tanzania.",
    url: `${SITE_URL}/tanzania/currency`,
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
    name: "Tanzania Currency & USD↔TZS Guide",
    url: `${SITE_URL}/tanzania/currency`,
    description: "Guide to the Tanzanian Shilling and USD↔TZS exchange.",
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={webPageSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE_URL },
          { name: "Tanzania", url: `${SITE_URL}/tanzania` },
          { name: "Currency Guide", url: `${SITE_URL}/tanzania/currency` },
        ])}
      />
      <div className="mx-auto max-w-3xl px-4 py-8">
        <nav aria-label="Breadcrumb" className="text-sm text-zinc-500">
          <Link href="/" className="hover:text-zinc-800">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/tanzania" className="hover:text-zinc-800">Tanzania</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-700">Currency Guide</span>
        </nav>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900">
          Tanzania Currency &amp; USD↔TZS Guide
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-zinc-600">
          A short guide to the Tanzanian Shilling and how the US Dollar ↔ Tanzanian Shilling
          exchange rate works.
        </p>

        <section className="mt-8">
          <h2 className="text-xl font-semibold text-zinc-900">What is the Tanzanian Shilling?</h2>
          <p className="mt-2 text-zinc-600">
            The Tanzanian Shilling (TZS) is the currency of Tanzania. Banknotes and coins are issued
            by the Bank of Tanzania (BoT). In practice, everyday prices are quoted in whole
            shillings.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold text-zinc-900">How the USD↔TZS rate works</h2>
          <p className="mt-2 text-zinc-600">
            The exchange rate is the number of shillings you get for one US Dollar. It moves with
            the market and is quoted differently by each bank and forex bureau, so the rate you see
            online is indicative — your provider adds a small margin.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold text-zinc-900">Where to exchange money</h2>
          <p className="mt-2 text-zinc-600">
            Banks, bureaux de change (forex bureaus) and mobile-money services all exchange dollars
            and shillings. For the best rate, compare a couple of providers before converting a
            large amount.
          </p>
        </section>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/usd-to-tzs" className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700">
            USD to TZS converter →
          </Link>
          <Link href="/tzs-to-usd" className="rounded-md border border-blue-600 px-4 py-2 font-medium text-blue-700 hover:bg-blue-50">
            TZS to USD converter →
          </Link>
        </div>

        <FaqSection faq={FAQ} />
      </div>
    </>
  );
}

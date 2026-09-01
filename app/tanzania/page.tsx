import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { openGraph } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { FaqSection } from "@/components/FaqSection";

const MONEY = [
  { href: "/usd-to-tzs", title: "USD to TZS", desc: "US Dollar to Tanzanian Shilling" },
  { href: "/tzs-to-usd", title: "TZS to USD", desc: "Tanzanian Shilling to US Dollar" },
  { href: "/tools/tanzania-paye-calculator", title: "Tanzania PAYE Calculator", desc: "Take-home pay after PAYE tax" },
  { href: "/tools/tanzania-vat-calculator", title: "Tanzania VAT Calculator", desc: "Add or remove 18% VAT" },
  { href: "/tools/mobile-money-fee-calculator", title: "Mobile Money Fees", desc: "M-Pesa, Airtel & Mixx send/withdraw fees" },
  { href: "/tools/utt-calculator", title: "UTT Calculator", desc: "Project UTT AMIS unit trust returns" },
  { href: "/tools/loan-calculator", title: "Loan Calculator", desc: "Monthly payments in TZS or USD" },
  { href: "/tools/salary-to-hourly-calculator", title: "Salary to Hourly", desc: "Convert a TZS salary to hourly pay" },
  { href: "/tools/mortgage-calculator", title: "Mortgage Calculator", desc: "Estimate monthly mortgage payments" },
];

const EVERYDAY = [
  { href: "/tools/fuel-cost-calculator", title: "Fuel Cost Calculator", desc: "Metric (km · km/L · TZS/liter)" },
  { href: "/tools/percentage-calculator", title: "Percentage Calculator", desc: "Work out percentages instantly" },
  { href: "/tools/discount-calculator", title: "Discount Calculator", desc: "Sale prices and savings" },
  { href: "/tools/tip-calculator", title: "Tip Calculator", desc: "Split bills and calculate tips" },
];

const CONVERTERS = [
  { href: "/converters/length", title: "Length Converter", desc: "Meters, kilometers, feet, miles" },
  { href: "/converters/weight", title: "Weight Converter", desc: "Kilograms, pounds, stones" },
  { href: "/converters/temperature", title: "Temperature Converter", desc: "Celsius, Fahrenheit, Kelvin" },
  { href: "/converters/volume", title: "Volume Converter", desc: "Liters, gallons, milliliters" },
];

const FAQ = [
  {
    q: "Do these calculators work with Tanzanian Shillings (TZS)?",
    a: "Yes. Use the USD/TZS toggle in the header to switch any money calculator to Tanzanian Shillings.",
  },
  {
    q: "What is the currency of Tanzania?",
    a: "The Tanzanian Shilling (TZS). One shilling is divided into 100 senti, though shillings are typically quoted as whole numbers.",
  },
  {
    q: "Which measurement system does Tanzania use?",
    a: "Tanzania uses the metric system — kilometers, kilograms, liters and Celsius.",
  },
];

export const metadata: Metadata = {
  title: "Tanzania Calculators & Converters — TZS, Metric & Currency",
  description:
    "Free calculators and converters for Tanzania: convert USD to TZS, calculate loans and salaries in Tanzanian Shillings, and use metric unit converters.",
  alternates: { canonical: `${SITE_URL}/tanzania` },
  openGraph: openGraph({
    title: "Tanzania Calculators & Converters — TZS, Metric & Currency",
    description:
      "Free calculators and converters for Tanzania: convert USD to TZS, calculate loans and salaries in Tanzanian Shillings, and use metric unit converters.",
    url: `${SITE_URL}/tanzania`,
  }),
};

export default function TanzaniaPage() {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Tanzania Calculators & Converters",
    url: `${SITE_URL}/tanzania`,
    description:
      "Free calculators and converters for Tanzania: USD to TZS, TZS loans and salaries, and metric unit converters.",
  };

  return (
    <>
      <JsonLd data={webPageSchema} />
      <div className="mx-auto max-w-5xl px-4 py-8">
        <nav aria-label="Breadcrumb" className="text-sm text-zinc-500">
          <Link href="/" className="hover:text-zinc-800">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-700">Tanzania</span>
        </nav>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900">
          Tanzania Calculators &amp; Converters
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-zinc-600">
          Free calculators and converters for Tanzania — convert USD to TZS, work out loans and
          salaries in Tanzanian Shillings, and use metric unit converters.
        </p>

        <section className="mt-10">
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900">Money &amp; currency</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {MONEY.map((c) => (
              <Link key={c.href} href={c.href} className="rounded-lg border border-zinc-200 bg-white p-4 transition-colors hover:border-blue-400 hover:bg-blue-50/40">
                <h3 className="font-semibold text-zinc-900">{c.title}</h3>
                <p className="mt-1 text-sm text-zinc-600">{c.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900">Everyday</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {EVERYDAY.map((c) => (
              <Link key={c.href} href={c.href} className="rounded-lg border border-zinc-200 bg-white p-4 transition-colors hover:border-blue-400 hover:bg-blue-50/40">
                <h3 className="font-semibold text-zinc-900">{c.title}</h3>
                <p className="mt-1 text-sm text-zinc-600">{c.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900">Unit converters</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {CONVERTERS.map((c) => (
              <Link key={c.href} href={c.href} className="rounded-lg border border-zinc-200 bg-white p-4 transition-colors hover:border-blue-400 hover:bg-blue-50/40">
                <h3 className="font-semibold text-zinc-900">{c.title}</h3>
                <p className="mt-1 text-sm text-zinc-600">{c.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900">Guides &amp; reference</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/tanzania/paye-tax-brackets" className="rounded-lg border border-zinc-200 bg-white p-4 transition-colors hover:border-blue-400 hover:bg-blue-50/40">
              <h3 className="font-semibold text-zinc-900">PAYE Tax Brackets</h3>
              <p className="mt-1 text-sm text-zinc-600">Current TRA resident income tax bands</p>
            </Link>
            <Link href="/tanzania/currency" className="rounded-lg border border-zinc-200 bg-white p-4 transition-colors hover:border-blue-400 hover:bg-blue-50/40">
              <h3 className="font-semibold text-zinc-900">Currency Guide</h3>
              <p className="mt-1 text-sm text-zinc-600">How the TZS and USD↔TZS rate work</p>
            </Link>
          </div>
        </section>

        <div className="mt-10">
          <FaqSection faq={FAQ} />
        </div>
      </div>
    </>
  );
}

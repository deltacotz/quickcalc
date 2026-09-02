import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, SITE_TAGLINE, SITE_URL, CONTACT_EMAIL } from "@/lib/site";
import { openGraph, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";

const FACTS = [
  { label: "Calculators", value: "25+" },
  { label: "Converter categories", value: "11" },
  { label: "Domain", value: "calculator.co.tz" },
];

const DESC = {
  oneLiner: `${SITE_NAME} — ${SITE_TAGLINE}.`,
  short:
    `${SITE_NAME} is a free collection of online calculators and unit converters for Tanzania and worldwide — USD to TZS, PAYE tax, mobile-money fees, mortgage and loan payments, and metric/imperial conversion.`,
  long:
    `${SITE_NAME} (${SITE_URL.replace(/^https?:\/\//, "")}) offers ${FACTS[0].value} free calculators across everyday, finance, health and home topics, plus ${FACTS[1].value} unit-converter categories (length, weight, temperature, area, volume, speed, data, time, power, energy, pressure). Every tool is free, no sign-up required, and each page includes its formula and worked examples.`,
};

const ANCHOR_TEXT = [
  "calculator.co.tz",
  "Tanzania PAYE calculator",
  "USD to TZS converter",
  "free online calculators",
  "a free unit converter",
];

export const metadata: Metadata = {
  title: "Press & Brand Resources — Calculator",
  description:
    "Brand assets, site description, fact sheet and contact for Calculator.co.tz — free calculators and unit converters for Tanzania.",
  alternates: { canonical: `${SITE_URL}/press` },
  openGraph: openGraph({
    title: "Press & Brand Resources — Calculator",
    description:
      "Brand assets, site description, fact sheet and contact for Calculator.co.tz — free calculators and unit converters for Tanzania.",
    url: `${SITE_URL}/press`,
  }),
};

export default function PressPage() {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Press & Brand Resources",
    url: `${SITE_URL}/press`,
    description: "Brand assets and fact sheet for Calculator.co.tz.",
  };

  return (
    <>
      <JsonLd data={webPageSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE_URL },
          { name: "Press", url: `${SITE_URL}/press` },
        ])}
      />
      <div className="mx-auto max-w-3xl px-4 py-8">
        <nav aria-label="Breadcrumb" className="text-sm text-zinc-500">
          <Link href="/" className="hover:text-zinc-800">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-700">Press</span>
        </nav>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900">Press &amp; brand resources</h1>
        <p className="mt-3 max-w-2xl text-lg text-zinc-600">
          Everything you need to link to, write about, or feature {SITE_NAME} — logo, description,
          fact sheet and contact.
        </p>

        <section className="mt-10">
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900">Brand assets</h2>
          <p className="mt-2 text-zinc-600">
            Free to use when linking to or writing about {SITE_NAME}. Brand color:{" "}
            <span className="font-medium text-zinc-900">#2563eb</span>.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <a
              href="/icon.svg"
              download="calculator-logo.svg"
              className="rounded-lg border border-zinc-200 p-4 transition-colors hover:border-blue-400 hover:bg-blue-50/40"
            >
              <h3 className="font-semibold text-zinc-900">Logo (SVG)</h3>
              <p className="mt-1 text-sm text-zinc-600">Vector — crisp at any size. Download →</p>
            </a>
            <a
              href="/press-logo.png"
              download="calculator-logo.png"
              className="rounded-lg border border-zinc-200 p-4 transition-colors hover:border-blue-400 hover:bg-blue-50/40"
            >
              <h3 className="font-semibold text-zinc-900">Logo (PNG)</h3>
              <p className="mt-1 text-sm text-zinc-600">512×512, transparent background. Download →</p>
            </a>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900">About / description</h2>
          <div className="mt-4 space-y-4">
            {(
              [
                ["One-liner", DESC.oneLiner],
                ["Short", DESC.short],
                ["Long", DESC.long],
              ] as [string, string][]
            ).map(([label, text]) => (
              <div key={label}>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">{label}</h3>
                <p className="mt-1 rounded-md bg-zinc-50 px-4 py-3 text-zinc-700">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900">Fact sheet</h2>
          <div className="mt-4 overflow-hidden rounded-lg border border-zinc-200">
            {FACTS.map((f, i) => (
              <div key={f.label} className={`flex items-center justify-between px-4 py-3 ${i % 2 ? "bg-zinc-50" : "bg-white"}`}>
                <span className="text-zinc-600">{f.label}</span>
                <span className="font-semibold text-zinc-900">{f.value}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900">Suggested anchor text</h2>
          <p className="mt-2 text-zinc-600">Feel free to link using any of these:</p>
          <ul className="mt-3 space-y-1">
            {ANCHOR_TEXT.map((t) => (
              <li key={t} className="rounded bg-zinc-50 px-3 py-1.5 font-medium text-zinc-800">
                {t}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900">Attribution snippet</h2>
          <div className="mt-4 overflow-x-auto rounded-lg bg-zinc-100 px-4 py-3">
            <code className="text-sm text-zinc-800">
              Free calculators &amp; converters by {SITE_NAME} → {SITE_URL.replace(/^https?:\/\//, "")}
            </code>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900">Contact</h2>
          <p className="mt-2 text-zinc-600">
            For press, partnership or feature inquiries, email{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-700 underline">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </section>
      </div>
    </>
  );
}

import Link from "next/link";
import { CurrencyConverter } from "@/components/CurrencyConverter";
import { FaqSection } from "@/components/FaqSection";
import { AdSlot } from "@/components/AdSlot";
import { AdSenseScript } from "@/components/AdSenseScript";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import type { CurrencyPage } from "@/content/currency-pages";

export function CurrencyPairPage({ data }: { data: CurrencyPage }) {
  const url = `${SITE_URL}/${data.slug}`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: data.h1,
    url,
    description: data.metaDescription,
  };

  return (
    <>
      <AdSenseScript />
      <JsonLd data={faqSchema} />
      <JsonLd data={webPageSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE_URL },
          { name: "Tanzania", url: `${SITE_URL}/tanzania` },
          { name: data.name, url },
        ])}
      />
      <div className="mx-auto max-w-3xl px-4 py-8">
        <nav aria-label="Breadcrumb" className="text-sm text-zinc-500">
          <Link href="/" className="hover:text-zinc-800">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/tanzania" className="hover:text-zinc-800">
            Tanzania
          </Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-700">{data.name}</span>
        </nav>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900">{data.h1}</h1>
        <p className="mt-3 text-lg leading-relaxed text-zinc-600">{data.intro}</p>

        <div className="mt-6">
          <CurrencyConverter defaultFrom={data.from} defaultTo={data.to} />
        </div>

        <AdSlot className="mt-8" />

        <FaqSection faq={data.faq} />
      </div>
    </>
  );
}

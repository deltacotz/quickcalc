import type { Metadata } from "next";
import { TOOLS, type ToolCategory } from "@/content/tools";
import { ToolCard } from "@/components/ToolCard";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { openGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: `Calculators — ${SITE_NAME}`,
  description:
    "Free online calculators for everyday, finance, health and home — percentage, BMI, mortgage, loan, Tanzania PAYE, NSSF, VAT and more.",
  alternates: { canonical: `${SITE_URL}/tools` },
  openGraph: openGraph({
    title: `Calculators — ${SITE_NAME}`,
    description:
      "Free online calculators for everyday, finance, health and home — percentage, BMI, mortgage, loan, Tanzania PAYE, NSSF, VAT and more.",
    url: `${SITE_URL}/tools`,
  }),
};

const CATEGORIES: ToolCategory[] = ["Everyday", "Finance", "Health", "Education", "Home"];

export default function ToolsIndex() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Calculators</h1>
      <p className="mt-3 max-w-2xl text-lg text-zinc-600">
        Free online calculators for everyday, finance, health, education and home — each one shows
        its formula and worked examples so you can see exactly how the result is reached.
      </p>

      {CATEGORIES.map((cat) => (
        <section key={cat} className="mt-10">
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900">{cat}</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
        </section>
      ))}
    </div>
  );
}

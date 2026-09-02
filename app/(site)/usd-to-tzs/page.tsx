import type { Metadata } from "next";
import { CurrencyPairPage } from "@/components/CurrencyPairPage";
import { USD_TO_TZS } from "@/content/currency-pages";
import { SITE_URL } from "@/lib/site";
import { openGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: USD_TO_TZS.h1,
  description: USD_TO_TZS.metaDescription,
  alternates: { canonical: `${SITE_URL}/${USD_TO_TZS.slug}` },
  openGraph: openGraph({
    title: USD_TO_TZS.h1,
    description: USD_TO_TZS.metaDescription,
    url: `${SITE_URL}/${USD_TO_TZS.slug}`,
  }),
};

export default function Page() {
  return <CurrencyPairPage data={USD_TO_TZS} />;
}

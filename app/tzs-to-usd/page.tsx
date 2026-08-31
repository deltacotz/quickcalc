import type { Metadata } from "next";
import { CurrencyPairPage } from "@/components/CurrencyPairPage";
import { TZS_TO_USD } from "@/content/currency-pages";
import { SITE_URL } from "@/lib/site";
import { openGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: TZS_TO_USD.h1,
  description: TZS_TO_USD.metaDescription,
  alternates: { canonical: `${SITE_URL}/${TZS_TO_USD.slug}` },
  openGraph: openGraph({
    title: TZS_TO_USD.h1,
    description: TZS_TO_USD.metaDescription,
    url: `${SITE_URL}/${TZS_TO_USD.slug}`,
  }),
};

export default function Page() {
  return <CurrencyPairPage data={TZS_TO_USD} />;
}

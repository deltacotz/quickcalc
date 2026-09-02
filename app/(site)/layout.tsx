import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CurrencyProvider } from "@/components/CurrencyProvider";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CurrencyProvider>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </CurrencyProvider>
  );
}

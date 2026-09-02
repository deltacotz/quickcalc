import { CurrencyProvider } from "@/components/CurrencyProvider";

export default function EmbedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CurrencyProvider>{children}</CurrencyProvider>;
}

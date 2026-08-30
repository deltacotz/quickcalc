import Link from "next/link";
import { SITE_NAME } from "@/lib/site";
import { CurrencySwitcher } from "@/components/CurrencySwitcher";
import { Logo } from "@/components/Logo";

export function Header() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight text-zinc-900">
          <Logo className="h-7 w-7" />
          {SITE_NAME}
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium text-zinc-600">
          <Link href="/#calculators" className="hover:text-zinc-900">
            Calculators
          </Link>
          <Link href="/converters" className="hover:text-zinc-900">
            Unit Converters
          </Link>
          <Link href="/about" className="hidden hover:text-zinc-900 sm:inline">
            About
          </Link>
          <CurrencySwitcher />
        </nav>
      </div>
    </header>
  );
}

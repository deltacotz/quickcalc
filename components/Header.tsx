"use client";

import { useState } from "react";
import Link from "next/link";
import { SITE_NAME } from "@/lib/site";
import { CurrencySwitcher } from "@/components/CurrencySwitcher";
import { Logo } from "@/components/Logo";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight text-zinc-900">
          <Logo className="h-7 w-7" />
          {SITE_NAME}
        </Link>

        <div className="flex items-center gap-3">
          <CurrencySwitcher />
          <nav className="hidden items-center gap-4 text-sm font-medium text-zinc-600 md:flex">
            <Link href="/#calculators" className="hover:text-zinc-900">
              Calculators
            </Link>
            <Link href="/converters" className="hover:text-zinc-900">
              Unit Converters
            </Link>
            <Link href="/about" className="hover:text-zinc-900">
              About
            </Link>
          </nav>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1 rounded-md border border-zinc-300 md:hidden"
          >
            <span className="h-0.5 w-5 bg-zinc-700" />
            <span className="h-0.5 w-5 bg-zinc-700" />
            <span className="h-0.5 w-5 bg-zinc-700" />
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-zinc-200 bg-white px-4 py-2 md:hidden">
          <div className="flex flex-col">
            <Link
              href="/#calculators"
              onClick={() => setOpen(false)}
              className="py-2 text-sm font-medium text-zinc-700 hover:text-zinc-900"
            >
              Calculators
            </Link>
            <Link
              href="/converters"
              onClick={() => setOpen(false)}
              className="py-2 text-sm font-medium text-zinc-700 hover:text-zinc-900"
            >
              Unit Converters
            </Link>
            <Link
              href="/about"
              onClick={() => setOpen(false)}
              className="py-2 text-sm font-medium text-zinc-700 hover:text-zinc-900"
            >
              About
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

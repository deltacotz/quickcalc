"use client";

import { useCurrency } from "@/components/CurrencyProvider";
import { CURRENCIES, SUPPORTED_CURRENCIES } from "@/lib/currency";

export function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className="flex items-center rounded-md border border-zinc-300 p-0.5 text-xs font-medium">
      {SUPPORTED_CURRENCIES.map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => setCurrency(c)}
          aria-pressed={currency === c}
          title={CURRENCIES[c].label}
          className={`rounded px-2 py-1 transition-colors ${
            currency === c ? "bg-blue-600 text-white" : "text-zinc-600 hover:text-zinc-900"
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  );
}

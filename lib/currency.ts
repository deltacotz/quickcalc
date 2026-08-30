// Currency handling for money-bearing calculators.

export type Currency = "USD" | "TZS";

export interface CurrencyMeta {
  code: Currency;
  label: string;
  /** Display symbol without any spacing (used for input-field suffixes). */
  symbol: string;
  decimals: number;
  /** Whether a space separates the symbol from the amount when formatted. */
  spaced: boolean;
}

export const CURRENCIES: Record<Currency, CurrencyMeta> = {
  USD: { code: "USD", label: "US Dollar", symbol: "$", decimals: 2, spaced: false },
  TZS: { code: "TZS", label: "Tanzanian Shilling", symbol: "TSh", decimals: 0, spaced: true },
};

export const SUPPORTED_CURRENCIES: Currency[] = ["USD", "TZS"];

/** Format a money value in the given currency (symbol, grouping, correct decimals). */
export function formatCurrency(value: number, currency: Currency): string {
  if (!Number.isFinite(value)) return "—";
  const meta = CURRENCIES[currency];
  const numStr = value.toLocaleString("en-US", {
    minimumFractionDigits: meta.decimals,
    maximumFractionDigits: meta.decimals,
  });
  return meta.spaced ? `${meta.symbol} ${numStr}` : `${meta.symbol}${numStr}`;
}

export function currencySymbol(currency: Currency): string {
  return CURRENCIES[currency].symbol;
}

/** Pick a default currency from a browser locale string. */
export function detectCurrency(locale: string): Currency {
  const l = locale.toLowerCase();
  if (l.startsWith("sw") || l.includes("-tz")) return "TZS";
  return "USD";
}

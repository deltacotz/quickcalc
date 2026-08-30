// Number formatting helpers shared by calculators and converters.

/** Round to a fixed number of decimals (floating-point safe). */
export function roundTo(value: number, decimals = 2): number {
  const factor = 10 ** decimals;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

/** Format a number with grouping and up to `maxDecimals` decimals. */
export function formatNumber(value: number, maxDecimals = 2): string {
  if (!Number.isFinite(value)) return "—";
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: maxDecimals,
  });
}

/** Format a value as USD currency. */
export function formatCurrency(value: number): string {
  if (!Number.isFinite(value)) return "—";
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/** Append a percent sign to a formatted number. */
export function formatPercent(value: number, maxDecimals = 2): string {
  return `${formatNumber(value, maxDecimals)}%`;
}

/**
 * Format a converted value for unit-conversion results.
 * Uses up to 6 decimals in normal ranges, scientific notation otherwise.
 */
export function formatConverted(value: number): string {
  if (!Number.isFinite(value)) return "—";
  if (value === 0) return "0";
  const abs = Math.abs(value);
  if (abs >= 1e-3 && abs < 1e15) {
    return value.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 6,
    });
  }
  return value
    .toExponential(4)
    .replace(/\.?0+e/, "e")
    .replace("e+", "e");
}

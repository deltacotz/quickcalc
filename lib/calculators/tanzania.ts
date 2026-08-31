import type { CalculatorSpec, Inputs } from "./types";
import { num } from "./types";
import { formatCurrency } from "../currency";

// Tanzania resident PAYE monthly bands (TZS). Verify against the latest TRA rates.
export const PAYE_BANDS = [
  { upTo: 270000, rate: 0 },
  { upTo: 520000, rate: 0.08 },
  { upTo: 760000, rate: 0.2 },
  { upTo: 1000000, rate: 0.25 },
  { upTo: Infinity, rate: 0.3 },
];

/** Monthly PAYE tax for a given gross monthly salary (progressive). */
export function payeTax(monthlySalary: number): number {
  let tax = 0;
  let prev = 0;
  for (const band of PAYE_BANDS) {
    if (monthlySalary > prev) {
      const taxable = Math.min(monthlySalary, band.upTo) - prev;
      tax += taxable * band.rate;
    }
    prev = band.upTo;
  }
  return tax;
}

export const tanzaniaPaye: CalculatorSpec = {
  slug: "tanzania-paye-calculator",
  fields: [
    { id: "salary", label: "Gross monthly salary", type: "number", unit: "TSh", default: "1000000", min: 0, step: "1000" },
  ],
  compute: (inp: Inputs) => {
    const salary = num(inp, "salary");
    if (salary <= 0) return [{ label: "Error", value: "—", note: "Enter a positive salary." }];
    const monthlyTax = payeTax(salary);
    const netMonthly = salary - monthlyTax;
    return [
      { label: "Net (take-home) monthly", value: formatCurrency(netMonthly, "TZS"), highlight: true },
      { label: "PAYE tax (monthly)", value: formatCurrency(monthlyTax, "TZS") },
      { label: "Net (take-home) annual", value: formatCurrency(netMonthly * 12, "TZS") },
      { label: "PAYE tax (annual)", value: formatCurrency(monthlyTax * 12, "TZS") },
    ];
  },
};

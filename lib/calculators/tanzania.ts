import type { CalcResult, CalculatorSpec, Inputs } from "./types";
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

export const tanzaniaVat: CalculatorSpec = {
  slug: "tanzania-vat-calculator",
  fields: [
    {
      id: "mode",
      label: "Calculation",
      type: "select",
      options: [
        { value: "add", label: "Add VAT (price excl. VAT)" },
        { value: "remove", label: "Remove VAT (price incl. VAT)" },
      ],
      default: "add",
    },
    { id: "amount", label: "Amount", type: "number", unit: "TSh", default: "100000", min: 0, step: "1000" },
    { id: "rate", label: "VAT rate", type: "number", unit: "%", default: "18", min: 0, step: "0.5" },
  ],
  compute: (inp: Inputs) => {
    const amount = num(inp, "amount");
    const rate = num(inp, "rate");
    if (amount <= 0) return [{ label: "Error", value: "—", note: "Enter a positive amount." }];
    const add = inp.mode !== "remove";
    const vat = add ? (amount * rate) / 100 : amount - amount / (1 + rate / 100);
    const excl = add ? amount : amount / (1 + rate / 100);
    const total = add ? amount + vat : amount;
    const f = (v: number) => formatCurrency(v, "TZS");
    const results: CalcResult[] = [];
    if (add) {
      results.push({ label: "VAT amount", value: f(vat) });
      results.push({ label: "Total incl. VAT", value: f(total), highlight: true });
      results.push({ label: "Amount excl. VAT", value: f(excl) });
    } else {
      results.push({ label: "Amount excl. VAT", value: f(excl), highlight: true });
      results.push({ label: "VAT amount", value: f(vat) });
      results.push({ label: "Total incl. VAT", value: f(total) });
    }
    return results;
  },
};

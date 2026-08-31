import type { CalcContext, CalcResult, CalculatorSpec, Inputs } from "./types";
import { num } from "./types";
import { formatNumber, formatPercent } from "../format";
import { formatCurrency, currencySymbol } from "../currency";

function parseDate(s: string): Date | null {
  if (!s) return null;
  const d = new Date(`${s}T00:00:00`);
  return Number.isNaN(d.getTime()) ? null : d;
}

/** Whole days from `a` to `b` (UTC, DST-safe). */
export function dayDiff(a: Date, b: Date): number {
  const x = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const y = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.round((y - x) / 86400000);
}

/** Calendar breakdown of years/months/days between two dates. */
export function breakdown(from: Date, to: Date): { years: number; months: number; days: number } {
  let years = to.getFullYear() - from.getFullYear();
  let months = to.getMonth() - from.getMonth();
  let days = to.getDate() - from.getDate();
  if (days < 0) {
    months -= 1;
    days += new Date(to.getFullYear(), to.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return { years, months, days };
}

function addDays(d: Date, days: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + days);
  return r;
}

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function trimester(weeks: number): string {
  if (weeks < 0) return "—";
  if (weeks < 14) return "First trimester";
  if (weeks < 28) return "Second trimester";
  return "Third trimester";
}

const error = (msg: string): CalcResult[] => [{ label: "Error", value: "—", note: msg }];

export const percentage: CalculatorSpec = {
  slug: "percentage-calculator",
  fields: [
    { id: "a", label: "First number", type: "number", default: "50" },
    { id: "b", label: "Second number", type: "number", default: "200" },
    { id: "p", label: "Percentage", type: "number", unit: "%", default: "15" },
  ],
  compute: (inp: Inputs) => {
    const a = num(inp, "a");
    const b = num(inp, "b");
    const p = num(inp, "p");
    const out: CalcResult[] = [
      { label: `${formatNumber(p)}% of ${formatNumber(a)}`, value: formatNumber((p / 100) * a, 4), highlight: true },
    ];
    if (b !== 0) {
      out.push({ label: `${formatNumber(a)} as a % of ${formatNumber(b)}`, value: formatPercent((a / b) * 100, 4) });
    }
    if (a !== 0) {
      out.push({ label: `Change from ${formatNumber(a)} to ${formatNumber(b)}`, value: formatPercent(((b - a) / a) * 100, 4) });
    }
    return out;
  },
};

export const age: CalculatorSpec = {
  slug: "age-calculator",
  fields: [
    { id: "dob", label: "Date of birth", type: "date", default: "1990-01-01" },
    { id: "asof", label: "As of", type: "date", default: "today" },
  ],
  compute: (inp: Inputs) => {
    const dob = parseDate(inp.dob);
    const asof = parseDate(inp.asof);
    if (!dob || !asof) return error("Please enter valid dates.");
    if (dob > asof) return error("Date of birth must be before the 'as of' date.");
    const { years, months, days } = breakdown(dob, asof);
    const total = dayDiff(dob, asof);
    return [
      { label: "Exact age", value: `${formatNumber(years, 0)} years, ${formatNumber(months, 0)} months, ${formatNumber(days, 0)} days`, highlight: true },
      { label: "Total days", value: `${formatNumber(total, 0)} days` },
      { label: "Total weeks", value: `${formatNumber(Math.floor(total / 7), 0)} weeks` },
      { label: "Total months", value: `${formatNumber(years * 12 + months, 0)} months` },
    ];
  },
};

export const dateDifference: CalculatorSpec = {
  slug: "date-difference-calculator",
  fields: [
    { id: "start", label: "Start date", type: "date", default: "today" },
    { id: "end", label: "End date", type: "date", default: "today" },
  ],
  compute: (inp: Inputs) => {
    const start = parseDate(inp.start);
    const end = parseDate(inp.end);
    if (!start || !end) return error("Please enter valid dates.");
    if (start > end) return error("Start date must be before the end date.");
    const days = dayDiff(start, end);
    const { years, months, days: bd } = breakdown(start, end);
    return [
      { label: "Days between", value: `${formatNumber(days, 0)} days`, highlight: true },
      { label: "Weeks", value: `${formatNumber(days / 7, 2)} weeks` },
      { label: "Months (approx.)", value: `${formatNumber(days / 30.4375, 1)} months` },
      { label: "Years (approx.)", value: `${formatNumber(days / 365.25, 2)} years` },
      { label: "Breakdown", value: `${formatNumber(years, 0)} years, ${formatNumber(months, 0)} months, ${formatNumber(bd, 0)} days` },
    ];
  },
};

export const tip: CalculatorSpec = {
  slug: "tip-calculator",
  fields: [
    { id: "bill", label: "Bill amount", type: "number", unit: "$", default: "50", min: 0, step: "0.01" },
    { id: "pct", label: "Tip", type: "number", unit: "%", default: "15", min: 0 },
    { id: "people", label: "Number of people", type: "number", default: "1", min: 1 },
  ],
  compute: (inp: Inputs, ctx: CalcContext) => {
    const bill = num(inp, "bill");
    const pct = num(inp, "pct");
    const people = Math.max(1, Math.round(num(inp, "people")));
    const tipAmount = (bill * pct) / 100;
    const total = bill + tipAmount;
    return [
      { label: "Tip amount", value: formatCurrency(tipAmount, ctx.currency) },
      { label: "Total bill", value: formatCurrency(total, ctx.currency), highlight: true },
      { label: "Tip per person", value: formatCurrency(tipAmount / people, ctx.currency) },
      { label: "Total per person", value: formatCurrency(total / people, ctx.currency) },
    ];
  },
};

export const discount: CalculatorSpec = {
  slug: "discount-calculator",
  fields: [
    { id: "price", label: "Original price", type: "number", unit: "$", default: "100", min: 0, step: "0.01" },
    { id: "pct", label: "Discount", type: "number", unit: "%", default: "20", min: 0 },
  ],
  compute: (inp: Inputs, ctx: CalcContext) => {
    const price = num(inp, "price");
    const pct = num(inp, "pct");
    const saved = (price * pct) / 100;
    return [
      { label: "You save", value: formatCurrency(saved, ctx.currency) },
      { label: "Final price", value: formatCurrency(price - saved, ctx.currency), highlight: true },
    ];
  },
};

export const fuelCost: CalculatorSpec = {
  slug: "fuel-cost-calculator",
  fields: [
    {
      id: "system",
      label: "Units",
      type: "select",
      options: [
        { value: "us", label: "US (miles · mpg · per gallon)" },
        { value: "metric", label: "Metric (km · km/L · per liter)" },
      ],
      default: "us",
    },
    {
      id: "distance",
      label: "Trip distance",
      type: "number",
      unit: (inp) => (inp.system === "metric" ? "km" : "mi"),
      default: "300",
      min: 0,
    },
    {
      id: "efficiency",
      label: "Fuel efficiency",
      type: "number",
      unit: (inp) => (inp.system === "metric" ? "km/L" : "mpg"),
      default: "25",
      min: 0.1,
    },
    {
      id: "price",
      label: "Fuel price",
      type: "number",
      unit: (inp, ctx) => (inp.system === "metric" ? `${currencySymbol(ctx.currency)}/L` : `${currencySymbol(ctx.currency)}/gal`),
      default: "3.50",
      min: 0,
      step: "0.01",
    },
  ],
  compute: (inp: Inputs, ctx: CalcContext) => {
    const distance = num(inp, "distance");
    const efficiency = num(inp, "efficiency");
    const price = num(inp, "price");
    if (efficiency <= 0) return error("Fuel efficiency must be greater than zero.");
    const metric = inp.system === "metric";
    const volume = distance / efficiency;
    return [
      { label: "Fuel needed", value: `${formatNumber(volume, 2)} ${metric ? "L" : "gal"}` },
      { label: "Total cost", value: formatCurrency(volume * price, ctx.currency), highlight: true },
      { label: metric ? "Cost per km" : "Cost per mile", value: formatCurrency(price / efficiency, ctx.currency) },
    ];
  },
};

export const pregnancy: CalculatorSpec = {
  slug: "pregnancy-due-date-calculator",
  fields: [
    { id: "lmp", label: "First day of last period (LMP)", type: "date", default: "today" },
  ],
  compute: (inp: Inputs) => {
    const lmp = parseDate(inp.lmp);
    if (!lmp) return error("Enter a valid LMP date.");
    const due = addDays(lmp, 280);
    const conception = addDays(lmp, 14);
    const daysPregnant = dayDiff(lmp, new Date());
    const weeks = Math.floor(daysPregnant / 7);
    const days = daysPregnant % 7;
    return [
      { label: "Estimated due date", value: formatDate(due), highlight: true },
      { label: "Conception estimate", value: formatDate(conception) },
      {
        label: "Progress today",
        value: daysPregnant >= 0 ? `${weeks} weeks, ${days} days` : "Not started",
      },
      { label: "Trimester", value: trimester(weeks) },
    ];
  },
};

export const average: CalculatorSpec = {
  slug: "average-calculator",
  fields: [
    {
      id: "numbers",
      label: "Numbers (comma-separated)",
      type: "text",
      placeholder: "e.g. 10, 20, 30, 40",
      default: "10, 20, 30, 40",
    },
  ],
  compute: (inp: Inputs) => {
    const nums = (inp.numbers ?? "")
      .split(/[,;\s]+/)
      .map((s) => Number.parseFloat(s))
      .filter((n) => Number.isFinite(n));
    if (nums.length === 0) return error("Enter at least one number.");
    const sum = nums.reduce((a, b) => a + b, 0);
    return [
      { label: "Average (mean)", value: formatNumber(sum / nums.length, 2), highlight: true },
      { label: "Sum", value: formatNumber(sum, 2) },
      { label: "Count", value: `${nums.length}` },
    ];
  },
};

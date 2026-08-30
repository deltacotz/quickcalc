import type { CalculatorSpec, Inputs } from "./types";
import { num } from "./types";
import { formatCurrency } from "../format";

/** Monthly payment for an amortizing loan (principal + interest). */
export function monthlyPayment(principal: number, annualRatePct: number, years: number): number {
  const r = annualRatePct / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

const loanFields = [
  { id: "amount", label: "Loan amount", type: "number" as const, unit: "$", default: "300000", min: 0, step: "1000" },
  { id: "rate", label: "Annual interest rate", type: "number" as const, unit: "%", default: "6.5", min: 0, step: "0.01" },
  { id: "years", label: "Loan term", type: "number" as const, unit: "years", default: "30", min: 1 },
];

export const mortgage: CalculatorSpec = {
  slug: "mortgage-calculator",
  fields: loanFields,
  compute: (inp: Inputs) => {
    const amount = num(inp, "amount");
    const rate = num(inp, "rate");
    const years = num(inp, "years");
    if (years <= 0) return [{ label: "Error", value: "—", note: "Loan term must be at least 1 year." }];
    const monthly = monthlyPayment(amount, rate, years);
    const total = monthly * years * 12;
    return [
      { label: "Monthly payment", value: formatCurrency(monthly), highlight: true },
      { label: "Total paid", value: formatCurrency(total) },
      { label: "Total interest", value: formatCurrency(total - amount) },
    ];
  },
};

export const loan: CalculatorSpec = {
  slug: "loan-calculator",
  fields: loanFields,
  compute: (inp: Inputs) => {
    const amount = num(inp, "amount");
    const rate = num(inp, "rate");
    const years = num(inp, "years");
    if (years <= 0) return [{ label: "Error", value: "—", note: "Loan term must be at least 1 year." }];
    const monthly = monthlyPayment(amount, rate, years);
    const total = monthly * years * 12;
    return [
      { label: "Monthly payment", value: formatCurrency(monthly), highlight: true },
      { label: "Total repaid", value: formatCurrency(total) },
      { label: "Total interest", value: formatCurrency(total - amount) },
    ];
  },
};

export const compoundInterest: CalculatorSpec = {
  slug: "compound-interest-calculator",
  fields: [
    { id: "principal", label: "Initial investment", type: "number", unit: "$", default: "10000", min: 0, step: "100" },
    { id: "rate", label: "Annual interest rate", type: "number", unit: "%", default: "7", min: 0, step: "0.01" },
    { id: "years", label: "Years", type: "number", default: "20", min: 0 },
    { id: "contribution", label: "Monthly contribution", type: "number", unit: "$", default: "200", min: 0, step: "10" },
    {
      id: "frequency",
      label: "Compounding",
      type: "select",
      options: [
        { value: "12", label: "Monthly" },
        { value: "4", label: "Quarterly" },
        { value: "1", label: "Annually" },
      ],
      default: "12",
    },
  ],
  compute: (inp: Inputs) => {
    const principal = num(inp, "principal");
    const ratePct = num(inp, "rate");
    const years = num(inp, "years");
    const contribution = num(inp, "contribution");
    const nPerYear = Math.max(1, num(inp, "frequency"));
    const r = ratePct / 100 / nPerYear;
    const periods = years * nPerYear;
    let future: number;
    if (r === 0) {
      future = principal + contribution * periods;
    } else {
      const growth = Math.pow(1 + r, periods);
      future = principal * growth + contribution * ((growth - 1) / r);
    }
    const contributed = principal + contribution * periods;
    return [
      { label: "Future value", value: formatCurrency(future), highlight: true },
      { label: "Total contributed", value: formatCurrency(contributed) },
      { label: "Interest earned", value: formatCurrency(future - contributed) },
    ];
  },
};

export const salaryToHourly: CalculatorSpec = {
  slug: "salary-to-hourly-calculator",
  fields: [
    { id: "salary", label: "Annual salary", type: "number", unit: "$", default: "60000", min: 0, step: "1000" },
    { id: "hours", label: "Hours per week", type: "number", default: "40", min: 1 },
    { id: "weeks", label: "Weeks per year", type: "number", default: "52", min: 1 },
  ],
  compute: (inp: Inputs) => {
    const salary = num(inp, "salary");
    const hours = num(inp, "hours");
    const weeks = num(inp, "weeks");
    if (hours <= 0 || weeks <= 0) return [{ label: "Error", value: "—", note: "Hours and weeks must be greater than zero." }];
    const hourly = salary / (weeks * hours);
    return [
      { label: "Hourly rate", value: formatCurrency(hourly), highlight: true },
      { label: "Daily pay (8h)", value: formatCurrency(hourly * 8) },
      { label: "Weekly pay", value: formatCurrency(hourly * hours) },
      { label: "Monthly pay", value: formatCurrency(salary / 12) },
      { label: "Annual pay", value: formatCurrency(salary) },
    ];
  },
};

export const FINANCE_CALCS = [mortgage, loan, compoundInterest, salaryToHourly];

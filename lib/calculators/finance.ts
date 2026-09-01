import type { CalcContext, CalculatorSpec, Inputs } from "./types";
import { num } from "./types";
import { formatCurrency } from "../currency";
import { formatPercent } from "../format";

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
  compute: (inp: Inputs, ctx: CalcContext) => {
    const amount = num(inp, "amount");
    const rate = num(inp, "rate");
    const years = num(inp, "years");
    if (years <= 0) return [{ label: "Error", value: "—", note: "Loan term must be at least 1 year." }];
    const monthly = monthlyPayment(amount, rate, years);
    const total = monthly * years * 12;
    return [
      { label: "Monthly payment", value: formatCurrency(monthly, ctx.currency), highlight: true },
      { label: "Total paid", value: formatCurrency(total, ctx.currency) },
      { label: "Total interest", value: formatCurrency(total - amount, ctx.currency) },
    ];
  },
};

export const loan: CalculatorSpec = {
  slug: "loan-calculator",
  fields: loanFields,
  compute: (inp: Inputs, ctx: CalcContext) => {
    const amount = num(inp, "amount");
    const rate = num(inp, "rate");
    const years = num(inp, "years");
    if (years <= 0) return [{ label: "Error", value: "—", note: "Loan term must be at least 1 year." }];
    const monthly = monthlyPayment(amount, rate, years);
    const total = monthly * years * 12;
    return [
      { label: "Monthly payment", value: formatCurrency(monthly, ctx.currency), highlight: true },
      { label: "Total repaid", value: formatCurrency(total, ctx.currency) },
      { label: "Total interest", value: formatCurrency(total - amount, ctx.currency) },
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
  compute: (inp: Inputs, ctx: CalcContext) => {
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
      { label: "Future value", value: formatCurrency(future, ctx.currency), highlight: true },
      { label: "Total contributed", value: formatCurrency(contributed, ctx.currency) },
      { label: "Interest earned", value: formatCurrency(future - contributed, ctx.currency) },
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
  compute: (inp: Inputs, ctx: CalcContext) => {
    const salary = num(inp, "salary");
    const hours = num(inp, "hours");
    const weeks = num(inp, "weeks");
    if (hours <= 0 || weeks <= 0) return [{ label: "Error", value: "—", note: "Hours and weeks must be greater than zero." }];
    const hourly = salary / (weeks * hours);
    return [
      { label: "Hourly rate", value: formatCurrency(hourly, ctx.currency), highlight: true },
      { label: "Daily pay (8h)", value: formatCurrency(hourly * 8, ctx.currency) },
      { label: "Weekly pay", value: formatCurrency(hourly * hours, ctx.currency) },
      { label: "Monthly pay", value: formatCurrency(salary / 12, ctx.currency) },
      { label: "Annual pay", value: formatCurrency(salary, ctx.currency) },
    ];
  },
};

export const retirement: CalculatorSpec = {
  slug: "retirement-calculator",
  fields: [
    { id: "age", label: "Current age", type: "number", default: "30", min: 1 },
    { id: "retireAge", label: "Retirement age", type: "number", default: "65", min: 1 },
    { id: "savings", label: "Current savings", type: "number", unit: "$", default: "10000", min: 0, step: "100" },
    { id: "contribution", label: "Annual contribution", type: "number", unit: "$", default: "5000", min: 0, step: "100" },
    { id: "rate", label: "Annual return", type: "number", unit: "%", default: "7", min: 0, step: "0.1" },
  ],
  compute: (inp: Inputs, ctx: CalcContext) => {
    const age = num(inp, "age");
    const retireAge = num(inp, "retireAge");
    const savings = num(inp, "savings");
    const contribution = num(inp, "contribution");
    const ratePct = num(inp, "rate");
    const years = retireAge - age;
    if (years <= 0) return [{ label: "Error", value: "—", note: "Retirement age must be greater than current age." }];
    const r = ratePct / 100;
    let future: number;
    if (r === 0) {
      future = savings + contribution * years;
    } else {
      future =
        savings * Math.pow(1 + r, years) +
        contribution * ((Math.pow(1 + r, years) - 1) / r);
    }
    const contributed = savings + contribution * years;
    return [
      { label: "Retirement savings", value: formatCurrency(future, ctx.currency), highlight: true },
      { label: "Total contributed", value: formatCurrency(contributed, ctx.currency) },
      { label: "Growth (interest)", value: formatCurrency(future - contributed, ctx.currency) },
    ];
  },
};

export const inflation: CalculatorSpec = {
  slug: "inflation-calculator",
  fields: [
    {
      id: "mode",
      label: "Calculate",
      type: "select",
      options: [
        { value: "future", label: "Future value" },
        { value: "present", label: "Value today" },
      ],
      default: "future",
    },
    { id: "amount", label: "Amount", type: "number", unit: "$", default: "100000", min: 0, step: "1000" },
    { id: "rate", label: "Inflation rate", type: "number", unit: "%/yr", default: "5", min: 0, step: "0.1" },
    { id: "years", label: "Years", type: "number", default: "10", min: 1 },
  ],
  compute: (inp: Inputs, ctx: CalcContext) => {
    const amount = num(inp, "amount");
    const rate = num(inp, "rate");
    const years = num(inp, "years");
    if (years <= 0) return [{ label: "Error", value: "—", note: "Years must be at least 1." }];
    const r = rate / 100;
    const future = amount * Math.pow(1 + r, years);
    const present = amount / Math.pow(1 + r, years);
    const futureMode = inp.mode !== "present";
    const main = futureMode ? future : present;
    const other = futureMode ? present : future;
    return [
      {
        label: futureMode ? `Future value (in ${years} yrs)` : "Value today",
        value: formatCurrency(main, ctx.currency),
        highlight: true,
      },
      {
        label: futureMode ? "Equivalent today" : "Future equivalent",
        value: formatCurrency(other, ctx.currency),
      },
    ];
  },
};

export const debtToIncome: CalculatorSpec = {
  slug: "debt-to-income-calculator",
  fields: [
    { id: "debt", label: "Monthly debt payments", type: "number", unit: "$", default: "500", min: 0, step: "50" },
    { id: "income", label: "Gross monthly income", type: "number", unit: "$", default: "2000", min: 1, step: "100" },
  ],
  compute: (inp: Inputs) => {
    const debt = num(inp, "debt");
    const income = num(inp, "income");
    if (income <= 0) return [{ label: "Error", value: "—", note: "Income must be greater than zero." }];
    const dti = (debt / income) * 100;
    const cat = dti < 36 ? "Healthy" : dti < 50 ? "High" : "Very high";
    return [
      { label: "Debt-to-income ratio", value: formatPercent(dti, 1), highlight: true },
      { label: "Category", value: cat },
    ];
  },
};

export const FINANCE_CALCS = [mortgage, loan, compoundInterest, salaryToHourly, retirement, inflation, debtToIncome];

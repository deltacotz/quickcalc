import type { CalculatorSpec, Inputs } from "./types";
import { num } from "./types";
import { UTT_FUNDS, projectValue } from "../utt";
import { formatCurrency } from "../currency";

export const uttCalculator: CalculatorSpec = {
  slug: "utt-calculator",
  fields: [
    {
      id: "fund",
      label: "Fund",
      type: "select",
      options: UTT_FUNDS.map((f) => ({ value: f.id, label: f.name })),
      default: "money-market",
    },
    { id: "amount", label: "Initial investment", type: "number", unit: "TSh", default: "1000000", min: 0, step: "10000" },
    { id: "contribution", label: "Monthly contribution", type: "number", unit: "TSh", default: "0", min: 0, step: "1000" },
    { id: "years", label: "Years", type: "number", default: "5", min: 1, step: "1" },
  ],
  compute: (inp: Inputs) => {
    const amount = num(inp, "amount");
    const contribution = num(inp, "contribution");
    const years = num(inp, "years");
    if (years <= 0) return [{ label: "Error", value: "—", note: "Years must be at least 1." }];
    const fund = UTT_FUNDS.find((f) => f.id === inp.fund) ?? UTT_FUNDS[0];
    const future = projectValue(amount, contribution, fund.returnPct, years);
    const invested = amount + contribution * years * 12;
    return [
      { label: "Projected value", value: formatCurrency(future, "TZS"), highlight: true },
      { label: "Total invested", value: formatCurrency(invested, "TZS") },
      { label: "Growth (return)", value: formatCurrency(future - invested, "TZS") },
      { label: "Assumed annual return", value: `${fund.returnPct}%` },
    ];
  },
};

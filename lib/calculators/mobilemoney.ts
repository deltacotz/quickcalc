import type { CalcResult, CalculatorSpec, Inputs } from "./types";
import { num } from "./types";
import { OPERATORS, feeFor } from "../mobilemoney";
import { formatCurrency } from "../currency";

export const mobileMoneyFee: CalculatorSpec = {
  slug: "mobile-money-fee-calculator",
  fields: [
    {
      id: "operator",
      label: "Provider",
      type: "select",
      options: OPERATORS.map((o) => ({ value: o.id, label: o.name })),
      default: "mpesa",
    },
    {
      id: "type",
      label: "Transaction",
      type: "select",
      options: [
        { value: "send", label: "Send money" },
        { value: "withdraw", label: "Withdraw (agent)" },
      ],
      default: "send",
    },
    { id: "amount", label: "Amount", type: "number", unit: "TSh", default: "10000", min: 1, step: "100" },
  ],
  compute: (inp: Inputs) => {
    const amount = num(inp, "amount");
    const op = inp.operator || "mpesa";
    const type: "send" | "withdraw" = inp.type === "withdraw" ? "withdraw" : "send";
    if (amount <= 0) return [{ label: "Error", value: "—", note: "Enter a positive amount." }];

    const r = feeFor(op, type, amount);
    const results: CalcResult[] = [
      {
        label: type === "send" ? "Total cost (you pay)" : "You receive",
        value: formatCurrency(r.total, "TZS"),
        highlight: true,
      },
      { label: "Fee (incl. tax)", value: formatCurrency(r.fee, "TZS") },
      { label: "Base fee", value: formatCurrency(r.baseFee, "TZS") },
      { label: "Tax (10% excise + 18% VAT)", value: formatCurrency(r.tax, "TZS") },
    ];
    if (type === "withdraw") {
      results.push({ label: "Withdrawal levy (tozo)", value: formatCurrency(r.levy, "TZS") });
    }
    if (!r.ok) {
      results.unshift({ label: "Note", value: r.note ?? "" });
    }
    return results;
  },
};

export const MOBILE_MONEY_CALC = mobileMoneyFee;

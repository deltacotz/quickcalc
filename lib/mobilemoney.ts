// Tanzania mobile-money fee model.
//
// Total cost = operator_fee(amount) × 1.298 + withdrawal_levy(amount)
//   - 1.298 = 10% excise duty + 18% VAT applied ON the operator fee.
//   - The withdrawal levy applies ONLY to agent cash-out ("tozo"); sends are exempt.
//
// Fee tables are a curated snapshot (source: MomoCalc operator-verified data; cross-checked with
// Bank of Tanzania / operator tariffs). VERIFY with the operator before relying on exact figures.
// Last verified: Aug 2026.

export interface Band {
  min: number;
  max: number; // Infinity for the top band
  fee: number;
}

export interface Operator {
  id: string;
  name: string;
  short: string;
  send: Band[];
  withdraw: Band[];
}

export const FEE_TAX = 1.298;

// Government Mobile Money Withdrawal Levy (agent cash-out). Source: GN 478V (as amended 1 Oct 2022).
export const WITHDRAWAL_LEVY: Band[] = [
  { min: 0, max: 999, fee: 10 },
  { min: 1000, max: 1999, fee: 10 },
  { min: 2000, max: 2999, fee: 10 },
  { min: 3000, max: 3999, fee: 14 },
  { min: 4000, max: 4999, fee: 27 },
  { min: 5000, max: 6999, fee: 54 },
  { min: 7000, max: 9999, fee: 56 },
  { min: 10000, max: 14999, fee: 102 },
  { min: 15000, max: 19999, fee: 195 },
  { min: 20000, max: 29999, fee: 306 },
  { min: 30000, max: 39999, fee: 351 },
  { min: 40000, max: 49999, fee: 419 },
  { min: 50000, max: 99999, fee: 573 },
  { min: 100000, max: 199999, fee: 707 },
  { min: 200000, max: 299999, fee: 821 },
  { min: 300000, max: 399999, fee: 838 },
  { min: 400000, max: 499999, fee: 982 },
  { min: 500000, max: 599999, fee: 1245 },
  { min: 600000, max: 699999, fee: 1532 },
  { min: 700000, max: 799999, fee: 1700 },
  { min: 800000, max: 899999, fee: 1750 },
  { min: 900000, max: 1000000, fee: 1776 },
  { min: 1000001, max: 3000000, fee: 1875 },
  { min: 3000001, max: Infinity, fee: 2000 },
];

export const OPERATORS: Operator[] = [
  {
    id: "mpesa",
    name: "M-Pesa (Vodacom)",
    short: "M-Pesa",
    send: [
      { min: 1, max: 10000, fee: 0 },
      { min: 10001, max: 19999, fee: 0 },
      { min: 20000, max: 29999, fee: 583 },
      { min: 30000, max: 39999, fee: 650 },
      { min: 40000, max: 49999, fee: 714 },
      { min: 50000, max: 99999, fee: 1293 },
      { min: 100000, max: 199999, fee: 1707 },
      { min: 200000, max: 299999, fee: 2100 },
      { min: 300000, max: 399999, fee: 2510 },
      { min: 400000, max: 499999, fee: 2510 },
      { min: 500000, max: 699999, fee: 3717 },
      { min: 700000, max: 899999, fee: 5324 },
      { min: 900000, max: 1000000, fee: 5524 },
      { min: 1000001, max: Infinity, fee: 5524 },
    ],
    withdraw: [
      { min: 1, max: 999, fee: 175 },
      { min: 1000, max: 2999, fee: 350 },
      { min: 3000, max: 3999, fee: 600 },
      { min: 4000, max: 4999, fee: 650 },
      { min: 5000, max: 6999, fee: 950 },
      { min: 7000, max: 9999, fee: 1000 },
      { min: 10000, max: 19999, fee: 1450 },
      { min: 20000, max: 39999, fee: 1850 },
      { min: 40000, max: 49999, fee: 2350 },
      { min: 50000, max: 99999, fee: 3000 },
      { min: 100000, max: 299999, fee: 3650 },
      { min: 300000, max: 399999, fee: 6500 },
      { min: 400000, max: 599999, fee: 7000 },
      { min: 600000, max: 999999, fee: 8000 },
      { min: 1000000, max: Infinity, fee: 8000 },
    ],
  },
  {
    id: "airtel",
    name: "Airtel Money",
    short: "Airtel",
    send: [
      { min: 1, max: 999, fee: 15 },
      { min: 1000, max: 2999, fee: 30 },
      { min: 3000, max: 4999, fee: 55 },
      { min: 5000, max: 9999, fee: 130 },
      { min: 10000, max: 19999, fee: 350 },
      { min: 20000, max: 49999, fee: 400 },
      { min: 50000, max: 99999, fee: 680 },
      { min: 100000, max: 299999, fee: 1000 },
      { min: 300000, max: 999999, fee: 1500 },
      { min: 1000000, max: Infinity, fee: 2000 },
    ],
    withdraw: [
      { min: 1, max: 999, fee: 175 },
      { min: 1000, max: 2999, fee: 380 },
      { min: 3000, max: 4999, fee: 620 },
      { min: 5000, max: 9999, fee: 950 },
      { min: 10000, max: 19999, fee: 1450 },
      { min: 20000, max: 49999, fee: 1850 },
      { min: 50000, max: 99999, fee: 2700 },
      { min: 100000, max: 299999, fee: 3800 },
      { min: 300000, max: 999999, fee: 6500 },
      { min: 1000000, max: Infinity, fee: 8000 },
    ],
  },
  {
    id: "mixx",
    name: "Mixx by Yas",
    short: "Mixx",
    send: [
      { min: 1, max: 999, fee: 15 },
      { min: 1000, max: 2999, fee: 30 },
      { min: 3000, max: 4999, fee: 50 },
      { min: 5000, max: 9999, fee: 130 },
      { min: 10000, max: 19999, fee: 350 },
      { min: 20000, max: 49999, fee: 400 },
      { min: 50000, max: 99999, fee: 720 },
      { min: 100000, max: 499999, fee: 1000 },
      { min: 500000, max: Infinity, fee: 1500 },
    ],
    withdraw: [
      { min: 1, max: 999, fee: 175 },
      { min: 1000, max: 2999, fee: 350 },
      { min: 3000, max: 4999, fee: 600 },
      { min: 5000, max: 9999, fee: 950 },
      { min: 10000, max: 19999, fee: 1450 },
      { min: 20000, max: 49999, fee: 1850 },
      { min: 50000, max: 99999, fee: 2700 },
      { min: 100000, max: 499999, fee: 4000 },
      { min: 500000, max: Infinity, fee: 6000 },
    ],
  },
];

export function getOperator(id: string): Operator | undefined {
  return OPERATORS.find((o) => o.id === id);
}

function findBand(bands: Band[], amount: number): Band | undefined {
  return bands.find((b) => amount >= b.min && amount <= b.max);
}

function bandFee(bands: Band[], amount: number): number | undefined {
  const band = findBand(bands, amount);
  return band?.fee;
}

export interface FeeResult {
  operator: Operator;
  type: "send" | "withdraw";
  amount: number;
  baseFee: number;
  tax: number;
  levy: number;
  fee: number;
  total: number;
  ok: boolean;
  note?: string;
}

export function feeFor(operatorId: string, type: "send" | "withdraw", amount: number): FeeResult {
  const operator = getOperator(operatorId);
  const bands = type === "send" ? operator?.send : operator?.withdraw;
  const baseFee = operator && bands ? bandFee(bands, amount) : undefined;
  const tax = (baseFee ?? 0) * (FEE_TAX - 1);
  const levy = type === "withdraw" ? (bandFee(WITHDRAWAL_LEVY, amount) ?? 0) : 0;
  const fee = (baseFee ?? 0) * FEE_TAX + levy;
  const total = type === "send" ? amount + fee : amount - fee;
  return {
    operator: operator ?? OPERATORS[0],
    type,
    amount,
    baseFee: baseFee ?? 0,
    tax,
    levy,
    fee,
    total,
    ok: baseFee !== undefined,
    note: baseFee === undefined ? "No published fee for this amount — verify with your operator." : undefined,
  };
}

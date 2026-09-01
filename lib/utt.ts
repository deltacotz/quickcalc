// UTT AMIS unit trust funds. Return rates are ILLUSTRATIVE/indicative —
// verify current rates with UTT AMIS before relying on projections.

export interface UttFund {
  id: string;
  name: string;
  returnPct: number;
  description: string;
}

export const UTT_FUNDS: UttFund[] = [
  { id: "money-market", name: "UTT Money Market Fund", returnPct: 8, description: "Low-risk, short-term money market investments." },
  { id: "liquid", name: "UTT Liquid Fund", returnPct: 9, description: "Short-term liquidity with modest returns." },
  { id: "bond", name: "UTT Bond Fund", returnPct: 11, description: "Invests in government and corporate bonds." },
  { id: "balanced", name: "UTT Balanced Fund", returnPct: 13, description: "A mix of equities and fixed income." },
  { id: "jikimu", name: "Jikimu Fund", returnPct: 12, description: "Long-term education savings for children." },
];

/** Future value with monthly compounding and optional monthly contributions. */
export function projectValue(
  principal: number,
  monthlyContribution: number,
  annualRatePct: number,
  years: number
): number {
  const r = annualRatePct / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal + monthlyContribution * n;
  const growth = Math.pow(1 + r, n);
  return principal * growth + monthlyContribution * ((growth - 1) / r);
}

"use client";

import { useEffect, useState } from "react";

const API_URL = "https://open.er-api.com/v6/latest/USD";

function formatMoney(value: number, currency: string): string {
  if (!Number.isFinite(value)) return "—";
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `${value.toLocaleString("en-US", { maximumFractionDigits: 2 })} ${currency}`;
  }
}

export function CurrencyConverter() {
  const [rates, setRates] = useState<Record<string, number> | null>(null);
  const [updated, setUpdated] = useState("");
  const [error, setError] = useState("");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("TZS");
  const [amount, setAmount] = useState("1");

  useEffect(() => {
    let active = true;
    fetch(API_URL)
      .then((r) => r.json())
      .then((data) => {
        if (!active) return;
        if (data && data.result === "success" && data.rates) {
          setRates(data.rates);
          setUpdated(data.time_last_update_utc || "");
        } else {
          setError("Exchange rates are temporarily unavailable. Please try again later.");
        }
      })
      .catch(() => {
        if (active) setError("Exchange rates are temporarily unavailable. Please try again later.");
      });
    return () => {
      active = false;
    };
  }, []);

  const currencies = rates ? Object.keys(rates).sort() : ["USD", "TZS", "EUR", "GBP", "KES", "UGX", "ZAR"];
  const amountNum = Number.parseFloat(amount);
  const fromRate = rates?.[from];
  const toRate = rates?.[to];
  const result =
    rates && fromRate && toRate && Number.isFinite(amountNum)
      ? (amountNum / fromRate) * toRate
      : NaN;

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-zinc-700">From</span>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900"
          >
            {currencies.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-medium text-zinc-700">To</span>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900"
          >
            {currencies.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-4 block">
        <span className="text-sm font-medium text-zinc-700">Amount</span>
        <input
          type="number"
          inputMode="decimal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900"
        />
      </label>

      <div className="mt-5 rounded-lg bg-blue-600 p-4 text-white">
        {error ? (
          <div className="text-sm">{error}</div>
        ) : !rates ? (
          <div className="text-sm">Loading rates…</div>
        ) : (
          <>
            <div className="text-2xl font-bold">
              {formatMoney(amountNum, from)} = {formatMoney(result, to)}
            </div>
            <div className="mt-1 text-sm text-blue-100">
              1 {from} = {Number.isFinite((toRate ?? 0) / (fromRate ?? 1)) ? ((toRate ?? 0) / (fromRate ?? 1)).toLocaleString("en-US", { maximumFractionDigits: 4 }) : "—"} {to}
            </div>
          </>
        )}
      </div>

      <p className="mt-3 text-xs text-zinc-400">
        {updated ? `Rates last updated: ${new Date(updated).toLocaleString("en-US")}` : "Indicative rates only."}
      </p>
    </div>
  );
}

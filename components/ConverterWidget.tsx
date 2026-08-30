"use client";

import { useState } from "react";
import { convert, getDimension } from "@/lib/convert";
import { formatConverted } from "@/lib/format";

export function ConverterWidget({
  dimensionId,
  defaultFrom,
  defaultTo,
}: {
  dimensionId: string;
  defaultFrom?: string;
  defaultTo?: string;
}) {
  const dim = getDimension(dimensionId);
  const [value, setValue] = useState("1");
  const [fromId, setFromId] = useState(defaultFrom ?? dim?.units[0]?.id ?? "");
  const [toId, setToId] = useState(defaultTo ?? dim?.units[1]?.id ?? "");

  if (!dim) return null;

  const from = dim.units.find((u) => u.id === fromId) ?? dim.units[0];
  const to = dim.units.find((u) => u.id === toId) ?? dim.units[0];
  const num = Number.parseFloat(value);
  const result = Number.isFinite(num) ? convert(num, from, to) : NaN;

  const swap = () => {
    setFromId(to.id);
    setToId(from.id);
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-3">
        <label className="block">
          <span className="text-sm font-medium text-zinc-700">From</span>
          <select
            value={from.id}
            onChange={(e) => setFromId(e.target.value)}
            className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900"
          >
            {dim.units.map((u) => (
              <option key={u.id} value={u.id}>
                {u.label} ({u.symbol})
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          onClick={swap}
          aria-label="Swap units"
          className="mb-0.5 rounded-md border border-zinc-300 px-3 py-2 text-zinc-600 hover:bg-zinc-50"
        >
          ⇄
        </button>

        <label className="block">
          <span className="text-sm font-medium text-zinc-700">To</span>
          <select
            value={to.id}
            onChange={(e) => setToId(e.target.value)}
            className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900"
          >
            {dim.units.map((u) => (
              <option key={u.id} value={u.id}>
                {u.label} ({u.symbol})
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-4 block">
        <span className="text-sm font-medium text-zinc-700">Value</span>
        <input
          type="number"
          inputMode="decimal"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900"
        />
      </label>

      <div className="mt-5 rounded-lg bg-blue-600 p-4 text-white">
        <div className="text-2xl font-bold">
          {formatConverted(num)} {from.symbol} = {Number.isFinite(result) ? formatConverted(result) : "—"}{" "}
          {to.symbol}
        </div>
        <div className="mt-1 text-sm text-blue-100">
          1 {from.symbol} = {formatConverted(convert(1, from, to))} {to.symbol}
        </div>
      </div>
    </div>
  );
}

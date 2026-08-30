"use client";

import { useMemo, useState } from "react";
import { getCalculator } from "@/lib/calculators";
import type { FieldDef, Inputs } from "@/lib/calculators";
import { currencySymbol, type Currency } from "@/lib/currency";
import { useCurrency } from "@/components/CurrencyProvider";

function todayISO(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function FieldInput({
  field,
  value,
  inputs,
  currency,
  onChange,
}: {
  field: FieldDef;
  value: string;
  inputs: Inputs;
  currency: Currency;
  onChange: (v: string) => void;
}) {
  const id = `field-${field.id}`;

  if (field.type === "select") {
    return (
      <label htmlFor={id} className="block">
        <span className="text-sm font-medium text-zinc-700">{field.label}</span>
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900"
        >
          {field.options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </label>
    );
  }

  if (field.type === "date") {
    return (
      <label htmlFor={id} className="block">
        <span className="text-sm font-medium text-zinc-700">{field.label}</span>
        <input
          id={id}
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900"
        />
      </label>
    );
  }

  const unit =
    typeof field.unit === "function"
      ? field.unit(inputs, { currency })
      : field.unit === "$"
        ? currencySymbol(currency)
        : field.unit;

  return (
    <label htmlFor={id} className="block">
      <span className="text-sm font-medium text-zinc-700">{field.label}</span>
      <div className="relative mt-1">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          value={value}
          min={field.min}
          step={field.step}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-md border border-zinc-300 px-3 py-2 pr-14 text-sm text-zinc-900"
        />
        {unit && (
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-zinc-400">
            {unit}
          </span>
        )}
      </div>
    </label>
  );
}

export function CalculatorWidget({ slug }: { slug: string }) {
  const spec = getCalculator(slug);
  const { currency } = useCurrency();
  const [inputs, setInputs] = useState<Inputs>(() => {
    const init: Inputs = {};
    if (spec) {
      for (const f of spec.fields) {
        init[f.id] = f.type === "date" && f.default === "today" ? todayISO() : f.default ?? "";
      }
    }
    return init;
  });

  const results = useMemo(
    () => (spec ? spec.compute(inputs, { currency }) : []),
    [spec, inputs, currency]
  );

  if (!spec) return null;

  const set = (id: string, value: string) => setInputs((prev) => ({ ...prev, [id]: value }));

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        {spec.fields.map((f) => (
          <FieldInput
            key={f.id}
            field={f}
            value={inputs[f.id] ?? ""}
            inputs={inputs}
            currency={currency}
            onChange={(v) => set(f.id, v)}
          />
        ))}
      </div>

      <div className="mt-6 border-t border-zinc-100 pt-5">
        {results.map((r, i) =>
          r.highlight ? (
            <div key={i} className="rounded-lg bg-blue-600 p-4 text-white">
              <div className="text-sm text-blue-100">{r.label}</div>
              <div className="mt-1 text-3xl font-bold">
                {r.value}
                {r.unit && <span className="text-lg font-medium"> {r.unit}</span>}
              </div>
              {r.note && <div className="mt-1 text-sm text-blue-100">{r.note}</div>}
            </div>
          ) : (
            <div key={i} className="flex items-center justify-between gap-4 py-1">
              <span className="text-zinc-600">{r.label}</span>
              <span className="text-right font-semibold text-zinc-900">
                {r.value}
                {r.unit && <span className="font-normal text-zinc-500"> {r.unit}</span>}
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
}

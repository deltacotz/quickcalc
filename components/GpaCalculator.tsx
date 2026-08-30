"use client";

import { useState } from "react";
import { computeGpa, GRADE_OPTIONS } from "@/lib/calculators/education";
import { formatNumber } from "@/lib/format";

interface Row {
  id: number;
  grade: string;
  credits: string;
}

export function GpaCalculator() {
  const [rows, setRows] = useState<Row[]>([
    { id: 1, grade: "A", credits: "3" },
    { id: 2, grade: "B", credits: "3" },
    { id: 3, grade: "A-", credits: "4" },
  ]);
  const [nextId, setNextId] = useState(4);
  const result = computeGpa(rows);

  const update = (id: number, patch: Partial<Row>) =>
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  const remove = (id: number) =>
    setRows((prev) => (prev.length > 1 ? prev.filter((r) => r.id !== id) : prev));

  const add = () => {
    setRows((prev) => [...prev, { id: nextId, grade: "B", credits: "3" }]);
    setNextId((n) => n + 1);
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="space-y-3">
        <div className="hidden grid-cols-[1fr_1fr_2rem] gap-3 text-sm font-medium text-zinc-500 sm:grid">
          <span>Grade</span>
          <span>Credits</span>
          <span />
        </div>
        {rows.map((row) => (
          <div key={row.id} className="grid grid-cols-[1fr_1fr_2rem] items-center gap-3">
            <select
              value={row.grade}
              onChange={(e) => update(row.id, { grade: e.target.value })}
              aria-label="Grade"
              className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900"
            >
              {GRADE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="0.5"
              value={row.credits}
              onChange={(e) => update(row.id, { credits: e.target.value })}
              aria-label="Credits"
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900"
            />
            <button
              type="button"
              onClick={() => remove(row.id)}
              aria-label="Remove course"
              className="rounded-md border border-zinc-300 px-2 py-2 text-sm text-zinc-500 hover:bg-zinc-50"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={add}
        className="mt-4 rounded-md border border-blue-300 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50"
      >
        + Add course
      </button>

      <div className="mt-6 rounded-lg bg-blue-600 p-4 text-white">
        <div className="text-sm text-blue-100">Your GPA</div>
        <div className="mt-1 text-3xl font-bold">
          {result ? formatNumber(result.gpa, 2) : "—"}
        </div>
        {result && (
          <div className="mt-1 text-sm text-blue-100">
            {formatNumber(result.totalCredits, 1)} total credits ·{" "}
            {formatNumber(result.totalPoints, 1)} grade points
          </div>
        )}
      </div>
    </div>
  );
}

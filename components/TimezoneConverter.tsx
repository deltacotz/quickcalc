"use client";

import { useState } from "react";

const ZONES: { value: string; label: string }[] = [
  { value: "UTC", label: "UTC" },
  { value: "Africa/Dar_es_Salaam", label: "Dar es Salaam (EAT)" },
  { value: "Africa/Nairobi", label: "Nairobi (EAT)" },
  { value: "Africa/Johannesburg", label: "Johannesburg (SAST)" },
  { value: "Africa/Lagos", label: "Lagos (WAT)" },
  { value: "Africa/Cairo", label: "Cairo (EET)" },
  { value: "Europe/London", label: "London (GMT/BST)" },
  { value: "Europe/Paris", label: "Paris (CET/CEST)" },
  { value: "Europe/Moscow", label: "Moscow (MSK)" },
  { value: "Asia/Dubai", label: "Dubai (GST)" },
  { value: "Asia/Kolkata", label: "Mumbai (IST)" },
  { value: "Asia/Singapore", label: "Singapore (SGT)" },
  { value: "Asia/Hong_Kong", label: "Hong Kong (HKT)" },
  { value: "Asia/Tokyo", label: "Tokyo (JST)" },
  { value: "America/New_York", label: "New York (EST/EDT)" },
  { value: "America/Chicago", label: "Chicago (CST/CDT)" },
  { value: "America/Los_Angeles", label: "Los Angeles (PST/PDT)" },
  { value: "Australia/Sydney", label: "Sydney (AEST/AEDT)" },
];

function offsetMinutes(tz: string, date: Date): number {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const map: Record<string, string> = {};
  for (const p of dtf.formatToParts(date)) map[p.type] = p.value;
  const hour = map.hour === "24" ? 0 : Number(map.hour);
  const asUTC = Date.UTC(Number(map.year), Number(map.month) - 1, Number(map.day), hour, Number(map.minute), Number(map.second));
  return (asUTC - date.getTime()) / 60000;
}

/** Convert a wall-clock "YYYY-MM-DDTHH:mm" string in `tz` to an absolute Date. */
function wallToInstant(wallISO: string, tz: string): Date {
  const [datePart, timePart = "00:00"] = wallISO.split("T");
  const [y, m, d] = datePart.split("-").map(Number);
  const [hh, mm] = timePart.split(":").map(Number);
  const naive = Date.UTC(y, m - 1, d, hh, mm);
  const offset = offsetMinutes(tz, new Date(naive));
  let instant = naive - offset * 60000;
  const refined = offsetMinutes(tz, new Date(instant));
  if (refined !== offset) instant = naive - refined * 60000;
  return new Date(instant);
}

function formatIn(tz: string, date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

export function TimezoneConverter() {
  const [from, setFrom] = useState("Africa/Dar_es_Salaam");
  const [to, setTo] = useState("America/New_York");
  const [datetime, setDatetime] = useState(() => {
    const now = new Date();
    const y = now.getUTCFullYear();
    const mo = String(now.getUTCMonth() + 1).padStart(2, "0");
    const d = String(now.getUTCDate()).padStart(2, "0");
    const h = String(now.getUTCHours()).padStart(2, "0");
    const mi = String(now.getUTCMinutes()).padStart(2, "0");
    return `${y}-${mo}-${d}T${h}:${mi}`;
  });

  const instant = wallToInstant(datetime, from);
  const result = formatIn(to, instant);
  const toLabel = ZONES.find((z) => z.value === to)?.label ?? to;

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-zinc-700">From time zone</span>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900"
          >
            {ZONES.map((z) => (
              <option key={z.value} value={z.value}>
                {z.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-medium text-zinc-700">To time zone</span>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900"
          >
            {ZONES.map((z) => (
              <option key={z.value} value={z.value}>
                {z.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-4 block">
        <span className="text-sm font-medium text-zinc-700">Date &amp; time (from-zone local time)</span>
        <input
          type="datetime-local"
          value={datetime}
          onChange={(e) => setDatetime(e.target.value)}
          className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900"
        />
      </label>

      <div className="mt-5 rounded-lg bg-blue-600 p-4 text-white">
        <div className="text-sm text-blue-100">{toLabel}</div>
        <div className="mt-1 text-2xl font-bold">{result}</div>
      </div>
    </div>
  );
}

import { convert, type Unit } from "@/lib/convert";
import { formatConverted } from "@/lib/format";

const DEFAULT_VALUES = [1, 2, 3, 4, 5, 10, 25, 50, 100];

export function ConversionTable({
  from,
  to,
  values = DEFAULT_VALUES,
}: {
  from: Unit;
  to: Unit;
  values?: number[];
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-200 bg-zinc-50 text-left text-zinc-600">
            <th className="px-4 py-2 font-medium">
              {from.label} ({from.symbol})
            </th>
            <th className="px-4 py-2 font-medium">
              {to.label} ({to.symbol})
            </th>
          </tr>
        </thead>
        <tbody>
          {values.map((v) => (
            <tr key={v} className="border-b border-zinc-100 last:border-0">
              <td className="px-4 py-2 text-zinc-900">{formatConverted(v)}</td>
              <td className="px-4 py-2 text-zinc-900">{formatConverted(convert(v, from, to))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

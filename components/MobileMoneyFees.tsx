import { OPERATORS, FEE_TAX, type Band } from "@/lib/mobilemoney";

function BandTable({ title, bands }: { title: string; bands: Band[] }) {
  return (
    <div>
      <h4 className="mb-2 text-sm font-semibold text-zinc-700">{title}</h4>
      <div className="overflow-x-auto rounded-lg border border-zinc-200">
        <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-200 bg-zinc-50 text-left text-zinc-600">
            <th className="px-4 py-2 font-medium">Amount (TZS)</th>
            <th className="px-4 py-2 font-medium">Base fee</th>
          </tr>
        </thead>
        <tbody>
          {bands.map((b) => {
            const range =
              b.max === Infinity
                ? `Above ${b.min.toLocaleString("en-US")}`
                : `${b.min.toLocaleString("en-US")} – ${b.max.toLocaleString("en-US")}`;
            return (
              <tr key={range} className="border-b border-zinc-100 last:border-0">
                <td className="px-4 py-2 text-zinc-900">{range}</td>
                <td className="px-4 py-2 text-zinc-900">
                  {b.fee === 0 ? "Free" : `${b.fee.toLocaleString("en-US")} TZS`}
                </td>
              </tr>
            );
          })}
        </tbody>
        </table>
      </div>
    </div>
  );
}

export function MobileMoneyFees() {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold tracking-tight text-zinc-900">Fee tables</h2>
      <p className="mt-2 text-zinc-600">
        Base fees below (published by each operator). The calculator adds the{" "}
        {FEE_TAX.toFixed(3)}× tax (10% excise + 18% VAT) and, for withdrawals, the government
        withdrawal levy. Verify with your operator before relying on exact figures.
      </p>
      {OPERATORS.map((op) => (
        <div key={op.id} className="mt-6">
          <h3 className="font-semibold text-zinc-900">{op.name}</h3>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <BandTable title="Send money" bands={op.send} />
            <BandTable title="Withdraw (agent)" bands={op.withdraw} />
          </div>
        </div>
      ))}
    </section>
  );
}

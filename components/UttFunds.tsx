import { UTT_FUNDS } from "@/lib/utt";

export function UttFunds() {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold tracking-tight text-zinc-900">UTT AMIS funds</h2>
      <p className="mt-2 text-zinc-600">
        Illustrative annual returns — verify current rates with UTT AMIS before investing.
      </p>
      <div className="mt-4 overflow-x-auto rounded-lg border border-zinc-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50 text-left text-zinc-600">
              <th className="px-4 py-2 font-medium">Fund</th>
              <th className="px-4 py-2 font-medium">Illustrative return</th>
              <th className="px-4 py-2 font-medium">Description</th>
            </tr>
          </thead>
          <tbody>
            {UTT_FUNDS.map((f) => (
              <tr key={f.id} className="border-b border-zinc-100 last:border-0">
                <td className="px-4 py-2 font-medium text-zinc-900">{f.name}</td>
                <td className="px-4 py-2 text-zinc-900">{f.returnPct}%</td>
                <td className="px-4 py-2 text-zinc-600">{f.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

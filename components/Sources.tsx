/**
 * "Sources" block — authority links (TRA, NSSF, PSSSF, WCF, etc.) for the
 * tax/payroll tools. Strengthens E-E-A-T (Authoritativeness/Trust) by showing
 * the underlying official source for the rates used, and linking out to it.
 */
export function Sources({ items }: { items: { label: string; url: string }[] }) {
  if (!items?.length) return null;
  return (
    <div className="mt-6 rounded-md bg-zinc-50 px-4 py-3 text-xs text-zinc-600">
      <span className="font-medium text-zinc-700">Sources: </span>
      {items.map((s, i) => (
        <span key={s.url}>
          <a
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-700 underline decoration-blue-300 underline-offset-2 hover:text-blue-800"
          >
            {s.label}
          </a>
          {i < items.length - 1 && <span className="text-zinc-400"> · </span>}
        </span>
      ))}
    </div>
  );
}

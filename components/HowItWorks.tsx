export function HowItWorks({
  formula,
  explanation,
}: {
  formula: string;
  explanation: string;
}) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold tracking-tight text-zinc-900">How it works</h2>
      <p className="mt-2 text-zinc-600">{explanation}</p>
      <div className="mt-4 overflow-x-auto rounded-lg bg-zinc-100 px-4 py-3">
        <code className="text-sm text-zinc-800">{formula}</code>
      </div>
    </section>
  );
}

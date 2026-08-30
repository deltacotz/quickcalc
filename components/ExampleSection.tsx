export function ExampleSection({
  examples,
}: {
  examples: { title: string; text: string }[];
}) {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold tracking-tight text-zinc-900">Worked examples</h2>
      <ul className="mt-4 space-y-3">
        {examples.map((e) => (
          <li key={e.title} className="rounded-lg border border-zinc-200 p-4">
            <h3 className="font-medium text-zinc-900">{e.title}</h3>
            <p className="mt-1 text-zinc-600">{e.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

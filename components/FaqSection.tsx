export function FaqSection({ faq }: { faq: { q: string; a: string }[] }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold tracking-tight text-zinc-900">
        Frequently asked questions
      </h2>
      <div className="mt-4 space-y-5">
        {faq.map((f) => (
          <div key={f.q}>
            <h3 className="font-medium text-zinc-900">{f.q}</h3>
            <p className="mt-1 text-zinc-600">{f.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

import Link from "next/link";

export function ToolCard({
  slug,
  name,
  category,
  description,
}: {
  slug: string;
  name: string;
  category: string;
  description: string;
}) {
  return (
    <Link
      href={`/tools/${slug}`}
      className="block rounded-lg border border-zinc-200 bg-white p-4 transition-colors hover:border-blue-400 hover:bg-blue-50/40"
    >
      <span className="text-xs font-medium uppercase tracking-wide text-zinc-400">{category}</span>
      <h3 className="mt-1 font-semibold text-zinc-900">{name}</h3>
      <p className="mt-1 text-sm leading-snug text-zinc-600">{description}</p>
    </Link>
  );
}

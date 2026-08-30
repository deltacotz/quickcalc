export function AffiliateCta({
  cta,
  url,
  note,
}: {
  cta: string;
  url: string;
  note: string;
}) {
  return (
    <div className="mt-8 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
      <a
        href={url}
        target="_blank"
        rel="sponsored nofollow noopener"
        className="font-semibold text-emerald-800 hover:underline"
      >
        {cta} →
      </a>
      <p className="mt-1 text-xs text-emerald-700">
        {note} This is an affiliate link and we may earn a commission.
      </p>
    </div>
  );
}

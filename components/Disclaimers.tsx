const MESSAGES: Record<string, string> = {
  medical:
    "This tool is for general information only and is not medical advice. Always consult a qualified healthcare professional before making health-related decisions.",
  financial:
    "Results are estimates provided for information only and do not constitute financial, legal or tax advice. Consult a qualified professional before making financial decisions.",
};

export function Disclaimers({ kinds }: { kinds: string[] }) {
  return (
    <div className="mt-8 space-y-2">
      {kinds.map((k) => (
        <p key={k} className="rounded-md bg-amber-50 px-4 py-3 text-xs text-amber-800">
          {MESSAGES[k] ?? k}
        </p>
      ))}
    </div>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <rect x="6" y="2" width="52" height="60" rx="10" fill="#2563eb" />
      <rect x="13" y="9" width="38" height="13" rx="3" fill="#ffffff" />
      <rect x="17" y="12.5" width="30" height="2.5" rx="1.25" fill="#2563eb" />
      <rect x="17" y="16.5" width="30" height="2.5" rx="1.25" fill="#2563eb" />
      {[28, 36, 44, 52].map((y) =>
        [13, 23, 33, 43].map((x) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="8" height="6" rx="1.5" fill="#ffffff" />
        ))
      )}
    </svg>
  );
}

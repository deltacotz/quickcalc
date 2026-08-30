"use client";

import { useEffect } from "react";
import { ADSENSE_CLIENT, ADSENSE_ENABLED } from "@/lib/site";

/**
 * Responsive AdSense slot. Renders a placeholder until ADSENSE_CLIENT is set,
 * so the site stays clean before approval. Once configured, this mounts a
 * responsive `ins` unit and pushes the ad load request.
 */
export function AdSlot({ className = "" }: { className?: string }) {
  useEffect(() => {
    if (!ADSENSE_ENABLED) return;
    try {
      const w = window as unknown as { adsbygoogle?: unknown[] };
      w.adsbygoogle = w.adsbygoogle || [];
      w.adsbygoogle.push({});
    } catch {
      // AdSense script not loaded yet — no-op.
    }
  }, []);

  if (!ADSENSE_ENABLED) {
    return (
      <div
        className={`flex min-h-[90px] items-center justify-center rounded border border-dashed border-zinc-300 bg-zinc-50 text-xs uppercase tracking-wide text-zinc-400 ${className}`}
      >
        Advertisement
      </div>
    );
  }

  return (
    <div className={`min-h-[90px] ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

import { ADSENSE_CLIENT, ADSENSE_ENABLED } from "@/lib/site";

/**
 * Server-rendered AdSense loader `<script>`, included ONLY on pages that render
 * an ad slot (`AdSlot`). Keeping it off pages with no ads — like the homepage,
 * about, contact, terms, privacy, press and the embed pages — removes ~223KB of
 * third-party JavaScript (and its main-thread cost) from non-monetized pages,
 * which is the largest contributor to the red Total Blocking Time.
 *
 * It stays a literal `<script>` here so the AdSense crawler still sees the tag
 * in the raw HTML of the pages where ads actually render.
 */
export function AdSenseScript() {
  if (!ADSENSE_ENABLED) return null;
  return (
    <script
      async
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
    />
  );
}

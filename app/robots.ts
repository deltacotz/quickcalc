import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// AI search / assistant crawlers — explicitly allowed so the site stays
// visible in ChatGPT, Claude, DeepSeek, Perplexity, Copilot and Google AI.
const AI_BOTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "PerplexityBot",
  "DeepSeekBot",
  "Bytespider",
  "Bingbot",
  "Google-Extended",
  "Amazonbot",
  "Meta-ExternalAgent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_BOTS.map((ua) => ({ userAgent: ua, allow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

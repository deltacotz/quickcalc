import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async headers() {
    return [
      {
        // Apply to every route.
        source: "/:path*",
        headers: [
          // Prevent MIME-type sniffing.
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Don't let the site be embedded in frames from other origins (clickjacking).
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Control what referrer info is sent on cross-origin requests.
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Restrict browser features we don't use.
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          // Content Security Policy.
          // 'unsafe-inline' is required by Next.js for its inline <script> bootstrapping and
          // by GA4. The script-src/connect-src/img-src/frame-src allowlists keep AdSense and
          // Analytics working while still restricting script execution to trusted origins.
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://pagead2.googlesyndication.com https://www.googletagmanager.com https://www.google-analytics.com",
              "connect-src 'self' https://pagead2.googlesyndication.com https://www.googletagmanager.com https://www.google-analytics.com https://googleads.g.doubleclick.net",
              "img-src 'self' data: https://pagead2.googlesyndication.com https://www.googletagmanager.com https://www.google-analytics.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com",
              "frame-src 'self' https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://www.google.com",
              "style-src 'self' 'unsafe-inline'",
              "font-src 'self' data:",
              "object-src 'none'",
              "base-uri 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;

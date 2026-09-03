import type { Metadata } from "next";
import Script from "next/script";
import {
  SITE_NAME,
  SITE_TAGLINE,
  SITE_DESCRIPTION,
  SITE_URL,
  ADSENSE_ENABLED,
  ADSENSE_CLIENT,
  GA_MEASUREMENT_ID,
} from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${SITE_NAME} — ${SITE_TAGLINE}`,
  description: SITE_DESCRIPTION,
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: SITE_NAME }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to the third-party script origins so DNS/TLS setup happens
            in parallel with the critical path, shaving LCP/FCP under slow-4G. */}
        {ADSENSE_ENABLED && (
          <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossOrigin="anonymous" />
        )}
        {GA_MEASUREMENT_ID && (
          <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        )}
      </head>
      <body className="flex min-h-screen flex-col bg-white text-zinc-900 antialiased">
        {children}

        {/* AdSense tag — literal <script> kept in raw HTML for the AdSense crawler. */}
        {ADSENSE_ENABLED && (
          <script
            async
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          />
        )}

        {/* Google Analytics 4 — deferred to after load to avoid blocking the main thread. */}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              async
              strategy="lazyOnload"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <Script id="ga4" strategy="lazyOnload">
              {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GA_MEASUREMENT_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}

import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site";

export const alt = SITE_NAME;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#2563eb",
          color: "#ffffff",
          fontFamily: "sans-serif",
          padding: "48px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <div
            style={{
              width: "96px",
              height: "108px",
              background: "#ffffff",
              borderRadius: "16px",
              display: "flex",
              flexDirection: "column",
              padding: "14px",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "20px",
                background: "#2563eb",
                borderRadius: "4px",
                marginBottom: "12px",
              }}
            />
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: "18px",
                    height: "14px",
                    background: "#2563eb",
                    borderRadius: "3px",
                  }}
                />
              ))}
            </div>
          </div>
          <div style={{ fontSize: "96px", fontWeight: 800, letterSpacing: "-0.02em" }}>
            {SITE_NAME}
          </div>
        </div>
        <div style={{ fontSize: "34px", opacity: 0.92, marginTop: "28px" }}>{SITE_TAGLINE}</div>
        <div style={{ fontSize: "26px", opacity: 0.75, marginTop: "20px" }}>
          {SITE_URL.replace(/^https?:\/\//, "")}
        </div>
      </div>
    ),
    size
  );
}

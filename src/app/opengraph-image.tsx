import { ImageResponse } from "next/og";
import { profile, siteMeta } from "@/lib/data";

export const alt = siteMeta.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export const dynamic = "force-static";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(1000px circle at 0% 0%, #15172a, #050509 60%)",
          color: "#f4f5fb",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            fontSize: 26,
            color: "#9094a6",
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg,#5b8cff,#a78bfa,#22d3ee)",
              color: "#fff",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            {profile.initials}
          </div>
          {profile.location} · {profile.experienceYears} years
        </div>

        <div
          style={{
            marginTop: 40,
            fontSize: 76,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: -2,
          }}
        >
          {profile.name}
        </div>
        <div
          style={{
            marginTop: 12,
            fontSize: 44,
            fontWeight: 600,
            background: "linear-gradient(90deg,#5b8cff,#a78bfa,#22d3ee)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Senior Flutter Developer & Software Engineer
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 26,
            color: "#9094a6",
            maxWidth: 900,
          }}
        >
          Building high-performance, cross-platform mobile apps for fintech, HR,
          ecommerce & enterprise.
        </div>
      </div>
    ),
    { ...size }
  );
}

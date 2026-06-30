import { ImageResponse } from "next/og";
import { profile, en } from "@/content/site";

export const alt = "Sebastian Cuesta Hoyos — Chemist & Chemical Biologist";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded social-share image, generated at build/request time (no asset upload
// needed). Replace with a custom design or photo-based card later if desired.
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0b1622 0%, #102233 60%, #143b46 100%)",
          color: "#f2f7fa",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 18,
              height: 64,
              borderRadius: 9,
              background: "linear-gradient(180deg, #5ec6d6 0%, #4fd1c5 100%)",
            }}
          />
          <div style={{ fontSize: 30, color: "#9fc6d6", letterSpacing: 1 }}>
            {en.profile.role}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 92, fontWeight: 800, lineHeight: 1.05 }}>
            {profile.name}
          </div>
          <div style={{ fontSize: 40, fontWeight: 600, color: "#5ec6d6" }}>
            Chemist &amp; Chemical Biologist
          </div>
        </div>

        <div style={{ fontSize: 30, color: "#9fb4c2", maxWidth: 900 }}>
          From molecular mechanisms to therapeutic discovery.
        </div>
      </div>
    ),
    { ...size },
  );
}

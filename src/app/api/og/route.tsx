import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background:
              "linear-gradient(135deg, rgba(76, 166, 202, 0.1), rgba(131, 100, 232, 0.1))",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "600px",
              height: "600px",
              background:
                "radial-gradient(circle, rgba(131, 100, 232, 0.15) 0%, transparent 70%)",
              borderRadius: "50%",
              filter: "blur(40px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              right: "0",
              bottom: "0",
              background:
                "linear-gradient(135deg, rgba(76, 166, 202, 0.05) 0%, rgba(131, 100, 232, 0.05) 100%)",
              backdropFilter: "blur(20px)",
            }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              style={{
                fontSize: "80px",
                fontWeight: "bold",
                background: "linear-gradient(135deg, #4ca6ca, #8364e8)",
                backgroundClip: "text",
                color: "transparent",
                textShadow: "0 2px 20px rgba(76, 166, 202, 0.3)",
              }}
            >
              ForGetFulSkyBro
            </div>
            <div
              style={{
                fontSize: "32px",
                color: "rgba(255, 255, 255, 0.8)",
                letterSpacing: "-0.02em",
              }}
            >
              Developer & Open Source Enthusiast
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.error("OG Image Generation Error:", e.message);
    return new Response(`Failed to generate image: ${e.message}`, {
      status: 500,
    });
  }
}

import { ImageResponse } from "next/og";

export const runtime = "edge";

const ogShellStyle = {
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  justifyContent: "center",
  background:
    "linear-gradient(135deg, rgba(76, 166, 202, 0.1), rgba(131, 100, 232, 0.1))",
  position: "relative" as const,
};

const ogGlowOrbStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "600px",
  height: "600px",
  background:
    "radial-gradient(circle, rgba(131, 100, 232, 0.15) 0%, transparent 70%)",
  borderRadius: "50%",
  filter: "blur(40px)",
};

const ogOverlayStyle = {
  position: "absolute" as const,
  top: "0",
  left: "0",
  right: "0",
  bottom: "0",
  background:
    "linear-gradient(135deg, rgba(76, 166, 202, 0.05) 0%, rgba(131, 100, 232, 0.05) 100%)",
  backdropFilter: "blur(20px)",
};

const ogTitleBlockStyle = {
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  gap: "20px",
  position: "relative" as const,
  zIndex: 1,
};

const ogTitleStyle = {
  fontSize: "80px",
  fontWeight: "bold",
  background: "linear-gradient(135deg, #83a5d7, #684179)",
  backgroundClip: "text",
  color: "transparent",
  textShadow: "0 2px 20px rgba(76, 166, 202, 0.3)",
};

const ogSubtitleStyle = {
  fontSize: "32px",
  color: "rgba(255, 255, 255, 0.8)",
  letterSpacing: "-0.02em",
};

export async function GET() {
  try {
    const numTurtles = Math.floor(Math.random() * 6) + 1;
    const turtles = [];
    const textAreaX1 = 300;
    const textAreaX2 = 900;
    const textAreaY1 = 200;
    const textAreaY2 = 430;

    for (let i = 0; i < numTurtles; i++) {
      let x, y;

      do {
        x = Math.floor(Math.random() * 1100) + 50;
        y = Math.floor(Math.random() * 530) + 50;
      } while (
        x > textAreaX1 &&
        x < textAreaX2 &&
        y > textAreaY1 &&
        y < textAreaY2
      );

      const size = Math.floor(Math.random() * 30) + 30;
      const rotation = Math.floor(Math.random() * 360);
      const opacity = (Math.random() * 0.3 + 0.2).toFixed(2);

      turtles.push(
        <div
          key={`turtle-${x}-${y}-${size}-${rotation}`}
          style={{
            position: "absolute",
            left: `${x}px`,
            top: `${y}px`,
            fontSize: `${size}px`,
            transform: `rotate(${rotation}deg)`,
            opacity: opacity,
          }}
        >
          🐢
        </div>
      );
    }

    return new ImageResponse(
      (
        <div style={ogShellStyle}>
          <div style={ogGlowOrbStyle} />
          <div style={ogOverlayStyle} />

          {turtles}

          <div style={ogTitleBlockStyle}>
            <div style={ogTitleStyle}>ForGetFulSkyBro</div>
            <div style={ogSubtitleStyle}>
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
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    console.error("OG Image Generation Error:", message);
    return new Response(`Failed to generate image: ${message}`, {
      status: 500,
    });
  }
}

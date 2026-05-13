import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Topic Solitaire",
  description: "Play Topic Solitaire in an embedded frame.",
};

export default async function TopicSolitaire() {
  return (
    <div style={{ width: "100vw", height: "100vh", margin: 0, padding: 0 }}>
      <iframe
        src="https://topic-solitaire.vercel.app/"
        title="Topic Solitaire Game"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          display: "block",
        }}
      />
    </div>
  );
}

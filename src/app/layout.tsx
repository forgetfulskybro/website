import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import ClientRoot from "@/components/layout/ClientRoot";
import "./globals.css";

const Fira = Fira_Code({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Sky // 🗿🐢",
    template: "%s",
  },
  description: "Personal site — projects, games, and info.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={Fira.className}>
        <ClientRoot>{children}</ClientRoot>
      </body>
    </html>
  );
}

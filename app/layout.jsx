import "./globals.css";
import { Fira_Code } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

const Fira = Fira_Code({ subsets: ["latin"] });

export const metadata = {
  title: "ForGetFulSkybro - Portfolio",
  description: "Hello, my name is ForGetFulSkyBro or Sky for short. I'm currently 19 years old and I've been coding for 4 years. I enjoy creating open source projects on my free time or whenever I'm not lazy.",
  image: "https://website-forgetfulskybro.vercel.app/Me.png",	
  url: "https://website-forgetfulskybro.vercel.app",
  type: "website",
  site_name: "ForGetFulSkyBro",
  locale: "en_US",
  theme_color: '#4ca6ca',


};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/Me.png" sizes="any" />
      </head>
      <body className={Fira.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

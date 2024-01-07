import "./globals.css";
import { Fira_Code } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

const Fira = Fira_Code({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  function calcAge(dateString) {
    let birthday = +new Date(dateString);
    return ~~((Date.now() - birthday) / 31557600000);
  }
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/Me.png" sizes="any" />
        <meta property="og:title" content="ForGetFulSkybro - Portfolio" />
        <title>ForGetFulSkybro - Portfolio</title>
        <meta name="theme-color" content="#4ca6ca" />
        <meta name="msapplication-TileColor" content="#4ca6ca" />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:image"
          content="https://website-forgetfulskybro.vercel.app/Me.png"
        />
        <meta
          name="description"
          content={`Hello, my name is ForGetFulSkyBro or Sky for short. I'm currently ${calcAge(
            new Date("2004-06-29")
          )} years old and I've been coding for ${calcAge(
            new Date("2019-07-03")
          )} years. I enjoy creating open source projects on my free time or whenever I'm not lazy.`}
        />
        <meta
          property="og:description"
          content={`Hello, my name is ForGetFulSkyBro or Sky for short. I'm currently ${calcAge(
            new Date("2004-06-29")
          )} years old and I've been coding for ${calcAge(
            new Date("2019-07-03")
          )} years. I enjoy creating open source projects on my free time or whenever I'm not lazy.`}
        />
      </head>
      <body className={Fira.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

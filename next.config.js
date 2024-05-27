/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "strafe.chat",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "media.discordapp.net",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "i.scdn.co",
        pathname: "**"
      },
    ],
  },
};

module.exports = nextConfig;

import { getMetadata } from "../getMetaData";
import { SITE_URL } from "@/lib/constants";
import React from "react";

interface EmbedMetaProps {
  imageUrl: string;
  path: string;
}

function absolute(url: string): string {
  if (/^https?:\/\//i.test(url)) return url;
  return `${SITE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}

export default function EmbedMeta({ imageUrl, path }: EmbedMetaProps) {
  const { title, description, image } = getMetadata(path);
  const socialImage = absolute(image ? image : imageUrl);
  return (
    <>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description || ""} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={socialImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description || ""} />
      <meta name="twitter:image" content={socialImage} />

      <meta name="theme-color" content="#36203F" />
      <meta name="msapplication-TileColor" content="#36203F" />
      <meta name="robots" content="index, follow" />
      <meta name="keywords" content="ForGetFul, ForGetFulSkyBro, Sky" />
      <link
        rel="icon"
        href={image ? image : "/DSG Head.png"}
        type="image/png"
        sizes="any"
      />
    </>
  );
}

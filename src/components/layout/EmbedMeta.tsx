import { getMetadata } from "../getMetaData";
import React from "react";

interface EmbedMetaProps {
  imageUrl: string;
  path: string;
}

export default function EmbedMeta({ imageUrl, path }: EmbedMetaProps) {
  const { title, description, image } = getMetadata(path);
  return (
    <>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description || ""} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={image ? image : imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description || ""} />
      <meta name="twitter:image" content={image ? image : imageUrl} />

      <meta name="theme-color" content="#36203F" />
      <meta name="msapplication-TileColor" content="#36203F" />
      <meta name="robots" content="index, follow" />
      <link
        rel="icon"
        href={image ? image : "/Me.png"}
        type="image/png"
        sizes="any"
      />
    </>
  );
}

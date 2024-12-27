import React from 'react';

interface EmbedMetaProps {
  title: string;
  description: string | null;
  imageUrl: string;
}

export default function EmbedMeta({ title, description, imageUrl }: EmbedMetaProps) {
  return (
    <>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description || ''} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description || ''} />
      <meta name="twitter:image" content={imageUrl} />
      
      {/* Additional Meta */}
      <meta name="theme-color" content="#4ca6ca" />
      <meta name="msapplication-TileColor" content="#4ca6ca" />
      <meta name="robots" content="index, follow" />
      <link rel="icon" href="/Me.png" type="image/png" sizes="any" />
    </>
  );
}

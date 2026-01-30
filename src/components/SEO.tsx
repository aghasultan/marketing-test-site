import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  schema?: string | object;
}

export const SEO: React.FC<SEOProps> = ({ title, description, canonical, image, schema }) => {
  const siteUrl = 'https://riffat-labs.vercel.app'; // Replace with your actual domain or env var

  // Construct dynamic OG image URL if no custom image is provided
  const ogImage = image || `${siteUrl}/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {canonical && <link rel="canonical" href={canonical} />}

      {/* JSON-LD Schema */}
      {schema && (
        <script type="application/ld+json">
          {typeof schema === 'string' ? schema : JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  schema?: Record<string, any> | Record<string, any>[];
}

export default function SEO({ 
  title, 
  description, 
  canonicalUrl = 'https://klickra.com', 
  ogImage = 'https://klickra.com/og-image.jpg',
  schema 
}: SEOProps) {
  const siteTitle = `${title} | Klickra - AI & Digital Strategy`;

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />

      {/* Canonical Link */}
      <link rel="canonical" href={canonicalUrl} />

      {/* JSON-LD Schema */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}

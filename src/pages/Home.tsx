import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import TrustedBy from '../components/TrustedBy';
import ServicesGrid from '../components/ServicesGrid';
import HowItWorks from '../components/HowItWorks';
import AuditTool from '../components/AuditTool';
import Pricing from '../components/Pricing';
import Testimonials from '../components/Testimonials';
import BlogPreview from '../components/BlogPreview';
import SEO from '../components/SEO';

export default function Home() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Klickra",
      "url": "https://klickra.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://klickra.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Klickra - AI & Digital Strategy Agency",
      "image": "https://klickra.com/logo.png",
      "description": "Elite AI & Digital Strategy agency specializing in Answer Engine Optimization (AEO), AI Agents, and Search Experience Optimization (SXO).",
      "url": "https://klickra.com",
      "telephone": "+1-800-555-0199",
      "priceRange": "$$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "100 Innovation Drive",
        "addressLocality": "San Francisco",
        "addressRegion": "CA",
        "postalCode": "94105",
        "addressCountry": "US"
      },
      "sameAs": [
        "https://twitter.com/klickra",
        "https://linkedin.com/company/klickra"
      ]
    }
  ];

  return (
    <main>
      <SEO 
        title="Klickra | Elite AI & Digital Strategy Agency (AEO & SXO)" 
        description="Future-proof your brand with Klickra. We are a premier digital agency specializing in AI Automation, Answer Engine Optimization (AEO), and high-conversion Web Design."
        canonicalUrl="https://klickra.com"
        schema={schema}
      />
      <Hero />
      <TrustedBy />
      <ServicesGrid />
      <HowItWorks />
      <AuditTool />
      <Pricing />
      <Testimonials />
      <BlogPreview />
    </main>
  );
}

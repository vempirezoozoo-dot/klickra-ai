export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Klickra",
  "url": "https://klickra.com",
  "logo": "https://klickra.com/logo.png",
  "sameAs": [
    "https://twitter.com/klickra",
    "https://linkedin.com/company/klickra",
    "https://facebook.com/klickra"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-800-KLICKRA",
    "contactType": "customer service"
  }
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Klickra",
  "url": "https://klickra.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://klickra.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export const getServiceSchema = (name: string, description: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": name,
  "description": description,
  "provider": {
    "@type": "Organization",
    "name": "Klickra"
  },
  "areaServed": "Worldwide",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Digital Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": name
        }
      }
    ]
  }
});

export const getFAQSchema = (faqs: { q: string, a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.a
    }
  }))
});

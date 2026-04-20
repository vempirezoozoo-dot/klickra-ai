import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Check, ArrowRight, Star, Shield, Zap, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import SEO from '../components/SEO';

const serviceData: Record<string, any> = {
  'seo': {
    title: 'Advanced SEO & SXO',
    tagline: 'Dominate search results with AI-driven optimization.',
    description: 'Our Search Experience Optimization (SXO) combines traditional SEO with user behavior analysis to drive not just traffic, but conversions.',
    features: ['Technical Audit', 'Semantic Keyword Research', 'AI Content Strategy', 'Backlink Acquisition'],
    process: ['Deep Technical Audit', 'Competitor Gap Analysis', 'On-Page AI Optimization', 'Performance Tracking'],
    roi: 'Average 300% increase in organic traffic within 6 months.'
  },
  'aeo': {
    title: 'Answer Engine Optimization',
    tagline: 'Be the answer in the age of AI search.',
    description: 'Optimize your content for Perplexity, Gemini, and ChatGPT. We ensure your brand is the primary source for AI-generated answers.',
    features: ['LLM Grounding', 'Structured Data (JSON-LD)', 'FAQ Optimization', 'Knowledge Graph Integration'],
    process: ['Entity Mapping', 'Schema Implementation', 'Conversational Content Creation', 'Grounding Verification'],
    roi: '80% higher visibility in AI-generated search results.'
  },
  'web-dev': {
    title: 'Web App Development',
    tagline: 'High-performance, scalable digital products.',
    description: 'We build world-class web applications using the latest stack (React, Next.js, Node.js) with a focus on speed, security, and UX.',
    features: ['Custom Architecture', 'PWA Capabilities', 'API Integration', 'Cloud Deployment'],
    process: ['UI/UX Design', 'Agile Development', 'Rigorous Testing', 'Continuous Deployment'],
    roi: '99.9% uptime and sub-second load times.'
  },
  'one-page-website': {
    title: 'One Page Website Development',
    tagline: 'Quick, professional, and high-converting single page websites.',
    description: 'Get a stunning, mobile-responsive one-page website designed to capture leads and showcase your brand effectively.',
    features: ['Custom Design', 'Mobile Responsive', 'Basic SEO', 'Contact Form Integration'],
    process: ['Requirement Gathering', 'Design & Development', 'Revisions', 'Launch'],
    roi: 'Establish your digital presence instantly for just $1.'
  }
};

export default function ServiceDetail() {
  const { id } = useParams();
  const service = serviceData[id as string] || {
    title: id?.toUpperCase() || 'Service',
    tagline: 'Premium digital solution.',
    description: 'Comprehensive AI-powered solution tailored to your business needs.',
    features: ['Custom Strategy', 'Expert Execution', 'Real-time Analytics', '24/7 Support'],
    process: ['Audit', 'Strategy', 'Implementation', 'Optimization'],
    roi: 'Significant growth in digital performance.'
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.description,
    "provider": {
      "@type": "ProfessionalService",
      "name": "Klickra",
      "url": "https://klickra.com"
    },
    "serviceType": service.title,
    "areaServed": "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Digital Marketing Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": service.title
          }
        }
      ]
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[var(--color-bg-primary)]">
      <SEO 
        title={`${service.title} Agency Services | Klickra`} 
        description={`${service.description} Discover how Klickra's ${service.title} solutions can drive unparalleled ROI for your business.`}
        canonicalUrl={`https://klickra.com/service/${id}`}
        schema={schema}
      />
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Link to="/" className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors text-sm flex items-center gap-2 w-fit">
            &larr; Back to Home
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 text-[var(--color-primary-light)] text-xs font-bold mb-6">
              <Star className="w-3 h-3" /> PREMIUM SERVICE
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">{service.title}</h1>
            <p className="text-xl text-[var(--color-accent)] font-medium mb-6">{service.tagline}</p>
            <p className="text-lg text-[var(--color-text-secondary)] mb-12 leading-relaxed">
              {service.description}
            </p>

            <div className="grid grid-cols-2 gap-6 mb-12">
              {service.features.map((feature: string, i: number) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center">
                    <Check className="w-3 h-3 text-[var(--color-accent)]" />
                  </div>
                  <span className="text-sm font-medium text-[var(--color-text-primary)]">{feature}</span>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] mb-12">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/20 flex items-center justify-center text-[var(--color-primary-light)]">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-[var(--color-text-primary)]">Expected ROI</h4>
                  <p className="text-sm text-[var(--color-text-secondary)]">{service.roi}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-8">Our Process</h3>
              <div className="space-y-8">
                {service.process.map((step: string, index: number) => (
                  <div key={index} className="flex items-start gap-6 relative">
                    {index !== service.process.length - 1 && (
                      <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-gradient-to-b from-[var(--color-primary)] to-transparent opacity-20" />
                    )}
                    <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center shrink-0 font-bold text-sm z-10">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-[var(--color-text-primary)] text-lg mb-1">{step}</h4>
                      <p className="text-sm text-[var(--color-text-secondary)]">Detailed execution phase with AI-driven insights.</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="glass-panel p-8 md:p-12 sticky top-32">
              <h3 className="text-2xl font-bold mb-4">Secure Your Growth</h3>
              <p className="text-[var(--color-text-secondary)] mb-8">
                Ready to transform your digital presence? Choose a plan or request a custom enterprise solution.
              </p>
              
              <div className="space-y-4">
                <Link to="/contact" className="w-full py-4 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-black font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform">
                  Get Custom Quote <ArrowRight className="w-5 h-5" />
                </Link>
                
                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[var(--color-border)]"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-[var(--color-bg-secondary)] px-2 text-[var(--color-text-muted)]">Or View Plans</span>
                  </div>
                </div>

                <Link 
                  to="/pricing"
                  className="w-full py-4 rounded-xl bg-white text-black font-bold flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
                >
                  View Pricing Plans
                </Link>

                <div className="grid grid-cols-3 gap-4 mt-8">
                  <div className="text-center">
                    <Shield className="w-6 h-6 mx-auto mb-2 text-[var(--color-text-muted)]" />
                    <p className="text-[10px] text-[var(--color-text-muted)] uppercase">Secure</p>
                  </div>
                  <div className="text-center">
                    <Zap className="w-6 h-6 mx-auto mb-2 text-[var(--color-text-muted)]" />
                    <p className="text-[10px] text-[var(--color-text-muted)] uppercase">Fast</p>
                  </div>
                  <div className="text-center">
                    <Star className="w-6 h-6 mx-auto mb-2 text-[var(--color-text-muted)]" />
                    <p className="text-[10px] text-[var(--color-text-muted)] uppercase">Premium</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

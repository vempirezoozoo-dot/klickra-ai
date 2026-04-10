import React, { useState } from 'react';
import { Check, X, HelpCircle, ArrowRight } from 'lucide-react';
import Pricing from '../components/Pricing';
import ROICalculator from '../components/ROICalculator';
import SEO from '../components/SEO';

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);

  const features = [
    { name: 'SEO Optimization', starter: true, pro: true, enterprise: true },
    { name: 'Web Design', starter: '5 Pages', pro: 'Custom', enterprise: 'Unlimited' },
    { name: 'Performance Reports', starter: 'Monthly', pro: 'Weekly', enterprise: 'Real-time' },
    { name: 'AI Agents', starter: false, pro: '1 Custom', enterprise: 'Unlimited' },
    { name: 'SXO Strategy', starter: false, pro: true, enterprise: true },
    { name: 'AEO & GEO Optimization', starter: false, pro: false, enterprise: true },
    { name: 'Priority Support', starter: false, pro: true, enterprise: true },
    { name: '24/7 Phone Support', starter: false, pro: false, enterprise: true },
    { name: 'Custom API Integrations', starter: false, pro: false, enterprise: true },
    { name: 'Dedicated Manager', starter: false, pro: false, enterprise: true },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Pricing - Klickra",
    "description": "Transparent pricing for AI and digital strategy services.",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "Product",
            "name": "Starter Plan",
            "description": "Essential digital presence and SEO optimization.",
            "offers": {
              "@type": "Offer",
              "price": "499",
              "priceCurrency": "USD",
              "url": "https://klickra.com/pricing"
            }
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@type": "Product",
            "name": "Pro Plan",
            "description": "Advanced AEO, custom AI agents, and SXO strategy.",
            "offers": {
              "@type": "Offer",
              "price": "999",
              "priceCurrency": "USD",
              "url": "https://klickra.com/pricing"
            }
          }
        },
        {
          "@type": "ListItem",
          "position": 3,
          "item": {
            "@type": "Product",
            "name": "Enterprise Plan",
            "description": "Full-scale digital transformation with unlimited AI agents and dedicated support.",
            "offers": {
              "@type": "Offer",
              "price": "2999",
              "priceCurrency": "USD",
              "url": "https://klickra.com/pricing"
            }
          }
        }
      ]
    }
  };

  return (
    <div className="pt-32 pb-24 bg-[var(--color-bg-primary)]">
      <SEO 
        title="Pricing & Plans | Klickra AI Services" 
        description="Explore Klickra's transparent pricing plans for SEO, AEO, Web Design, and custom AI Agents. Choose the perfect tier to accelerate your digital growth."
        canonicalUrl="https://klickra.com/pricing"
        schema={schema}
      />
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-7xl font-bold mb-6">Choose Your <span className="text-gradient">Growth Path</span></h1>
          <p className="text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Transparent pricing for businesses at every stage of their digital journey.
          </p>
        </div>

        {/* Reusing the Pricing component for the cards */}
        <Pricing />

        {/* ROI Calculator Section */}
        <ROICalculator />

        {/* Comparison Table */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-12 text-center">Compare <span className="text-gradient">Plans</span></h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[var(--color-border)]">
                  <th className="py-6 px-4 text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-widest">Features</th>
                  <th className="py-6 px-4 text-xl font-bold text-[var(--color-text-primary)] text-center">Starter</th>
                  <th className="py-6 px-4 text-xl font-bold text-[var(--color-primary-light)] text-center">Professional</th>
                  <th className="py-6 px-4 text-xl font-bold text-[var(--color-accent)] text-center">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, i) => (
                  <tr key={i} className="border-b border-[var(--color-border)] hover:bg-[var(--color-bg-secondary)]/30 transition-colors">
                    <td className="py-6 px-4 flex items-center gap-2">
                      <span className="text-[var(--color-text-primary)] font-medium">{feature.name}</span>
                      <HelpCircle className="w-4 h-4 text-[var(--color-text-muted)] cursor-help" />
                    </td>
                    <td className="py-6 px-4 text-center">
                      {typeof feature.starter === 'boolean' ? (
                        feature.starter ? <Check className="w-5 h-5 text-green-400 mx-auto" /> : <X className="w-5 h-5 text-red-400 mx-auto" />
                      ) : <span className="text-[var(--color-text-secondary)]">{feature.starter}</span>}
                    </td>
                    <td className="py-6 px-4 text-center">
                      {typeof feature.pro === 'boolean' ? (
                        feature.pro ? <Check className="w-5 h-5 text-green-400 mx-auto" /> : <X className="w-5 h-5 text-red-400 mx-auto" />
                      ) : <span className="text-[var(--color-text-secondary)]">{feature.pro}</span>}
                    </td>
                    <td className="py-6 px-4 text-center">
                      {typeof feature.enterprise === 'boolean' ? (
                        feature.enterprise ? <Check className="w-5 h-5 text-green-400 mx-auto" /> : <X className="w-5 h-5 text-red-400 mx-auto" />
                      ) : <span className="text-[var(--color-text-secondary)]">{feature.enterprise}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-32 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked <span className="text-gradient">Questions</span></h2>
          <div className="space-y-6">
            {[
              { q: 'Can I change plans later?', a: 'Yes, you can upgrade or downgrade your plan at any time from your dashboard.' },
              { q: 'What is your refund policy?', a: 'We offer a 30-day money-back guarantee if you are not satisfied with our services.' },
              { q: 'Do you offer custom enterprise solutions?', a: 'Absolutely. Contact our sales team for a tailored package that fits your specific needs.' },
              { q: 'How does the Razorpay integration work?', a: 'We use the secure Razorpay payment gateway for instant, encrypted transactions. Your payment data is never stored on our servers.' }
            ].map((item, i) => (
              <div key={i} className="glass-panel p-6">
                <h4 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">{item.q}</h4>
                <p className="text-[var(--color-text-secondary)]">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-32 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Ready to accelerate your <span className="text-gradient">growth?</span></h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 rounded-xl bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
              Get Started Now <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 rounded-xl border border-[var(--color-border)] text-[var(--color-text-primary)] font-bold hover:border-[var(--color-primary)] transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

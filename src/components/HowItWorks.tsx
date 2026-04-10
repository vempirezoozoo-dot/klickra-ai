import React from 'react';
import { Search, MousePointerClick, CreditCard, Rocket } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    { icon: <Search className="w-8 h-8" />, title: 'Browse', desc: 'Explore our comprehensive suite of AI-powered digital services.' },
    { icon: <MousePointerClick className="w-8 h-8" />, title: 'Select', desc: 'Choose the perfect package or request a custom enterprise quote.' },
    { icon: <CreditCard className="w-8 h-8" />, title: 'Pay via Razorpay', desc: 'Secure, instant checkout with Razorpay integration.' },
    { icon: <Rocket className="w-8 h-8" />, title: 'Get Results', desc: 'Track progress in your dashboard and watch your business grow.' },
  ];

  return (
    <section className="py-24 relative z-20 bg-[var(--color-bg-secondary)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">How It <span className="text-gradient">Works</span></h2>
          <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">A seamless process from discovery to delivery.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] opacity-30"></div>

          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center text-center group">
              <div className="w-24 h-24 rounded-full glass-panel flex items-center justify-center mb-6 relative z-10 bg-[var(--color-bg-primary)] border-[var(--color-primary)]/30 group-hover:border-[var(--color-accent)] transition-colors duration-300">
                <div className="text-[var(--color-primary-light)] group-hover:text-[var(--color-accent)] transition-colors duration-300">
                  {step.icon}
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-[var(--color-text-primary)]">{step.title}</h3>
              <p className="text-[var(--color-text-muted)] text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

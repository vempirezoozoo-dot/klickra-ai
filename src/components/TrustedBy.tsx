import React from 'react';

export default function TrustedBy() {
  const logos = ['Google', 'Microsoft', 'Amazon', 'Stripe', 'Vercel', 'Meta', 'OpenAI', 'Anthropic'];

  return (
    <section className="py-12 border-y border-[var(--color-border)] bg-[var(--color-bg-secondary)]/50 relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="w-full lg:w-2/3">
            <p className="text-sm font-medium text-[var(--color-text-muted)] uppercase tracking-widest mb-6 text-center lg:text-left">Trusted By Industry Leaders</p>
            <div className="relative flex overflow-x-hidden group">
              <div className="flex animate-scroll whitespace-nowrap gap-12 items-center py-4">
                {[...logos, ...logos].map((logo, i) => (
                  <div key={i} className="text-2xl font-bold font-heading text-[var(--color-text-secondary)] opacity-40 hover:opacity-100 hover:text-[var(--color-text-primary)] transition-all duration-300 cursor-default">
                    {logo}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex gap-8 sm:gap-12 text-center lg:text-right">
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-1">10,000+</div>
              <div className="text-[10px] sm:text-xs text-[var(--color-text-secondary)] uppercase tracking-widest">Projects Delivered</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-1">500+</div>
              <div className="text-[10px] sm:text-xs text-[var(--color-text-secondary)] uppercase tracking-widest">AI Agents Built</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-[var(--color-accent)] mb-1">99.8%</div>
              <div className="text-[10px] sm:text-xs text-[var(--color-text-secondary)] uppercase tracking-widest">Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

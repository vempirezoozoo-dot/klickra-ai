import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: 'Sarah Jenkins',
      role: 'CMO at TechFlow',
      image: '/testimonial-sarah.png',
      quote: 'Klickra completely transformed our digital presence. Their AI agents automated our customer support, and the SEO strategy doubled our organic traffic in 3 months.',
      rating: 5
    },
    {
      name: 'David Chen',
      role: 'Founder of InnovateX',
      image: '/testimonial-david.png',
      quote: 'The web app they built for us is flawless. The integration of generative AI features gave us a massive competitive advantage. Highly recommended.',
      rating: 5
    },
    {
      name: 'Elena Rodriguez',
      role: 'VP of Marketing, GlobalRetail',
      image: '/testimonial-elena.png',
      quote: 'Their AEO and GEO strategies are ahead of the curve. We are now ranking in AI overviews and featured snippets consistently. A game-changer for our brand.',
      rating: 5
    }
  ];

  const next = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 relative z-20 bg-[var(--color-bg-primary)] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[var(--color-primary)]/5 rounded-full blur-[100px] -translate-y-1/2"></div>
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[var(--color-accent)]/5 rounded-full blur-[100px] -translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Client <span className="text-gradient">Success Stories</span></h2>
          <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">Don't just take our word for it. See what our partners have to say.</p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="absolute top-0 left-0 text-[var(--color-primary)]/20 -translate-x-8 -translate-y-8">
            <Quote className="w-24 h-24" />
          </div>
          
          <div className="glass-panel p-8 md:p-12 relative z-10">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-32 h-32 shrink-0 rounded-full overflow-hidden border-2 border-[var(--color-primary)] p-1">
                <img 
                  src={testimonials[activeIndex].image} 
                  alt={testimonials[activeIndex].name} 
                  className="w-full h-full object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[var(--color-accent)] text-[var(--color-accent)]" />
                  ))}
                </div>
                <p className="text-lg md:text-xl text-[var(--color-text-primary)] mb-6 italic leading-relaxed">
                  "{testimonials[activeIndex].quote}"
                </p>
                <div>
                  <h4 className="font-bold text-[var(--color-text-primary)] text-lg">{testimonials[activeIndex].name}</h4>
                  <p className="text-[var(--color-text-secondary)]">{testimonials[activeIndex].role}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button 
              onClick={prev}
              className="w-12 h-12 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-primary)] hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={next}
              className="w-12 h-12 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-primary)] hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

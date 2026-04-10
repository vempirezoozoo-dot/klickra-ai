import React from 'react';
import { motion } from 'motion/react';
import { Target, Eye, Heart, Award, Users, Rocket } from 'lucide-react';
import SEO from '../components/SEO';

export default function About() {
  const milestones = [
    { year: '2020', title: 'The Spark', desc: 'Klickra was founded with a vision to merge AI with digital marketing.' },
    { year: '2021', title: 'First 100 Clients', desc: 'Reached a major milestone of helping 100 businesses automate their growth.' },
    { year: '2022', title: 'AI Agent Launch', desc: 'Introduced our proprietary AI Agent framework for enterprise automation.' },
    { year: '2023', title: 'Global Expansion', desc: 'Opened offices in 3 continents to serve a truly global clientele.' },
    { year: '2024', title: 'The Future', desc: 'Leading the charge in AEO and GEO strategies for the next-gen web.' }
  ];

  const team = [
    { name: 'Alex Rivera', role: 'CEO & Founder', image: 'https://picsum.photos/seed/alex/400/400' },
    { name: 'Sarah Chen', role: 'Head of AI Strategy', image: 'https://picsum.photos/seed/sarah/400/400' },
    { name: 'Marcus Thorne', role: 'Chief Creative Officer', image: 'https://picsum.photos/seed/marcus/400/400' },
    { name: 'Elena Rodriguez', role: 'Lead SEO Architect', image: 'https://picsum.photos/seed/elena/400/400' }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "Klickra",
      "foundingDate": "2020",
      "description": "Klickra was born at the intersection of human creativity and artificial intelligence. We believe that the future of digital growth belongs to those who can harness the power of AI.",
      "founders": [
        {
          "@type": "Person",
          "name": "Alex Rivera",
          "jobTitle": "CEO & Founder"
        }
      ]
    }
  };

  return (
    <div className="pt-32 pb-24 bg-[var(--color-bg-primary)]">
      <SEO 
        title="About Klickra | Our Mission & AI Vision" 
        description="Discover Klickra's journey. We are a team of AI architects, SEO experts, and designers dedicated to bridging the gap between traditional marketing and the AI-driven future."
        canonicalUrl="https://klickra.com/about"
        schema={schema}
      />
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Hero Section */}
        <div className="text-center mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-bold mb-6"
          >
            Our Story. Our <span className="text-gradient">Mission.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-[var(--color-text-secondary)] max-w-3xl mx-auto leading-relaxed"
          >
            Klickra was born at the intersection of human creativity and artificial intelligence. 
            We believe that the future of digital growth belongs to those who can harness the power of AI 
            without losing the human touch.
          </motion.p>
        </div>

        {/* Mission/Vision/Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          <div className="glass-panel p-8">
            <Target className="w-12 h-12 text-[var(--color-primary)] mb-6" />
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-[var(--color-text-secondary)]">
              To democratize enterprise-grade AI solutions for businesses of all sizes, 
              enabling them to compete in an increasingly automated world.
            </p>
          </div>
          <div className="glass-panel p-8">
            <Eye className="w-12 h-12 text-[var(--color-accent)] mb-6" />
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-[var(--color-text-secondary)]">
              To be the global standard for AI-powered digital services, 
              where every interaction is optimized for maximum impact and efficiency.
            </p>
          </div>
          <div className="glass-panel p-8">
            <Heart className="w-12 h-12 text-red-400 mb-6" />
            <h3 className="text-2xl font-bold mb-4">Our Values</h3>
            <p className="text-[var(--color-text-secondary)]">
              Innovation, Integrity, and Impact. We don't just build tools; 
              we build partnerships that drive real-world results.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-32">
          <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">Our <span className="text-gradient">Milestones</span></h2>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 h-full w-px bg-[var(--color-border)] hidden md:block"></div>
            <div className="space-y-12">
              {milestones.map((m, i) => (
                <div key={i} className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="flex-1 w-full">
                    <div className={`glass-panel p-8 ${i % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                      <span className="text-[var(--color-primary)] font-bold text-xl mb-2 block">{m.year}</span>
                      <h4 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">{m.title}</h4>
                      <p className="text-[var(--color-text-secondary)]">{m.desc}</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-[var(--color-primary)] relative z-10 hidden md:block">
                    <div className="absolute inset-0 rounded-full bg-[var(--color-primary)] animate-ping opacity-50"></div>
                  </div>
                  <div className="flex-1 hidden md:block"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-32">
          <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">Meet the <span className="text-gradient">Architects</span></h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl glass-panel p-4">
                <div className="aspect-square overflow-hidden rounded-xl mb-6">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h4 className="text-xl font-bold text-[var(--color-text-primary)]">{member.name}</h4>
                <p className="text-[var(--color-text-secondary)]">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-t border-[var(--color-border)]">
          <div className="text-center">
            <div className="text-4xl font-bold text-[var(--color-text-primary)] mb-2">10k+</div>
            <div className="text-sm text-[var(--color-text-muted)]">Projects Delivered</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-[var(--color-text-primary)] mb-2">500+</div>
            <div className="text-sm text-[var(--color-text-muted)]">AI Agents Built</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-[var(--color-text-primary)] mb-2">99.8%</div>
            <div className="text-sm text-[var(--color-text-muted)]">Uptime Guarantee</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-[var(--color-text-primary)] mb-2">24/7</div>
            <div className="text-sm text-[var(--color-text-muted)]">Expert Support</div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, ArrowRight } from 'lucide-react';

export default function Portfolio() {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'SEO', 'Web Dev', 'AI Agents', 'Automation'];

  const projects = [
    {
      title: 'Global E-commerce SEO',
      category: 'SEO',
      image: 'https://picsum.photos/seed/seo1/800/600',
      metrics: '340% Organic Traffic Growth',
      description: 'Complete SEO & SXO overhaul for a multi-national retail brand.'
    },
    {
      title: 'SaaS Platform Dev',
      category: 'Web Dev',
      image: 'https://picsum.photos/seed/web1/800/600',
      metrics: '50ms Average Latency',
      description: 'Full-stack development of a high-performance analytics dashboard.'
    },
    {
      title: 'Customer Support AI',
      category: 'AI Agents',
      image: 'https://picsum.photos/seed/ai1/800/600',
      metrics: '85% Automated Resolution',
      description: 'Custom AI agent integration for 24/7 automated customer support.'
    },
    {
      title: 'Supply Chain Automation',
      category: 'Automation',
      image: 'https://picsum.photos/seed/auto1/800/600',
      metrics: '40% Operational Savings',
      description: 'End-to-end workflow automation for a logistics giant.'
    },
    {
      title: 'FinTech Web App',
      category: 'Web Dev',
      image: 'https://picsum.photos/seed/web2/800/600',
      metrics: '99.9% Uptime',
      description: 'Secure, scalable financial platform with real-time data processing.'
    },
    {
      title: 'AEO Strategy for Tech',
      category: 'SEO',
      image: 'https://picsum.photos/seed/seo2/800/600',
      metrics: 'Top 3 in AI Overviews',
      description: 'Optimizing content for next-gen generative search engines.'
    }
  ];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="pt-32 pb-24 bg-[var(--color-bg-primary)] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-7xl font-bold mb-6">Our <span className="text-gradient">Portfolio</span></h1>
          <p className="text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            A showcase of our most impactful digital transformations and AI integrations.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                filter === cat 
                  ? 'bg-[var(--color-primary)] text-white shadow-glow' 
                  : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="glass-panel group overflow-hidden flex flex-col"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:bg-[var(--color-accent)] transition-colors">
                      <ExternalLink className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="p-8 flex-grow flex flex-col">
                  <span className="text-xs font-bold text-[var(--color-primary-light)] uppercase tracking-widest mb-2">
                    {project.category}
                  </span>
                  <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">{project.title}</h3>
                  <p className="text-[var(--color-text-secondary)] text-sm mb-6 flex-grow">
                    {project.description}
                  </p>
                  <div className="pt-6 border-t border-[var(--color-border)] flex items-center justify-between">
                    <span className="text-sm font-bold text-[var(--color-accent)]">{project.metrics}</span>
                    <button className="text-[var(--color-text-primary)] hover:text-[var(--color-primary-light)] transition-colors">
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* CTA */}
        <div className="mt-24 glass-panel p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to be our next success story?</h2>
          <p className="text-[var(--color-text-secondary)] mb-8 max-w-xl mx-auto">
            Let's discuss how we can apply our AI-powered strategies to your unique business challenges.
          </p>
          <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-black font-bold hover:opacity-90 transition-opacity">
            Start Your Project
          </button>
        </div>
      </div>
    </div>
  );
}

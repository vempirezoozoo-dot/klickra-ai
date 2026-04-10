import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';

export default function BlogPreview() {
  const posts = [
    {
      title: 'The Future of Generative Engine Optimization (GEO)',
      excerpt: 'How to prepare your content strategy for AI-driven search engines like Google SGE and Perplexity.',
      image: 'https://picsum.photos/seed/seo/800/600',
      category: 'SEO',
      date: 'Oct 24, 2026',
      readTime: '5 min read'
    },
    {
      title: 'Building Autonomous AI Agents for Customer Support',
      excerpt: 'A step-by-step guide to deploying custom LLM agents that resolve 80% of customer queries instantly.',
      image: 'https://picsum.photos/seed/ai/800/600',
      category: 'AI Agents',
      date: 'Oct 18, 2026',
      readTime: '8 min read'
    },
    {
      title: 'Glassmorphism & 3D Web: Design Trends 2027',
      excerpt: 'Why immersive, spatial web design is replacing flat UI, and how to implement it using Three.js.',
      image: 'https://picsum.photos/seed/webdesign/800/600',
      category: 'Web Design',
      date: 'Oct 12, 2026',
      readTime: '6 min read'
    }
  ];

  return (
    <section className="py-24 relative z-20 bg-[var(--color-bg-secondary)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Latest <span className="text-gradient">Insights</span></h2>
            <p className="text-[var(--color-text-secondary)] max-w-2xl">Stay ahead of the curve with our expert articles on AI, SEO, and Web Development.</p>
          </div>
          <button className="flex items-center gap-2 text-[var(--color-text-primary)] font-medium hover:text-[var(--color-accent)] transition-colors group whitespace-nowrap">
            View All Posts <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <article key={index} className="glass-panel overflow-hidden group cursor-pointer hover:border-[var(--color-primary)] transition-colors duration-300 flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300 z-10"></div>
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-[var(--color-primary)] text-white rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)] mb-3">
                  <span>{post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-3 group-hover:text-[var(--color-primary-light)] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-[var(--color-text-secondary)] text-sm mb-6 line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-2 text-[var(--color-accent)] text-sm font-medium mt-auto">
                  Read Article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

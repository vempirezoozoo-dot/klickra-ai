import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import SEO from '../components/SEO';

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Insights & Innovation | Klickra Blog",
      "description": "Stay ahead of the curve with our latest thoughts on AI, SEO, AEO, and digital strategy.",
      "url": "https://klickra.com/blog",
      "publisher": {
        "@type": "Organization",
        "name": "Klickra",
        "logo": {
          "@type": "ImageObject",
          "url": "https://klickra.com/logo.png"
        }
      },
      "mainEntity": {
        "@type": "ItemList",
        "itemListElement": blogPosts.map((post, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "url": `https://klickra.com/blog/${post.id}`,
          "name": post.title
        }))
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://klickra.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": "https://klickra.com/blog"
        }
      ]
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-[var(--color-bg-primary)] min-h-screen">
      <SEO 
        title="Insights & Innovation | Klickra AI & SEO Blog" 
        description="Read the latest articles on Answer Engine Optimization (AEO), AI Agents, SXO, and future-proof digital strategies from the experts at Klickra."
        canonicalUrl="https://klickra.com/blog"
        schema={schema}
      />
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-7xl font-bold mb-6">Insights & <span className="text-gradient">Innovation</span></h1>
          <p className="text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Stay ahead of the curve with our latest thoughts on AI, SEO, and digital strategy.
          </p>
        </div>

        {/* Search & Categories */}
        <div className="flex flex-col md:flex-row gap-8 mb-16 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]" />
            <input 
              type="text" 
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)]"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            {['All', 'SEO', 'AEO', 'AI Agents', 'Automation', 'Web Design'].map(cat => (
              <button key={cat} className="px-4 py-2 rounded-full text-sm font-medium bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {filteredPosts.map((post, i) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel group overflow-hidden flex flex-col"
            >
              <Link to={`/blog/${post.id}`} className="block overflow-hidden relative aspect-video">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-[var(--color-primary)] text-white text-xs font-bold uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>
              </Link>
              <div className="p-8 flex-grow flex flex-col">
                <div className="flex items-center gap-6 text-xs text-[var(--color-text-muted)] mb-4">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                  <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
                </div>
                <Link to={`/blog/${post.id}`}>
                  <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4 group-hover:text-[var(--color-primary-light)] transition-colors">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-[var(--color-text-secondary)] mb-8 flex-grow">
                  {post.excerpt}
                </p>
                <Link to={`/blog/${post.id}`} className="flex items-center gap-2 text-[var(--color-text-primary)] font-bold group-hover:gap-4 transition-all w-fit">
                  Read Article <ArrowRight className="w-5 h-5 text-[var(--color-accent)]" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-24 glass-panel p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-primary)]/10 blur-[100px] rounded-full"></div>
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Subscribe to our newsletter</h2>
            <p className="text-[var(--color-text-secondary)] mb-8">
              Get the latest AI insights and digital growth strategies delivered straight to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-grow px-6 py-4 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)]"
              />
              <button className="px-8 py-4 rounded-xl bg-white text-black font-bold hover:bg-[var(--color-accent)] transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

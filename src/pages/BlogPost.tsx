import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, Clock, User, ArrowLeft, Share2, Bookmark, MessageSquare } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { blogPosts } from '../data/blogPosts';
import SEO from '../components/SEO';

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const post = blogPosts.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <div className="pt-32 pb-24 min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
        <p className="text-[var(--color-text-secondary)] mb-8">The article you're looking for doesn't exist or has been moved.</p>
        <Link to="/blog" className="px-8 py-4 rounded-xl bg-[var(--color-primary)] text-white font-bold">
          Back to Blog
        </Link>
      </div>
    );
  }

  // Find related posts by category or tags, excluding current post
  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id)
    .map(p => {
      let score = 0;
      if (p.category === post.category) score += 2;
      const commonTags = p.tags.filter(tag => post.tags.includes(tag));
      score += commonTags.length;
      return { post: p, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3) // Show up to 3 related posts
    .map(item => item.post);

  const wordCount = post.content.split(/\s+/).length;
  const readTimeMinutes = parseInt(post.readTime) || Math.ceil(wordCount / 200);

  // Extract FAQs from markdown content (headings ending in '?')
  const faqRegex = /#{2,3}\s+(.*?\?)\s*\n+([^#]+)/g;
  const faqs = [];
  let match;
  while ((match = faqRegex.exec(post.content)) !== null) {
    faqs.push({
      question: match[1].trim(),
      answer: match[2].trim()
    });
  }

  const schema: any[] = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://klickra.com/blog/${post.id}`
      },
      "headline": post.title,
      "description": post.excerpt,
      "image": [post.image],
      "datePublished": new Date(post.date).toISOString(),
      "dateModified": new Date(post.date).toISOString(),
      "author": {
        "@type": "Person",
        "@id": `https://klickra.com/about#${post.author.replace(/\s+/g, '-')}`,
        "name": post.author,
        "url": "https://klickra.com/about",
        "jobTitle": "AI Strategy Lead",
        "worksFor": {
          "@type": "Organization",
          "name": "Klickra"
        }
      },
      "publisher": {
        "@type": "Organization",
        "name": "Klickra",
        "logo": {
          "@type": "ImageObject",
          "url": "https://klickra.com/logo.png"
        }
      },
      "keywords": post.tags.join(', '),
      "articleSection": post.category,
      "wordCount": wordCount,
      "timeRequired": `PT${readTimeMinutes}M`,
      "inLanguage": "en-US",
      "isAccessibleForFree": true,
      "articleBody": post.content
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
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": post.title,
          "item": `https://klickra.com/blog/${post.id}`
        }
      ]
    }
  ];

  if (faqs.length > 0) {
    schema.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    });
  }

  return (
    <div className="pt-32 pb-24 bg-[var(--color-bg-primary)] min-h-screen">
      <SEO 
        title={`${post.title} | Klickra Insights`} 
        description={post.excerpt}
        canonicalUrl={`https://klickra.com/blog/${post.id}`}
        ogImage={post.image}
        schema={schema}
      />
      <div className="max-w-4xl mx-auto px-6">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/blog')}
          className="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Insights
        </motion.button>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-6">
            <span className="px-3 py-1 rounded-full bg-[var(--color-primary)]/20 text-[var(--color-primary)] text-xs font-bold uppercase tracking-wider">
              {post.category}
            </span>
            {post.tags.map(tag => (
              <span key={tag} className="text-xs text-[var(--color-text-muted)]">#{tag}</span>
            ))}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-sm text-[var(--color-text-secondary)] border-y border-[var(--color-border)] py-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--color-bg-secondary)] flex items-center justify-center border border-[var(--color-border)]">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-[var(--color-text-primary)]">{post.author}</p>
                <p className="text-xs">AI Strategy Lead</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {post.date}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </div>
            <div className="ml-auto flex items-center gap-4">
              <button className="p-2 rounded-full hover:bg-[var(--color-bg-secondary)] transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-full hover:bg-[var(--color-bg-secondary)] transition-colors">
                <Bookmark className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="aspect-[21/9] rounded-3xl overflow-hidden mb-16 shadow-2xl"
        >
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="prose prose-invert prose-lg max-w-none mb-24"
        >
          <div className="markdown-body">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </motion.div>

        {/* Engagement */}
        <div className="border-t border-[var(--color-border)] pt-12 mb-24">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-colors">
                <MessageSquare className="w-5 h-5" />
                <span>Comments (0)</span>
              </button>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-sm text-[var(--color-text-muted)]">Share this article:</p>
              <div className="flex gap-2">
                {['Twitter', 'LinkedIn', 'Facebook'].map(platform => (
                  <button key={platform} className="w-10 h-10 rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex items-center justify-center hover:bg-[var(--color-primary)] hover:text-white transition-all">
                    <span className="sr-only">{platform}</span>
                    <Share2 className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        <div className="mb-24">
          <h3 className="text-2xl font-bold mb-8">Related Articles</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {relatedPosts.map(p => (
              <Link 
                key={p.id} 
                to={`/blog/${p.id}`}
                className="glass-panel p-6 group block"
              >
                <span className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-widest mb-2 block">
                  {p.category}
                </span>
                <h4 className="text-xl font-bold mb-4 group-hover:text-[var(--color-primary-light)] transition-colors">
                  {p.title}
                </h4>
                <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2">
                  {p.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="glass-panel p-12 text-center bg-gradient-to-br from-[var(--color-primary)]/20 to-transparent">
          <h3 className="text-3xl font-bold mb-4">Ready to implement these strategies?</h3>
          <p className="text-[var(--color-text-secondary)] mb-8 max-w-xl mx-auto">
            Our team of AI architects and digital strategists are ready to help you dominate your market.
          </p>
          <Link 
            to="/contact" 
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[var(--color-primary)] text-white font-bold hover:scale-105 transition-transform"
          >
            Schedule a Strategy Call
          </Link>
        </div>
      </div>
    </div>
  );
}

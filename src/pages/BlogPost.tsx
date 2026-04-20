import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, Clock, User, ArrowLeft, Share2, Bookmark, MessageSquare, Twitter, Linkedin, Facebook, Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { blogPosts } from '../data/blogPosts';
import SEO from '../components/SEO';

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const post = blogPosts.find(p => p.id === id);

  const [comments, setComments] = useState([
    { id: 1, author: "Jane Doe", date: "2 days ago", text: "Great insights! I'll definitely try implementing these AI strategies in my workflow." },
    { id: 2, author: "John Smith", date: "1 day ago", text: "Do you have any specific tools you recommend for the automation part?" }
  ]);
  const [newCommentName, setNewCommentName] = useState("");
  const [newCommentText, setNewCommentText] = useState("");
  const [commentErrors, setCommentErrors] = useState<{name?: string, text?: string}>({});

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors: {name?: string, text?: string} = {};
    if (!newCommentName.trim()) errors.name = "Please enter your name.";
    else if (newCommentName.trim().length < 2) errors.name = "Name must be at least 2 characters.";
    
    if (!newCommentText.trim()) errors.text = "Please enter a comment.";
    else if (newCommentText.trim().length < 10) errors.text = "Comment must be at least 10 characters.";

    if (Object.keys(errors).length > 0) {
      setCommentErrors(errors);
      return;
    }

    setComments([...comments, { id: Date.now(), author: newCommentName.trim(), date: "Just now", text: newCommentText.trim() }]);
    setNewCommentText("");
    setNewCommentName("");
    setCommentErrors({});
  };

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
              <p className="text-sm font-bold text-[var(--color-text-primary)]">Share this article:</p>
              <div className="flex gap-3">
                <button 
                  onClick={() => window.open(shareUrls.twitter, '_blank')}
                  className="w-10 h-10 rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex items-center justify-center hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2] transition-all"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => window.open(shareUrls.linkedin, '_blank')}
                  className="w-10 h-10 rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex items-center justify-center hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-all"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => window.open(shareUrls.facebook, '_blank')}
                  className="w-10 h-10 rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex items-center justify-center hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all"
                  aria-label="Share on Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mb-24">
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <MessageSquare className="w-6 h-6 text-[var(--color-primary)]" />
            Discussion ({comments.length})
          </h3>
          
          <div className="glass-panel p-6 mb-10">
            <form onSubmit={handleCommentSubmit} className="flex flex-col gap-4">
              <div>
                <input 
                  type="text"
                  value={newCommentName}
                  onChange={(e) => { setNewCommentName(e.target.value); if(commentErrors.name) setCommentErrors({...commentErrors, name: ''}); }}
                  placeholder="Your Name"
                  className={`w-full bg-transparent border ${commentErrors.name ? 'border-red-500' : 'border-[var(--color-border)]'} rounded-xl p-4 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors`}
                />
                {commentErrors.name && <p className="text-red-500 text-xs mt-2 ml-1">{commentErrors.name}</p>}
              </div>
              <div>
                <textarea 
                  value={newCommentText}
                  onChange={(e) => { setNewCommentText(e.target.value); if(commentErrors.text) setCommentErrors({...commentErrors, text: ''}); }}
                  placeholder="Share your thoughts..."
                  className={`w-full bg-transparent border ${commentErrors.text ? 'border-red-500' : 'border-[var(--color-border)]'} rounded-xl p-4 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors min-h-[100px] resize-y`}
                />
                {commentErrors.text && <p className="text-red-500 text-xs mt-2 ml-1">{commentErrors.text}</p>}
              </div>
              <div className="flex justify-end">
                <button 
                  type="submit" 
                  className="px-6 py-2.5 rounded-xl bg-[var(--color-primary)] text-white font-bold hover:bg-[var(--color-primary-light)] transition-colors flex items-center gap-2"
                >
                  Post Comment <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-6">
            {comments.slice().reverse().map((comment) => (
              <div key={comment.id} className="flex gap-4 p-6 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center font-bold text-white shrink-0">
                  {comment.author.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-[var(--color-text-primary)]">{comment.author}</h4>
                    <span className="text-xs text-[var(--color-text-muted)]">{comment.date}</span>
                  </div>
                  <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                    {comment.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related Posts */}
        <div className="mb-24">
          <h3 className="text-2xl font-bold mb-8 relative inline-block">
            Related Articles
            <div className="absolute -bottom-2 left-0 w-1/2 h-1 bg-[var(--color-primary)] rounded-full"></div>
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {relatedPosts.map(p => (
              <Link 
                key={p.id} 
                to={`/blog/${p.id}`}
                className="glass-panel group block overflow-hidden flex flex-col h-full hover:shadow-[0_0_30px_rgba(108,92,231,0.15)] transition-all duration-300"
              >
                <div className="aspect-[16/9] w-full overflow-hidden">
                  <img 
                    src={p.image} 
                    alt={p.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <span className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-widest mb-3 block">
                    {p.category}
                  </span>
                  <h4 className="text-lg font-bold mb-3 group-hover:text-[var(--color-primary-light)] transition-colors line-clamp-2">
                    {p.title}
                  </h4>
                  <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 mt-auto">
                    {p.excerpt}
                  </p>
                </div>
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

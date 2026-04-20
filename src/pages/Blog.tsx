import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Calendar, Clock, User, ArrowRight, Plus, X, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogPosts as initialPosts, BlogPost } from '../data/blogPosts';
import SEO from '../components/SEO';

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  
  const [newPost, setNewPost] = useState({
    title: '',
    category: '',
    content: '',
    tags: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Simulate initial fetching of posts
    const timer = setTimeout(() => {
      setPosts(initialPosts);
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const validatePost = () => {
    const newErrors: { [key: string]: string } = {};
    if (!newPost.title.trim()) newErrors.title = "Title is required.";
    else if (newPost.title.trim().length < 5) newErrors.title = "Title must be at least 5 characters.";
    
    if (!newPost.category) newErrors.category = "Category is required.";
    
    if (!newPost.tags.trim()) newErrors.tags = "At least one tag is required (comma separated).";
    
    if (!newPost.content.trim()) newErrors.content = "Content is required.";
    else if (newPost.content.trim().length < 50) newErrors.content = "Content must be at least 50 characters.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePost()) {
      setIsSubmitting(true);
      // Simulate API call to create post
      setTimeout(() => {
        const createdPost: BlogPost = {
          id: Math.random().toString(36).substr(2, 9),
          title: newPost.title,
          category: newPost.category,
          content: newPost.content,
          tags: newPost.tags.split(',').map(t => t.trim()),
          excerpt: newPost.content.substring(0, 100) + '...',
          author: 'You',
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          readTime: '1 min read',
          image: 'https://picsum.photos/seed/new/1200/600'
        };
        
        setPosts([createdPost, ...posts]);
        setIsSubmitting(false);
        setIsCreating(false);
        setNewPost({ title: '', category: '', content: '', tags: '' });
        setErrors({});
      }, 1500);
    }
  };

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
        "itemListElement": posts.map((post, index) => ({
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
      
      {/* Create Post Modal */}
      <AnimatePresence>
        {isCreating && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-2xl p-8 max-w-3xl w-full my-8 relative"
            >
              <button 
                onClick={() => setIsCreating(false)}
                className="absolute top-6 right-6 p-2 rounded-lg bg-[var(--color-bg-secondary)] hover:bg-[var(--color-border)] transition-colors"
              >
                <X className="w-5 h-5 text-[var(--color-text-secondary)]" />
              </button>
              
              <h2 className="text-2xl font-bold mb-6">Create New Post</h2>
              
              <form onSubmit={handleCreatePost} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Post Title *</label>
                  <input 
                    type="text" 
                    value={newPost.title}
                    onChange={e => { setNewPost({...newPost, title: e.target.value}); if(errors.title) setErrors({...errors, title: ''}) }}
                    className={`w-full px-4 py-3 rounded-xl bg-[var(--color-bg-secondary)] border ${errors.title ? 'border-red-500' : 'border-[var(--color-border)]'} text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)]`}
                    placeholder="Enter engaging title"
                  />
                  {errors.title && <p className="text-red-500 text-xs mt-2">{errors.title}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Category *</label>
                    <select 
                      value={newPost.category}
                      onChange={e => { setNewPost({...newPost, category: e.target.value}); if(errors.category) setErrors({...errors, category: ''}) }}
                      className={`w-full px-4 py-3 rounded-xl bg-[var(--color-bg-secondary)] border ${errors.category ? 'border-red-500' : 'border-[var(--color-border)]'} text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)]`}
                    >
                      <option value="">Select Category</option>
                      <option value="SEO">SEO</option>
                      <option value="AEO">AEO</option>
                      <option value="AI Agents">AI Agents</option>
                      <option value="Automation">Automation</option>
                      <option value="Web Design">Web Design</option>
                    </select>
                    {errors.category && <p className="text-red-500 text-xs mt-2">{errors.category}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Tags *</label>
                    <input 
                      type="text" 
                      value={newPost.tags}
                      onChange={e => { setNewPost({...newPost, tags: e.target.value}); if(errors.tags) setErrors({...errors, tags: ''}) }}
                      className={`w-full px-4 py-3 rounded-xl bg-[var(--color-bg-secondary)] border ${errors.tags ? 'border-red-500' : 'border-[var(--color-border)]'} text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)]`}
                      placeholder="e.g. AI, Future, Marketing"
                    />
                    {errors.tags && <p className="text-red-500 text-xs mt-2">{errors.tags}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Markdown Content *</label>
                  <textarea 
                    rows={12}
                    value={newPost.content}
                    onChange={e => { setNewPost({...newPost, content: e.target.value}); if(errors.content) setErrors({...errors, content: ''}) }}
                    className={`w-full px-4 py-3 rounded-xl bg-[var(--color-bg-secondary)] border ${errors.content ? 'border-red-500' : 'border-[var(--color-border)]'} text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)] font-mono text-sm resize-none`}
                    placeholder="# Write your markdown content here..."
                  />
                  {errors.content && <p className="text-red-500 text-xs mt-2">{errors.content}</p>}
                </div>

                <div className="flex justify-end gap-4 pt-4 border-t border-[var(--color-border)]">
                  <button 
                    type="button" 
                    onClick={() => setIsCreating(false)}
                    disabled={isSubmitting}
                    className="px-6 py-3 rounded-xl border border-[var(--color-border)] text-[var(--color-text-primary)] font-bold transition-all hover:bg-[var(--color-bg-secondary)] disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="px-6 py-3 rounded-xl bg-[var(--color-primary)] text-white font-bold transition-all hover:bg-[var(--color-primary-dark)] flex items-center justify-center gap-2 disabled:opacity-50 min-w-[140px]"
                  >
                    {isSubmitting ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Publishing...</>
                    ) : (
                      'Publish Post'
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-7xl font-bold mb-6">Insights & <span className="text-gradient">Innovation</span></h1>
          <p className="text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Stay ahead of the curve with our latest thoughts on AI, SEO, and digital strategy.
          </p>
        </div>

        {/* Search & Categories */}
        <div className="flex flex-col md:flex-row gap-8 mb-16 items-center justify-between">
          <div className="flex items-center gap-4 w-full md:w-auto">
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
            <button 
              onClick={() => setIsCreating(true)}
              className="shrink-0 p-3 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white shadow-lg shadow-[var(--color-primary)]/20 transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden md:inline font-bold pr-2">New Post</span>
            </button>
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
          {isLoading ? (
            // Skeleton Loaders
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="glass-panel overflow-hidden flex flex-col animate-pulse">
                <div className="relative aspect-video bg-[var(--color-bg-secondary)]"></div>
                <div className="p-8 flex-grow flex flex-col">
                  <div className="flex gap-4 mb-4">
                    <div className="h-4 w-16 bg-[var(--color-bg-secondary)] rounded"></div>
                    <div className="h-4 w-16 bg-[var(--color-bg-secondary)] rounded"></div>
                    <div className="h-4 w-16 bg-[var(--color-bg-secondary)] rounded"></div>
                  </div>
                  <div className="h-8 bg-[var(--color-bg-secondary)] rounded mb-4 w-3/4"></div>
                  <div className="h-4 bg-[var(--color-bg-secondary)] rounded mb-2 w-full"></div>
                  <div className="h-4 bg-[var(--color-bg-secondary)] rounded mb-8 w-5/6"></div>
                  <div className="h-6 w-32 bg-[var(--color-bg-secondary)] rounded mt-auto"></div>
                </div>
              </div>
            ))
          ) : filteredPosts.length > 0 ? (
            filteredPosts.map((post, i) => (
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
            ))
          ) : (
             <div className="col-span-1 lg:col-span-2 text-center py-20 text-[var(--color-text-secondary)]">
               No articles found matching your criteria.
             </div>
          )}
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

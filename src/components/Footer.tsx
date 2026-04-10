import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Github, Instagram, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[var(--color-bg-primary)] pt-24 pb-12 border-t border-[var(--color-border)] relative z-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center">
                <span className="font-heading font-bold text-white text-xl">K</span>
              </div>
              <span className="font-heading font-bold text-2xl tracking-tight text-[var(--color-text-primary)]">Klickra</span>
            </div>
            <p className="text-[var(--color-text-secondary)] mb-8 max-w-sm">
              AI-Powered Digital Growth — All Services, One Platform. We help businesses scale with cutting-edge technology and data-driven strategies.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[var(--color-bg-secondary)] flex items-center justify-center text-[var(--color-text-secondary)] hover:text-white hover:bg-[var(--color-primary)] transition-all duration-300">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[var(--color-bg-secondary)] flex items-center justify-center text-[var(--color-text-secondary)] hover:text-white hover:bg-[var(--color-primary)] transition-all duration-300">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[var(--color-bg-secondary)] flex items-center justify-center text-[var(--color-text-secondary)] hover:text-white hover:bg-[var(--color-primary)] transition-all duration-300">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[var(--color-bg-secondary)] flex items-center justify-center text-[var(--color-text-secondary)] hover:text-white hover:bg-[var(--color-primary)] transition-all duration-300">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-[var(--color-text-primary)] font-bold mb-6 uppercase text-xs tracking-widest">Services</h4>
            <ul className="space-y-4">
              <li><Link to="/service/seo" className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors text-sm">SEO & SXO</Link></li>
              <li><Link to="/service/web-app-dev" className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors text-sm">Web Development</Link></li>
              <li><Link to="/service/ai-agents" className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors text-sm">AI Agents</Link></li>
              <li><Link to="/service/automation" className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors text-sm">Workflow Automation</Link></li>
              <li><Link to="/portfolio" className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors text-sm">Portfolio</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[var(--color-text-primary)] font-bold mb-6 uppercase text-xs tracking-widest">Company</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors text-sm">About Us</Link></li>
              <li><Link to="/pricing" className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors text-sm">Pricing</Link></li>
              <li><Link to="/blog" className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors text-sm">Blog</Link></li>
              <li><Link to="/contact" className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors text-sm">Contact</Link></li>
              <li><Link to="/tools" className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors text-sm">AI Tools</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[var(--color-text-primary)] font-bold mb-6 uppercase text-xs tracking-widest">Newsletter</h4>
            <p className="text-[var(--color-text-secondary)] text-sm mb-4">Get the latest insights on AI and digital growth.</p>
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="w-full px-4 py-2 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)] text-sm"
              />
              <button type="submit" className="px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transition-colors flex items-center justify-center">
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[var(--color-text-muted)] text-sm">© 2026 Klickra. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse"></span>
            <span className="text-[var(--color-text-muted)] text-sm font-medium">Powered by Klickra AI</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-[var(--color-text-muted)] hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-[var(--color-text-muted)] hover:text-white text-sm transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

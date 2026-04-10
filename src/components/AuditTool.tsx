import React, { useState } from 'react';
import { Activity, Search, Zap, Shield, Globe, Smartphone } from 'lucide-react';

export default function AuditTool() {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    setIsAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      setResults({
        seo: 92,
        performance: 85,
        accessibility: 98,
        bestPractices: 100,
        aeo: 75,
        sxo: 88
      });
      setIsAnalyzing(false);
    }, 2500);
  };

  const metrics = [
    { label: 'SEO Score', value: results?.seo, icon: <Search className="w-5 h-5" />, color: '#00F5A0' },
    { label: 'Performance', value: results?.performance, icon: <Zap className="w-5 h-5" />, color: '#6C5CE7' },
    { label: 'Accessibility', value: results?.accessibility, icon: <Shield className="w-5 h-5" />, color: '#00D9F5' },
    { label: 'Best Practices', value: results?.bestPractices, icon: <Activity className="w-5 h-5" />, color: '#A29BFE' },
    { label: 'AEO Readiness', value: results?.aeo, icon: <Globe className="w-5 h-5" />, color: '#FF9F43' },
    { label: 'SXO Score', value: results?.sxo, icon: <Smartphone className="w-5 h-5" />, color: '#FF4757' },
  ];

  return (
    <section id="tools" className="py-24 relative z-20 bg-[var(--color-bg-primary)]">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="glass-panel p-8 md:p-12 relative overflow-hidden border-[var(--color-primary)]/30">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-primary)]/10 rounded-full blur-[80px]"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--color-accent)]/10 rounded-full blur-[80px]"></div>

          <div className="relative z-10 text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Free AI-Powered <span className="text-gradient">Website Audit</span></h2>
            <p className="text-[var(--color-text-secondary)]">Enter your URL to get an instant analysis of your SEO, Performance, and AI-readiness.</p>
          </div>

          <form onSubmit={handleAudit} className="relative z-10 max-w-2xl mx-auto mb-12">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Globe className="w-5 h-5 text-[var(--color-text-muted)]" />
                </div>
                <input 
                  type="url" 
                  placeholder="https://yourwebsite.com" 
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-white focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                />
              </div>
              <button 
                type="submit" 
                disabled={isAnalyzing}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-black font-bold whitespace-nowrap hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center min-w-[160px]"
              >
                {isAnalyzing ? (
                  <span className="flex items-center gap-2">
                    <Activity className="w-5 h-5 animate-spin" /> Analyzing...
                  </span>
                ) : 'Run Free Audit'}
              </button>
            </div>
          </form>

          {results && (
            <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {metrics.map((metric, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="relative w-24 h-24 mb-4">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-[var(--color-bg-secondary)]"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={251.2}
                        strokeDashoffset={251.2 - (251.2 * (metric.value || 0)) / 100}
                        className="transition-all duration-1000 ease-out"
                        style={{ color: metric.color }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl font-bold font-mono" style={{ color: metric.color }}>{metric.value}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <span style={{ color: metric.color }}>{metric.icon}</span>
                    <span className="text-sm font-bold text-[var(--color-text-primary)] uppercase tracking-wider">{metric.label}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

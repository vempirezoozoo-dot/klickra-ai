import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Search, Code, Cpu, Zap, Globe, Layout, Smartphone, Database, Shield, BarChart, Mail, PenTool, Share2, Target, Users, Video, Mic, Image as ImageIcon, Briefcase, Server } from 'lucide-react';

const services = [
  { id: 'seo', icon: <Search />, title: 'SEO', desc: 'Search Engine Optimization' },
  { id: 'sxo', icon: <Target />, title: 'SXO', desc: 'Search Experience Optimization' },
  { id: 'aeo', icon: <Mic />, title: 'AEO', desc: 'Answer Engine Optimization' },
  { id: 'geo', icon: <Cpu />, title: 'GEO', desc: 'Generative Engine Optimization' },
  { id: 'aio', icon: <Zap />, title: 'AIO', desc: 'AI Optimization' },
  { id: 'one-page-website', icon: <Layout />, title: 'One Page Website', desc: 'Quick & Professional' },
  { id: 'web-design', icon: <Layout />, title: 'Web Design', desc: 'UI/UX, Responsive, 3D Web' },
  { id: 'web-app-dev', icon: <Code />, title: 'Web App Dev', desc: 'SaaS, PWA, Full-Stack' },
  { id: 'deployment', icon: <Server />, title: 'Deployment', desc: 'CI/CD, Cloud, Serverless' },
  { id: 'ai-agents', icon: <Cpu />, title: 'AI Agents', desc: 'Custom GPTs, Chatbots' },
  { id: 'automation', icon: <Zap />, title: 'Automation', desc: 'Workflow Automation' },
  { id: 'content', icon: <PenTool />, title: 'Content', desc: 'Marketing & Strategy' },
  { id: 'social-media', icon: <Share2 />, title: 'Social Media', desc: 'Management & Growth' },
  { id: 'ppc', icon: <BarChart />, title: 'PPC & Ads', desc: 'Paid Ads Management' },
  { id: 'email', icon: <Mail />, title: 'Email', desc: 'Marketing Automation' },
  { id: 'cro', icon: <Target />, title: 'CRO', desc: 'Conversion Rate Optimization' },
  { id: 'brand-identity', icon: <ImageIcon />, title: 'Brand Identity', desc: 'Logo & Visual Design' },
  { id: 'mobile-apps', icon: <Smartphone />, title: 'Mobile Apps', desc: 'iOS & Android Dev' },
  { id: 'api-dev', icon: <Database />, title: 'API Dev', desc: 'Development & Integration' },
  { id: 'data-analytics', icon: <BarChart />, title: 'Data Analytics', desc: 'Business Intelligence' },
  { id: 'cybersecurity', icon: <Shield />, title: 'Cybersecurity', desc: 'Audits & Protection' },
];

export default function ServicesGrid() {
  return (
    <section id="services" className="py-24 relative z-20 bg-[var(--color-bg-primary)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Comprehensive <span className="text-gradient">Digital Services</span></h2>
          <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">Everything you need to scale your business in the AI era, all under one roof.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {services.map((service) => (
            <motion.div
              key={service.id}
              whileHover={{ scale: 1.05, rotateY: 10, rotateX: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="perspective-1000"
            >
              <Link 
                to={`/service/${service.id}`}
                className="glass-panel p-6 group hover:border-[var(--color-primary)] transition-all duration-300 cursor-pointer block h-full"
              >
                <div className="w-12 h-12 rounded-full bg-[var(--color-bg-secondary)] flex items-center justify-center mb-4 text-[var(--color-primary-light)] group-hover:text-[var(--color-accent)] group-hover:scale-110 transition-all duration-300">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold mb-2 text-[var(--color-text-primary)] group-hover:text-[var(--color-primary-light)] transition-colors">{service.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)]">{service.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

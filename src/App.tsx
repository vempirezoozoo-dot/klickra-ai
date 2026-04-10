import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import CustomCursor from './components/CustomCursor';
import Home from './pages/Home';
import AITools from './pages/AITools';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';
import ServiceDetail from './pages/ServiceDetail';
import Leads from './pages/Leads';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import PricingPage from './pages/PricingPage';
import PaymentSuccess from './pages/PaymentSuccess';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <CustomCursor />
        <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] selection:bg-[var(--color-primary)] selection:text-white transition-colors duration-300">
          <Navigation onToggleTheme={toggleTheme} currentTheme={theme} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tools" element={<AITools />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/service/:id" element={<ServiceDetail />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/about" element={<About />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Sun, Moon } from 'lucide-react';
import { auth, db, signInWithGoogle, logOut } from '../firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

interface NavigationProps {
  onToggleTheme: () => void;
  currentTheme: 'dark' | 'light';
}

export default function Navigation({ onToggleTheme, currentTheme }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists() && userDoc.data().role === 'admin') {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        } catch (error) {
          console.error("Error fetching user role", error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[var(--color-bg-primary)]/80 backdrop-blur-md border-b border-[var(--color-border)] py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center">
            <span className="font-heading font-bold text-white text-xl">K</span>
          </div>
          <span className="font-heading font-bold text-2xl tracking-tight">Klickra</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <div className="relative group">
            <button className="flex items-center gap-1 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors py-2">
              Services <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
            </button>
            <div className="absolute top-full left-0 w-64 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
              <div className="glass-panel p-4 shadow-2xl border-[var(--color-border)]">
                <div className="grid gap-2">
                  <Link to="/service/seo" className="px-3 py-2 rounded-lg hover:bg-[var(--color-primary)]/10 text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">SEO & SXO</Link>
                  <Link to="/service/aeo" className="px-3 py-2 rounded-lg hover:bg-[var(--color-primary)]/10 text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">AEO Readiness</Link>
                  <Link to="/service/web-dev" className="px-3 py-2 rounded-lg hover:bg-[var(--color-primary)]/10 text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">Web Development</Link>
                  <Link to="/service/ai-agents" className="px-3 py-2 rounded-lg hover:bg-[var(--color-primary)]/10 text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">AI Agents</Link>
                  <Link to="/contact" className="px-3 py-2 rounded-lg hover:bg-[var(--color-primary)]/10 text-sm text-[var(--color-primary-light)] font-bold transition-colors">View All Services &rarr;</Link>
                </div>
              </div>
            </div>
          </div>
          <Link to="/pricing" className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">Pricing</Link>
          <Link to="/tools" className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">AI Tools</Link>
          <Link to="/portfolio" className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">Portfolio</Link>
          <Link to="/blog" className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">Blog</Link>
          <Link to="/about" className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">About</Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={onToggleTheme}
            className="p-2 rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-[var(--color-primary)] transition-all"
            aria-label="Toggle Theme"
          >
            {currentTheme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {user ? (
            <>
              {isAdmin && (
                <Link to="/leads" className="text-sm font-medium text-[var(--color-primary-light)] hover:text-[var(--color-text-primary)] transition-colors">Leads</Link>
              )}
              <Link to="/dashboard" className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">Dashboard</Link>
              <button onClick={handleLogout} className="text-sm font-medium text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors">Logout</button>
            </>
          ) : (
            <>
              <button onClick={handleLogin} className="text-sm font-medium text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors">Login</button>
              <Link to="/contact" className="px-5 py-2.5 rounded-full bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] font-medium text-sm hover:bg-[var(--color-accent)] transition-colors">Get Started</Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={onToggleTheme}
            className="p-2 rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)]"
          >
            {currentTheme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button className="text-[var(--color-text-primary)]" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </nav>
  );
}

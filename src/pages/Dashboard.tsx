import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, query, where, getDocs, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Activity, CreditCard, FileText, Settings, User as UserIcon, MessageSquare, Plus, ExternalLink } from 'lucide-react';

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('projects');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          await setDoc(doc(db, 'users', currentUser.uid), {
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            role: 'client',
            createdAt: serverTimestamp()
          }, { merge: true });
        } catch (error) {
          console.error("Error creating user doc", error);
        }
      } else {
        navigate('/');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const stats = [
    { label: 'Active Projects', value: '0', icon: <Activity className="w-4 h-4" /> },
    { label: 'Total Spent', value: '$0.00', icon: <CreditCard className="w-4 h-4" /> },
    { label: 'Support Tickets', value: '0', icon: <MessageSquare className="w-4 h-4" /> },
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[var(--color-bg-primary)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, <span className="text-gradient">{user?.displayName?.split(' ')[0] || 'User'}</span></h1>
            <p className="text-[var(--color-text-secondary)]">Manage your projects, invoices, and support tickets.</p>
          </div>
          <button onClick={() => navigate('/contact')} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-primary)] text-white font-bold hover:bg-[var(--color-primary-dark)] transition-all">
            <Plus className="w-5 h-5" /> New Project
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, i) => (
            <div key={i} className="glass-panel p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--color-text-secondary)] mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-[var(--color-text-primary)]">{stat.value}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-[var(--color-bg-secondary)] flex items-center justify-center text-[var(--color-primary)]">
                {stat.icon}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 shrink-0">
            <div className="glass-panel p-4 sticky top-32">
              <nav className="space-y-1">
                {[
                  { id: 'projects', label: 'Projects', icon: <Activity className="w-5 h-5" /> },
                  { id: 'invoices', label: 'Invoices', icon: <FileText className="w-5 h-5" /> },
                  { id: 'support', label: 'Support', icon: <MessageSquare className="w-5 h-5" /> },
                  { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${activeTab === item.id ? 'bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/20' : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)]'}`}
                  >
                    {item.icon} {item.label}
                  </button>
                ))}
              </nav>

              <div className="mt-8 pt-8 border-t border-[var(--color-border)]">
                <div className="flex items-center gap-3 px-4">
                  {user?.photoURL ? (
                    <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[var(--color-bg-secondary)] flex items-center justify-center">
                      <UserIcon className="w-4 h-4 text-[var(--color-text-secondary)]" />
                    </div>
                  )}
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold text-[var(--color-text-primary)] truncate">{user?.displayName}</p>
                    <p className="text-[10px] text-[var(--color-text-muted)] truncate">{user?.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-grow">
            {activeTab === 'projects' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="glass-panel p-8">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold">Active Projects</h2>
                  </div>
                  <div className="bg-[var(--color-bg-secondary)]/50 rounded-xl p-12 text-center border border-[var(--color-border)]">
                    <Activity className="w-16 h-16 text-[var(--color-text-muted)] mx-auto mb-6 opacity-20" />
                    <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-3">No active projects</h3>
                    <p className="text-[var(--color-text-secondary)] mb-8 max-w-md mx-auto">You haven't started any projects with Klickra yet. Ready to grow your digital presence?</p>
                    <button onClick={() => navigate('/contact')} className="px-8 py-4 rounded-xl bg-[var(--color-primary)] text-white font-bold hover:scale-105 transition-transform">
                      Start Your First Project
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'invoices' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="glass-panel p-8">
                  <h2 className="text-2xl font-bold mb-8">Billing & Invoices</h2>
                  <div className="bg-[var(--color-bg-secondary)]/50 rounded-xl p-12 text-center border border-[var(--color-border)]">
                    <CreditCard className="w-16 h-16 text-[var(--color-text-muted)] mx-auto mb-6 opacity-20" />
                    <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-3">No invoices found</h3>
                    <p className="text-[var(--color-text-secondary)] mb-8">Your billing history and upcoming payments will appear here.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'support' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="glass-panel p-8">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold">Support Tickets</h2>
                    <button className="text-sm font-bold text-[var(--color-primary-light)] hover:text-[var(--color-text-primary)] transition-colors flex items-center gap-1">
                      <Plus className="w-4 h-4" /> Open Ticket
                    </button>
                  </div>
                  <div className="bg-[var(--color-bg-secondary)]/50 rounded-xl p-12 text-center border border-[var(--color-border)]">
                    <MessageSquare className="w-16 h-16 text-[var(--color-text-muted)] mx-auto mb-6 opacity-20" />
                    <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-3">All clear!</h3>
                    <p className="text-[var(--color-text-secondary)] mb-8">You don't have any open support tickets at the moment.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="glass-panel p-8">
                  <h2 className="text-2xl font-bold mb-8">Account Settings</h2>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Display Name</label>
                        <input type="text" defaultValue={user?.displayName || ''} className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)]" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Email Address</label>
                        <input type="email" defaultValue={user?.email || ''} disabled className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-muted)] cursor-not-allowed" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Company Name</label>
                      <input type="text" placeholder="Your Company" className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)]" />
                    </div>
                    <div className="pt-4">
                      <button className="px-6 py-3 rounded-xl bg-[var(--color-primary)] text-white font-bold hover:bg-[var(--color-primary-dark)] transition-all">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

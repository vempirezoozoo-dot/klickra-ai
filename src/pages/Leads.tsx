import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, query, getDocs, orderBy, updateDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Users, Mail, Phone, Calendar, DollarSign, CheckCircle, Clock } from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  services?: string[];
  budget?: string;
  timeline?: string;
  description?: string;
  status: 'pending' | 'reviewed' | 'contacted';
  createdAt: any;
}

export default function Leads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Check if user is admin by trying to fetch leads
        try {
          const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
          const querySnapshot = await getDocs(q);
          const leadsData: Lead[] = [];
          querySnapshot.forEach((doc) => {
            leadsData.push({ id: doc.id, ...doc.data() } as Lead);
          });
          setLeads(leadsData);
          setIsAdmin(true);
        } catch (error) {
          console.error("Error fetching leads (might not be admin):", error);
          setIsAdmin(false);
        }
      } else {
        navigate('/');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const updateStatus = async (id: string, newStatus: Lead['status']) => {
    try {
      await updateDoc(doc(db, 'inquiries', id), {
        status: newStatus
      });
      setLeads(leads.map(lead => lead.id === id ? { ...lead, status: newStatus } : lead));
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center bg-[var(--color-bg-primary)]">
        <div className="glass-panel p-12 text-center max-w-lg mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-red-400">Access Denied</h2>
          <p className="text-[var(--color-text-secondary)] mb-8">
            You do not have permission to view this page. Only administrators can access the leads dashboard.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="px-8 py-4 rounded-xl bg-[var(--color-primary)] text-white font-bold"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[var(--color-bg-primary)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-2">Leads <span className="text-gradient">Dashboard</span></h1>
            <p className="text-[var(--color-text-secondary)]">Manage and track your incoming inquiries.</p>
          </div>
          <div className="bg-[var(--color-bg-secondary)] px-6 py-3 rounded-xl border border-[var(--color-border)] flex items-center gap-3">
            <Users className="w-5 h-5 text-[var(--color-primary)]" />
            <span className="font-bold">{leads.length} Total Leads</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {leads.length === 0 ? (
            <div className="glass-panel p-12 text-center">
              <p className="text-[var(--color-text-secondary)]">No leads found.</p>
            </div>
          ) : (
            leads.map((lead) => (
              <div key={lead.id} className="glass-panel p-6 md:p-8 flex flex-col md:flex-row gap-8">
                <div className="flex-grow space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-1">{lead.name}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--color-text-secondary)]">
                        <a href={`mailto:${lead.email}`} className="flex items-center gap-1 hover:text-[var(--color-text-primary)] transition-colors">
                          <Mail className="w-4 h-4" /> {lead.email}
                        </a>
                        {lead.phone && (
                          <a href={`tel:${lead.phone}`} className="flex items-center gap-1 hover:text-[var(--color-text-primary)] transition-colors">
                            <Phone className="w-4 h-4" /> {lead.phone}
                          </a>
                        )}
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" /> 
                          {lead.createdAt?.toDate ? lead.createdAt.toDate().toLocaleDateString() : 'Unknown date'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <select 
                        value={lead.status}
                        onChange={(e) => updateStatus(lead.id, e.target.value as Lead['status'])}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold border outline-none appearance-none cursor-pointer ${
                          lead.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                          lead.status === 'reviewed' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                          'bg-green-500/10 text-green-500 border-green-500/20'
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="contacted">Contacted</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[var(--color-border)]">
                    {lead.services && lead.services.length > 0 && (
                      <div>
                        <span className="block text-xs font-medium text-[var(--color-text-muted)] mb-1">Services Requested</span>
                        <div className="flex flex-wrap gap-2">
                          {lead.services.map(service => (
                            <span key={service} className="px-2 py-1 rounded bg-[var(--color-bg-secondary)] text-xs text-[var(--color-text-secondary)]">
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex gap-6">
                      {lead.budget && (
                        <div>
                          <span className="block text-xs font-medium text-[var(--color-text-muted)] mb-1">Budget</span>
                          <span className="flex items-center gap-1 text-sm text-white">
                            <DollarSign className="w-4 h-4 text-[var(--color-primary)]" /> {lead.budget}
                          </span>
                        </div>
                      )}
                      {lead.timeline && (
                        <div>
                          <span className="block text-xs font-medium text-[var(--color-text-muted)] mb-1">Timeline</span>
                          <span className="flex items-center gap-1 text-sm text-white">
                            <Calendar className="w-4 h-4 text-[var(--color-primary)]" /> {lead.timeline}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {lead.description && (
                    <div className="pt-4 border-t border-[var(--color-border)]">
                      <span className="block text-xs font-medium text-[var(--color-text-muted)] mb-2">Project Description</span>
                      <p className="text-sm text-[var(--color-text-secondary)] bg-[var(--color-bg-secondary)]/50 p-4 rounded-xl">
                        {lead.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Send, CheckCircle, Loader2 } from 'lucide-react';
import SEO from '../components/SEO';

export default function Contact() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    services: [] as string[],
    budget: '',
    timeline: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const serviceOptions = [
    'SEO / SXO', 'Web Design', 'Web App Development', 
    'AI Agents', 'Workflow Automation', 'Content Strategy',
    'AEO & GEO', 'Cybersecurity', 'Data Analytics'
  ];

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service) 
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await addDoc(collection(db, 'inquiries'), {
        ...formData,
        status: 'pending',
        createdAt: serverTimestamp(),
        userId: auth.currentUser?.uid || null
      });
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setError('An error occurred while submitting your inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-[var(--color-bg-primary)] flex items-center justify-center">
        <div className="glass-panel p-12 text-center max-w-lg mx-auto">
          <div className="w-20 h-20 bg-[var(--color-accent)]/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-[var(--color-accent)]" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Inquiry Received!</h2>
          <p className="text-[var(--color-text-secondary)] mb-8">
            Thank you, {formData.name}! We've received your inquiry. Our AI is analyzing your requirements and a specialist will contact you within 24 hours.
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            className="px-8 py-4 rounded-xl bg-[var(--color-primary)] text-white font-bold"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "Klickra",
      "url": "https://klickra.com",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-800-555-0199",
        "contactType": "customer service",
        "email": "hello@klickra.com",
        "availableLanguage": ["English"]
      }
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[var(--color-bg-primary)]">
      <SEO 
        title="Contact Klickra | Start Your Digital Transformation" 
        description="Get in touch with Klickra's expert team. Let's discuss how our AI automation, SEO, and web design services can scale your business."
        canonicalUrl="https://klickra.com/contact"
        schema={schema}
      />
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Let's Build <span className="text-gradient">Together</span></h1>
          <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">Step {step} of 4: {
            step === 1 ? 'Personal Details' : 
            step === 2 ? 'Service Selection' : 
            step === 3 ? 'Project Scope' : 'Final Details'
          }</p>
          
          {/* Progress Bar */}
          <div className="max-w-xs mx-auto mt-8 h-1 bg-[var(--color-bg-secondary)] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[var(--color-primary)] transition-all duration-500"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="glass-panel p-8 md:p-12">
          {error && (
            <div className="mb-8 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Name *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Email *</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)]"
                  />
                </div>
                <button 
                  type="button"
                  onClick={nextStep}
                  disabled={!formData.name || !formData.email}
                  className="w-full py-4 rounded-xl bg-white text-black font-bold disabled:opacity-50"
                >
                  Next Step
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-4">What services are you interested in?</label>
                <div className="flex flex-wrap gap-3">
                  {serviceOptions.map(service => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => handleServiceToggle(service)}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                        formData.services.includes(service) 
                          ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white' 
                          : 'bg-transparent border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary-light)]'
                      }`}
                    >
                      {service}
                    </button>
                  ))}
                </div>
                <div className="flex gap-4">
                  <button type="button" onClick={prevStep} className="flex-1 py-4 rounded-xl border border-[var(--color-border)] text-white">Back</button>
                  <button type="button" onClick={nextStep} disabled={formData.services.length === 0} className="flex-1 py-4 rounded-xl bg-white text-black font-bold disabled:opacity-50">Next Step</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Budget Range</label>
                    <select 
                      value={formData.budget}
                      onChange={e => setFormData({...formData, budget: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-white focus:outline-none focus:border-[var(--color-primary)]"
                    >
                      <option value="">Select a range</option>
                      <option value="< $5k">Less than $5,000</option>
                      <option value="$5k - $10k">$5,000 - $10,000</option>
                      <option value="$10k - $25k">$10,000 - $25,000</option>
                      <option value="$25k+">$25,000+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Timeline</label>
                    <select 
                      value={formData.timeline}
                      onChange={e => setFormData({...formData, timeline: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-white focus:outline-none focus:border-[var(--color-primary)]"
                    >
                      <option value="">Select timeline</option>
                      <option value="ASAP">ASAP</option>
                      <option value="1-3 months">1-3 months</option>
                      <option value="3-6 months">3-6 months</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button type="button" onClick={prevStep} className="flex-1 py-4 rounded-xl border border-[var(--color-border)] text-white">Back</button>
                  <button type="button" onClick={nextStep} className="flex-1 py-4 rounded-xl bg-white text-black font-bold">Next Step</button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Project Description</label>
                  <textarea 
                    rows={5}
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-white focus:outline-none focus:border-[var(--color-primary)]"
                    placeholder="Tell us about your goals..."
                  ></textarea>
                </div>
                <div className="flex gap-4">
                  <button type="button" onClick={prevStep} className="flex-1 py-4 rounded-xl border border-[var(--color-border)] text-white">Back</button>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="flex-1 py-4 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-black font-bold flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>
                    ) : (
                      <><Send className="w-5 h-5" /> Send Inquiry</>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Check, ExternalLink, ArrowRight, X, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const navigate = useNavigate();

  const plans = [
    {
      name: 'One Page Website',
      desc: 'Quick and professional one-page website development.',
      price: 1,
      features: ['Custom Design', 'Mobile Responsive', 'Basic SEO', 'Contact Form', 'Fast Delivery'],
      popular: false
    },
    {
      name: 'Starter',
      desc: 'Perfect for small businesses starting their digital journey.',
      price: isAnnual ? 499 : 599,
      features: ['Basic SEO Optimization', '5 Pages Web Design', 'Monthly Performance Report', 'Email Support', 'Basic Analytics Setup'],
      popular: false
    },
    {
      name: 'Professional',
      desc: 'Comprehensive solution for growing companies.',
      price: isAnnual ? 999 : 1199,
      features: ['Advanced SEO & SXO', 'Custom Web App Development', '1 Custom AI Agent', 'Weekly Strategy Calls', 'Priority Support', 'Full Analytics Dashboard'],
      popular: true
    },
    {
      name: 'Enterprise',
      desc: 'Full-scale digital transformation and AI integration.',
      price: isAnnual ? 2499 : 2999,
      features: ['Complete AEO & GEO Strategy', 'Complex Web App & Mobile App', 'Unlimited AI Agents', 'Dedicated Account Manager', '24/7 Phone Support', 'Custom API Integrations', 'Cybersecurity Audit'],
      popular: false
    }
  ];

  const handlePayment = (plan: any) => {
    setSelectedPlan(plan);
    setIsRedirecting(true);
    
    // Open Razorpay in new tab with amount parameter
    window.open(`https://razorpay.me/@akshaykumar6678?amount=${plan.price}`, '_blank');
    
    // Simulate a short delay before showing the "Complete Payment" UI
    setTimeout(() => {
      setIsRedirecting(false);
    }, 1500);
  };

  const confirmPayment = () => {
    if (selectedPlan) {
      navigate(`/payment-success?plan=${selectedPlan.name}&amount=${selectedPlan.price}`);
    }
  };

  return (
    <section id="pricing" className="py-24 relative z-20 bg-[var(--color-bg-secondary)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Transparent <span className="text-gradient">Pricing</span></h2>
          <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-8">Choose the perfect plan to accelerate your digital growth.</p>
          
          <div className="inline-flex items-center p-1 bg-[var(--color-bg-primary)] rounded-full border border-[var(--color-border)]">
            <button 
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${!isAnnual ? 'bg-[var(--color-primary)] text-white' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}
              onClick={() => setIsAnnual(false)}
            >
              Monthly
            </button>
            <button 
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${isAnnual ? 'bg-[var(--color-primary)] text-white' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}
              onClick={() => setIsAnnual(true)}
            >
              Annually <span className="text-xs bg-[var(--color-accent)] text-black px-2 py-0.5 rounded-full font-bold">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className={`glass-panel p-8 relative flex flex-col ${plan.popular ? 'border-[var(--color-primary)] shadow-[0_0_30px_rgba(108,92,231,0.2)] transform md:-translate-y-4' : 'border-[var(--color-border)]'}`}>
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-black text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-2xl font-bold mb-2 text-[var(--color-text-primary)]">{plan.name}</h3>
              <p className="text-sm text-[var(--color-text-muted)] mb-6 min-h-[40px]">{plan.desc}</p>
              
              <div className="mb-8">
                <span className="text-4xl font-bold text-[var(--color-text-primary)]">${plan.price}</span>
                <span className="text-[var(--color-text-secondary)]">/mo</span>
              </div>
              
              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3 text-sm text-[var(--color-text-secondary)]">
                    <Check className="w-5 h-5 text-[var(--color-accent)] shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={() => handlePayment(plan)}
                className={`w-full py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 ${plan.popular ? 'bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] hover:bg-[var(--color-primary)] hover:text-white' : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] border border-[var(--color-border)] hover:border-[var(--color-primary)]'}`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                  <path d="M12 2L2 12L12 22L22 12L12 2Z" fill="currentColor" className={plan.popular ? 'text-[var(--color-bg-primary)]' : 'text-[#3395FF]'}/>
                </svg>
                Pay with Razorpay
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Processing Modal */}
      <AnimatePresence>
        {selectedPlan && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPlan(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg glass-panel p-8 overflow-hidden"
            >
              <button 
                onClick={() => setSelectedPlan(null)}
                className="absolute top-4 right-4 text-[var(--color-text-muted)] hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center">
                {isRedirecting ? (
                  <div className="py-12">
                    <Loader2 className="w-16 h-16 text-[var(--color-primary)] animate-spin mx-auto mb-6" />
                    <h3 className="text-2xl font-bold mb-2">Redirecting to Razorpay</h3>
                    <p className="text-[var(--color-text-secondary)]">Please complete your payment in the new tab.</p>
                  </div>
                ) : (
                  <div className="py-6">
                    <div className="w-16 h-16 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center mx-auto mb-6">
                      <ExternalLink className="w-8 h-8 text-[var(--color-primary)]" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Payment Initiated</h3>
                    <p className="text-[var(--color-text-secondary)] mb-8">
                      We've opened the Razorpay payment page for your <strong>{selectedPlan.name}</strong> plan.
                    </p>
                    
                    <div className="space-y-4">
                      <button 
                        onClick={confirmPayment}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-black font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                      >
                        I've Completed the Payment <ArrowRight className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => window.open(`https://razorpay.me/@akshaykumar6678?amount=${selectedPlan.price}`, '_blank')}
                        className="w-full py-4 rounded-xl border border-[var(--color-border)] text-[var(--color-text-primary)] font-bold hover:bg-[var(--color-bg-secondary)] transition-colors flex items-center justify-center gap-2"
                      >
                        Re-open Payment Page <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <p className="mt-6 text-xs text-[var(--color-text-muted)]">
                      Having trouble? Contact our support team for assistance.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

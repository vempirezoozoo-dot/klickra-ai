import React, { useState } from 'react';
import { Check, ExternalLink, ArrowRight, X, Loader2, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

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

  const handlePayment = async (plan: any) => {
    setSelectedPlan(plan);
    setIsRedirecting(true);
    
    try {
      const resLoad = await loadRazorpayScript();
      if (!resLoad) {
        alert("Razorpay SDK failed to load. Are you online?");
        setIsRedirecting(false);
        setSelectedPlan(null);
        return;
      }

      const response = await fetch('/api/create-razorpay-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: plan.price, planName: plan.name })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create order');
      }
      
      const options = {
        key: data.key_id,
        amount: data.amount.toString(),
        currency: data.currency,
        name: "Your Company",
        description: `${plan.name} Plan`,
        order_id: data.order_id,
        handler: function (response: any) {
          navigate(`/payment-success?plan=${encodeURIComponent(plan.name)}&amount=${plan.price}&order_id=${response.razorpay_order_id}`);
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999"
        },
        theme: {
          color: "#6C5CE7"
        },
        modal: {
          ondismiss: function() {
            setIsRedirecting(false);
            setSelectedPlan(null);
          }
        }
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.on('payment.failed', function (response: any) {
        alert(response.error.description || "Payment failed");
        setIsRedirecting(false);
        setSelectedPlan(null);
      });
      
      paymentObject.open();

    } catch (error) {
      console.error(error);
      alert('Payment initialization failed. Please try again.');
      setIsRedirecting(false);
      setSelectedPlan(null);
    }
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
                disabled={isRedirecting}
                className={`w-full py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 ${plan.popular ? 'bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] hover:bg-[var(--color-primary)] hover:text-white' : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] border border-[var(--color-border)] hover:border-[var(--color-primary)]'}`}
              >
                {isRedirecting && selectedPlan?.name === plan.name ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <CreditCard className="w-5 h-5" />
                )}
                Pay with Razorpay
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Processing Modal */}
      <AnimatePresence>
        {selectedPlan && isRedirecting && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg glass-panel p-8 overflow-hidden text-center"
            >
              <div className="py-12">
                <Loader2 className="w-16 h-16 text-[var(--color-primary)] animate-spin mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-2">Generating Payment Form</h3>
                <p className="text-[var(--color-text-secondary)]">Please wait while we initialize Razorpay checkout securely.</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight, Download, Rocket, MessageSquare, Calendar, ExternalLink, Check } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  const planName = queryParams.get('plan') || 'Professional';
  const amount = queryParams.get('amount') || '999';
  const orderId = queryParams.get('order_id') || `KLK-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleStepAction = (stepIndex: number, actionUrl?: string, route?: string) => {
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps([...completedSteps, stepIndex]);
    }
    
    if (actionUrl) {
      window.open(actionUrl, '_blank');
    } else if (route) {
      navigate(route);
    }
  };

  const nextSteps = [
    {
      icon: <Calendar className="w-5 h-5 text-[var(--color-primary)]" />,
      title: 'Schedule Onboarding',
      desc: 'Book your 1-on-1 strategy session with our AI experts.',
      actionText: 'Book Call',
      actionUrl: 'https://calendly.com/'
    },
    {
      icon: <MessageSquare className="w-5 h-5 text-[#E01E5A]" />,
      title: 'Join Community',
      desc: 'Get direct access to our private Slack support channel.',
      actionText: 'Join Slack',
      actionUrl: 'https://slack.com/'
    },
    {
      icon: <Rocket className="w-5 h-5 text-[var(--color-accent)]" />,
      title: 'Project Kickoff',
      desc: 'Head to your dashboard to complete the initial audit.',
      actionText: 'Go to Dashboard',
      route: '/dashboard'
    }
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[var(--color-bg-primary)]">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 12, stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 text-green-500 mb-6 shadow-[0_0_30px_rgba(34,197,94,0.3)]"
          >
            <CheckCircle2 className="w-12 h-12" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Payment <span className="text-gradient">Successful!</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-[var(--color-text-secondary)]"
          >
            Welcome to the Klickra family. Your journey to digital dominance starts now.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-5 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel p-8 md:col-span-3 flex flex-col"
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              Purchase Details
            </h3>
            <div className="space-y-4 flex-grow">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-[var(--color-border)] gap-2">
                <span className="text-[var(--color-text-secondary)]">Plan Selected</span>
                <span className="font-bold text-[var(--color-text-primary)] text-lg">{planName} Plan</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-[var(--color-border)] gap-2">
                <span className="text-[var(--color-text-secondary)]">Amount Paid</span>
                <span className="font-bold text-[var(--color-text-primary)] text-lg">${amount}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-[var(--color-border)] gap-2">
                <span className="text-[var(--color-text-secondary)]">Order ID</span>
                <span className="font-mono text-sm text-[var(--color-text-muted)] bg-[var(--color-bg-secondary)] px-3 py-1 rounded-md">{orderId}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-2">
                <span className="text-[var(--color-text-secondary)]">Status</span>
                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-500 text-xs font-bold uppercase tracking-wider self-start sm:self-auto">Confirmed</span>
              </div>
            </div>
            <button className="mt-8 w-full py-4 rounded-xl border border-[var(--color-border)] hover:bg-[var(--color-bg-secondary)] transition-colors flex items-center justify-center gap-2 font-bold">
              <Download className="w-5 h-5" /> Download Invoice
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-panel p-8 md:col-span-2 bg-gradient-to-b from-[var(--color-primary)]/10 to-transparent"
          >
            <h3 className="text-xl font-bold mb-2">Required Next Steps</h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-8">
              Complete these items to kickstart your onboarding process.
            </p>
            <div className="space-y-4">
              {nextSteps.map((step, i) => {
                const isCompleted = completedSteps.includes(i);
                return (
                  <div key={i} className={`relative p-5 rounded-xl border transition-all duration-300 ${isCompleted ? 'bg-[var(--color-bg-primary)] border-green-500/40 shadow-[0_4px_20px_rgba(34,197,94,0.1)]' : 'bg-[var(--color-bg-secondary)] border-[var(--color-border)] hover:border-[var(--color-primary)]/50'}`}>
                    {isCompleted && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </motion.div>
                    )}
                    <div className="flex gap-4 items-start">
                      <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${isCompleted ? 'bg-green-500/10 text-green-500' : 'bg-[var(--color-bg-primary)] shadow-sm'}`}>
                        {step.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className={`text-sm font-bold mb-1 transition-colors ${isCompleted ? 'text-green-500' : 'text-[var(--color-text-primary)]'}`}>{step.title}</h4>
                        <p className="text-xs text-[var(--color-text-secondary)] mb-4 leading-relaxed">{step.desc}</p>
                        <button 
                          onClick={() => handleStepAction(i, step.actionUrl, step.route)}
                          className={`text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 transition-all outline-none ${
                            isCompleted 
                              ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20' 
                              : 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-light)] hover:shadow-lg hover:shadow-[var(--color-primary)]/25'
                          }`}
                        >
                          {step.actionText} 
                          {step.actionUrl ? <ExternalLink className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

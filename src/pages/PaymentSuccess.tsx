import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight, Download, Rocket, MessageSquare, Calendar } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  const planName = queryParams.get('plan') || 'Professional';
  const amount = queryParams.get('amount') || '999';
  const orderId = queryParams.get('order_id') || `KLK-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  const nextSteps = [
    {
      icon: <Rocket className="w-6 h-6 text-[var(--color-primary)]" />,
      title: 'Onboarding Call',
      desc: 'Schedule your 1-on-1 strategy session with our AI architects.'
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-[var(--color-accent)]" />,
      title: 'Join Slack',
      desc: 'Get direct access to our support team and real-time updates.'
    },
    {
      icon: <Calendar className="w-6 h-6 text-[var(--color-primary-light)]" />,
      title: 'Project Kickoff',
      desc: 'Review your initial audit and set milestones for the first 30 days.'
    }
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[var(--color-bg-primary)]">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 12, stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 text-green-500 mb-6"
          >
            <CheckCircle2 className="w-12 h-12" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-4"
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

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel p-6 md:col-span-2"
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              Purchase Details
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-[var(--color-border)]">
                <span className="text-[var(--color-text-secondary)]">Plan Selected</span>
                <span className="font-bold text-[var(--color-text-primary)]">{planName} Plan</span>
              </div>
              <div className="flex justify-between py-3 border-b border-[var(--color-border)]">
                <span className="text-[var(--color-text-secondary)]">Amount Paid</span>
                <span className="font-bold text-[var(--color-text-primary)]">${amount}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-[var(--color-border)]">
                <span className="text-[var(--color-text-secondary)]">Order ID</span>
                <span className="font-mono text-sm text-[var(--color-text-muted)]">{orderId}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-[var(--color-text-secondary)]">Status</span>
                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-500 text-xs font-bold uppercase tracking-wider">Confirmed</span>
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
            className="glass-panel p-6 bg-gradient-to-br from-[var(--color-primary)]/10 to-transparent"
          >
            <h3 className="text-xl font-bold mb-4">What's Next?</h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-6">
              Our team is already preparing your workspace. You'll receive a confirmation email shortly.
            </p>
            <div className="space-y-6">
              {nextSteps.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-[var(--color-bg-secondary)] flex items-center justify-center">
                    {step.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[var(--color-text-primary)]">{step.title}</h4>
                    <p className="text-xs text-[var(--color-text-muted)]">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="px-8 py-4 rounded-xl bg-[var(--color-primary)] text-white font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2"
          >
            Go to Dashboard <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-8 py-4 rounded-xl border border-[var(--color-border)] text-[var(--color-text-primary)] font-bold hover:bg-[var(--color-bg-secondary)] transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

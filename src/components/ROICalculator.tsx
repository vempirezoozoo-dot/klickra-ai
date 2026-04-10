import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calculator, TrendingUp, DollarSign, Calendar, ArrowRight, Info } from 'lucide-react';

export default function ROICalculator() {
  const [investment, setInvestment] = useState<number>(5000);
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(1500);
  const [months, setMonths] = useState<number>(12);

  const [results, setResults] = useState({
    totalReturn: 0,
    netProfit: 0,
    roi: 0,
    breakEven: 0
  });

  useEffect(() => {
    const totalReturn = monthlyRevenue * months;
    const netProfit = totalReturn - investment;
    const roi = investment > 0 ? (netProfit / investment) * 100 : 0;
    const breakEven = monthlyRevenue > 0 ? investment / monthlyRevenue : 0;

    setResults({
      totalReturn,
      netProfit,
      roi,
      breakEven
    });
  }, [investment, monthlyRevenue, months]);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-primary)]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 text-[var(--color-primary-light)] text-xs font-bold mb-4">
            <Calculator className="w-3 h-3" /> ROI CALCULATOR
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Calculate Your <span className="text-gradient">Potential Return</span></h2>
          <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Estimate the impact of Klickra's AI-powered services on your bottom line. Use our interactive tool to visualize your growth.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Inputs */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-8 space-y-8"
          >
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-bold text-white flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-[var(--color-primary-light)]" /> Initial Investment
                </label>
                <span className="text-[var(--color-primary-light)] font-mono font-bold">${investment.toLocaleString()}</span>
              </div>
              <input 
                type="range" 
                min="500" 
                max="50000" 
                step="500"
                value={investment}
                onChange={(e) => setInvestment(Number(e.target.value))}
                className="w-full h-2 bg-[var(--color-bg-secondary)] rounded-lg appearance-none cursor-pointer accent-[var(--color-primary)]"
              />
              <div className="flex justify-between mt-2 text-[10px] text-[var(--color-text-muted)] font-bold uppercase tracking-wider">
                <span>$500</span>
                <span>$50,000</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[var(--color-accent)]" /> Monthly Revenue Increase
                </label>
                <span className="text-[var(--color-accent)] font-mono font-bold">${monthlyRevenue.toLocaleString()}</span>
              </div>
              <input 
                type="range" 
                min="100" 
                max="10000" 
                step="100"
                value={monthlyRevenue}
                onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                className="w-full h-2 bg-[var(--color-bg-secondary)] rounded-lg appearance-none cursor-pointer accent-[var(--color-accent)]"
              />
              <div className="flex justify-between mt-2 text-[10px] text-[var(--color-text-muted)] font-bold uppercase tracking-wider">
                <span>$100</span>
                <span>$10,000</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-bold text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[var(--color-primary-light)]" /> Timeframe (Months)
                </label>
                <span className="text-[var(--color-text-primary)] font-mono font-bold">{months} Months</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="36" 
                step="1"
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                className="w-full h-2 bg-[var(--color-bg-secondary)] rounded-lg appearance-none cursor-pointer accent-[var(--color-primary)]"
              />
              <div className="flex justify-between mt-2 text-[10px] text-[var(--color-text-muted)] font-bold uppercase tracking-wider">
                <span>1 Month</span>
                <span>36 Months</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10 flex gap-3">
              <Info className="w-5 h-5 text-[var(--color-primary-light)] shrink-0" />
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                These estimates are based on average client performance. Actual results may vary depending on industry, market conditions, and implementation speed.
              </p>
            </div>
          </motion.div>

          {/* Results */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-6">
              <div className="glass-panel p-6">
                <p className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-2">Total Return</p>
                <p className="text-2xl font-bold text-[var(--color-text-primary)] font-mono">${results.totalReturn.toLocaleString()}</p>
              </div>
              <div className="glass-panel p-6">
                <p className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-2">Net Profit</p>
                <p className={`text-2xl font-bold font-mono ${results.netProfit >= 0 ? 'text-[var(--color-accent)]' : 'text-red-400'}`}>
                  ${results.netProfit.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="glass-panel p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <TrendingUp className="w-24 h-24" />
              </div>
              <div className="relative z-10">
                <p className="text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-4">Return on Investment (ROI)</p>
                <div className="flex items-baseline gap-4">
                  <p className="text-6xl font-bold text-gradient font-mono">{Math.round(results.roi)}%</p>
                  <p className="text-[var(--color-text-secondary)] text-sm font-medium">Over {months} months</p>
                </div>
                <div className="mt-8 h-3 bg-[var(--color-bg-secondary)] rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(Math.max(results.roi / 5, 0), 100)}%` }}
                    className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]"
                  />
                </div>
              </div>
            </div>

            <div className="glass-panel p-8 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-1">Break-even Point</p>
                <p className="text-2xl font-bold text-[var(--color-text-primary)]">
                  {results.breakEven <= months ? (
                    <span className="text-[var(--color-accent)]">{results.breakEven.toFixed(1)} Months</span>
                  ) : (
                    <span className="text-red-400">Not reached in {months}m</span>
                  )}
                </p>
              </div>
              <div className="text-right">
                <Link to="/contact" className="inline-flex items-center gap-2 text-[var(--color-primary-light)] font-bold hover:text-[var(--color-text-primary)] transition-colors group">
                  Start Growing <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

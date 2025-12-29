
import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Zap, ShieldCheck, Diamond, Crown, Info } from 'lucide-react';

const Vault: React.FC = () => {
  const tiers = [
    {
      name: 'IRON',
      amount: '1,000 $FORGE',
      benefit: '1x Lottery Weight',
      icon: <Zap size={32} />,
      color: 'text-gray-400'
    },
    {
      name: 'OBSIDIAN',
      amount: '10,000 $FORGE',
      benefit: 'Guaranteed Allocation',
      icon: <ShieldCheck size={32} />,
      color: 'text-lime'
    },
    {
      name: 'GENESIS',
      amount: '50,000 $FORGE',
      benefit: 'Early Seed Access + Revenue',
      icon: <Crown size={32} />,
      color: 'text-white'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 relative">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold tracking-tighter text-white uppercase italic">
          THE FORGE <span className="text-lime">VAULT</span>
        </h1>
        <p className="text-gray-400 max-xl mx-auto">
          Secure your governance power and lock in priority allocations for all future Forge.link incubated projects.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {/* Blur Overlay */}
        <div className="absolute inset-0 z-20 backdrop-blur-[6px] bg-black/10 flex flex-col items-center justify-center rounded-2xl border border-lime/10">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-8 bg-obsidian/90 border border-lime/30 rounded-2xl text-center space-y-6 shadow-[0_0_50px_rgba(0,0,0,1)]"
          >
            <div className="w-16 h-16 bg-lime/10 rounded-full flex items-center justify-center text-lime mx-auto animate-pulse">
              <Lock size={32} />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">Protocol Launch Phase 2</h3>
              <p className="text-gray-400 text-sm font-medium">Staking rewards activation: Q1 2026</p>
            </div>
            <button className="px-8 py-3 bg-lime text-black font-black rounded-lg text-sm tracking-widest hover:scale-105 transition-all">
              NOTIFY ME AT LAUNCH
            </button>
          </motion.div>
        </div>

        {/* Tier Cards */}
        {tiers.map((tier, i) => (
          <div key={tier.name} className="bg-surface border border-white/10 rounded-2xl p-8 space-y-8 flex flex-col">
            <div className="flex justify-between items-start">
              <div className={`p-4 bg-white/5 rounded-2xl ${tier.color}`}>
                {tier.icon}
              </div>
              <span className="px-2 py-1 bg-white/5 text-[10px] font-mono text-gray-500 rounded uppercase tracking-widest">
                Tier {i + 1}
              </span>
            </div>

            <div className="space-y-2">
              <h4 className={`text-2xl font-black italic tracking-tighter ${tier.color}`}>{tier.name}</h4>
              <p className="text-gray-500 text-xs font-mono">Minimum Stake Required</p>
              <p className="text-xl font-bold text-white uppercase tracking-tight">{tier.amount}</p>
            </div>

            <div className="flex-1 space-y-4 pt-4">
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 flex items-center gap-3">
                <div className="w-2 h-2 bg-lime rounded-full" />
                <span className="text-sm font-bold text-white uppercase tracking-tighter">{tier.benefit}</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-gray-500">
                <div className="mt-0.5"><Info size={14} className="shrink-0" /></div>
                <p>Rewards distribution begins 48h after the conclusion of the TGE event.</p>
              </div>
            </div>

            <button 
              disabled 
              className="w-full py-4 bg-white/5 text-gray-500 font-bold rounded-lg cursor-not-allowed uppercase tracking-widest text-xs"
            >
              Vault Locked
            </button>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="mt-12 p-8 bg-surface border border-white/10 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 opacity-40">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/5 rounded-xl">
            <Diamond className="text-lime" />
          </div>
          <div>
            <h5 className="font-bold text-white uppercase tracking-tight">Governance Multipliers</h5>
            <p className="text-xs text-gray-500 font-mono">Dynamic reward adjustment based on locking period.</p>
          </div>
        </div>
        <div className="flex gap-8">
          <div className="text-right">
            <span className="block text-[10px] text-gray-500 uppercase font-mono">Total Staked</span>
            <span className="text-lg font-bold text-white">0 $FORGE</span>
          </div>
          <div className="text-right">
            <span className="block text-[10px] text-gray-500 uppercase font-mono">Staking APR</span>
            <span className="text-lg font-bold text-lime">--%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vault;

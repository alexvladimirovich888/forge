
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Zap, Shield, Target, Users, BookOpen, ScrollText } from 'lucide-react';
import { Link } from 'react-router-dom';

const Docs: React.FC = () => {
  return (
    <div className="min-h-screen bg-obsidian text-white font-sans selection:bg-lime selection:text-black pb-20">
      {/* Top Navigation / Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 pt-12 mb-8">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-lime transition-colors text-sm uppercase tracking-widest font-bold group"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Terminal
        </Link>
      </div>

      <article className="max-w-4xl mx-auto px-4">
        {/* Header Section */}
        <header className="relative p-8 md:p-12 bg-surface border border-white/10 rounded-3xl overflow-hidden mb-12 shadow-2xl">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <ScrollText size={160} strokeWidth={1} className="text-lime" />
          </div>
          
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-lime/10 border border-lime/30 rounded-xl flex items-center justify-center text-lime">
                <Zap className="fill-current" />
              </div>
              <span className="text-lime text-xs font-black uppercase tracking-[0.3em]">Official Documentation</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic leading-none">
              FORGE.LINK GENESIS <br />
              <span className="text-lime">WHITELIST: THE MANIFESTO</span>
            </h1>
            
            <p className="text-gray-400 max-w-2xl font-medium text-lg">
              The blueprint for the next generation of institutional-grade Solana ventures. 
              Precision, integrity, and elite growth.
            </p>
          </div>
        </header>

        {/* Content Body */}
        <div className="space-y-16">
          {/* Section 1 */}
          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-4xl font-black text-white/10 font-mono">01</span>
              <h2 className="text-2xl font-bold uppercase tracking-tight italic flex items-center gap-3">
                <BookOpen className="text-lime" size={24} />
                The Vision
              </h2>
            </div>
            <div className="pl-12 space-y-4">
              <p className="text-gray-400 leading-relaxed text-lg">
                FORGE.LINK is not just another launchpad. We are a high-tech incubator built on the Solana blockchain, 
                designed to bridge the gap between visionary developers and elite investors. Our mission is 
                <span className="text-white font-bold italic"> "Quality over Hype."</span>
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-4xl font-black text-white/10 font-mono">02</span>
              <h2 className="text-2xl font-bold uppercase tracking-tight italic flex items-center gap-3">
                <Shield className="text-lime" size={24} />
                Whitelist Privilege
              </h2>
            </div>
            <div className="pl-12 grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: 'Guaranteed Allocation', desc: 'Priority access to the $FORGE Seed Round.' },
                { title: 'Tier-0 Status', desc: 'Zero fees on your first three IDO participations.' },
                { title: 'Discord Role', desc: '"Founding Smith" – exclusive access to private alpha channels.' }
              ].map((item, i) => (
                <div key={i} className="p-6 bg-surface/50 border border-white/5 rounded-2xl hover:border-lime/20 transition-colors">
                  <h4 className="text-white font-bold uppercase mb-2 text-sm tracking-wide">{item.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-4xl font-black text-white/10 font-mono">03</span>
              <h2 className="text-2xl font-bold uppercase tracking-tight italic flex items-center gap-3">
                <Target className="text-lime" size={24} />
                Participation Rules
              </h2>
            </div>
            <div className="pl-12">
              <div className="bg-surface/30 border border-white/5 rounded-3xl overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Requirement</th>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Compliance Detail</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm font-medium">
                    <tr className="border-b border-white/5">
                      <td className="px-6 py-4 text-white uppercase">Verify Wallet</td>
                      <td className="px-6 py-4 text-gray-400">Must hold a minimum of 0.1 SOL for anti-spam protection.</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="px-6 py-4 text-white uppercase">Social Engagement</td>
                      <td className="px-6 py-4 text-gray-400">Follow official FORGE.LINK channels (X and Discord).</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-white uppercase">Fair Play</td>
                      <td className="px-6 py-4 text-gray-400 italic">One wallet per human. Sybil attacks will result in an immediate permanent ban.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-4xl font-black text-white/10 font-mono">04</span>
              <h2 className="text-2xl font-bold uppercase tracking-tight italic flex items-center gap-3">
                <Users className="text-lime" size={24} />
                Selection Process
              </h2>
            </div>
            <div className="pl-12 space-y-6">
              <p className="text-gray-400 leading-relaxed text-lg">
                The Genesis Whitelist is limited to <span className="text-white font-bold">500 spots</span>. 
                Selection is based on community contribution, early engagement, and "Proof of Activity" on the Solana Mainnet.
              </p>
              
              <div className="p-8 bg-lime rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_30px_rgba(204,255,0,0.1)]">
                <div className="space-y-1">
                  <h4 className="text-black font-black text-xl uppercase tracking-tighter">Ready to Forge?</h4>
                  <p className="text-black/60 text-xs font-bold uppercase">Applications close in 48 hours</p>
                </div>
                <Link 
                  to="/whitelist" 
                  className="px-8 py-3 bg-black text-white font-black rounded-xl uppercase tracking-widest text-sm hover:scale-105 transition-transform"
                >
                  Join Whitelist
                </Link>
              </div>
            </div>
          </section>
        </div>

        {/* Footer Branding */}
        <footer className="mt-20 py-12 border-t border-white/10 flex flex-col items-center gap-6 text-center">
          <div className="w-12 h-12 grayscale opacity-50">
            <img src="https://i.postimg.cc/xTkS3vQk/Untitled-design-2025-12-29T223214-803.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <p className="text-[10px] text-gray-600 font-mono uppercase tracking-[0.4em]">
            Precision Engineering &copy; 2025 FORGE.LINK Protocol
          </p>
        </footer>
      </article>
    </div>
  );
};

export default Docs;
